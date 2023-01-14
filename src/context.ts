import { Project, ScriptTarget, Type, Node, SyntaxKind } from 'ts-morph'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { Ctx } from './types'
import { evaluateType } from './eval'

const RESULT_TYPE_NAME = '__$result'

export interface CtxOptions {
  filePath: string
}

export const createContext = (options: CtxOptions): Ctx => {
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ESNext,
      strict: true,
      alwaysStrict: true,
      disableSizeLimit: true,
      isolatedModules: true,
    },
  })

  const typeChecker = project.getTypeChecker()

  const sourceFile = project.addSourceFileAtPath(path.resolve(options.filePath))

  const entryPoint = sourceFile.getExportedDeclarations().get('main')?.[0]

  if (!entryPoint) {
    throw new Error('No "main" entrypoint defined in source file')
  }

  const typeToString = (ty: Type | undefined): string =>
    ty ? typeChecker.getTypeText(ty) : ''

  const [resultTypeNode] = sourceFile.addStatements(
    `type ${RESULT_TYPE_NAME} = {}`
  )

  const getResultExpr = (resultKey?: string) =>
    resultKey
      ? `((${RESULT_TYPE_NAME}[${JSON.stringify(resultKey)})['output'])`
      : 'undefined'

  const addResult = (name: string, ty: string): Node | undefined =>
    resultTypeNode
      ?.asKind(SyntaxKind.TypeAliasDeclaration)
      ?.getChildAtIndexIfKind(3, SyntaxKind.TypeLiteral)
      ?.addProperty({
        name: JSON.stringify(name),
        type: `{ output: ${ty} }`,
      })

  const createResult = (ty: string): [string, Node | undefined] => {
    const resultKey = uuid()
    const node = addResult(resultKey, ty)
    return [resultKey, node]
  }

  const removeResult = (key?: string) => {
    if (!key) return
    resultTypeNode
      ?.asKind(SyntaxKind.TypeAliasDeclaration)
      ?.getChildAtIndexIfKind(3, SyntaxKind.TypeLiteral)
      ?.getProperty(key)
      ?.remove()
  }

  const customEffects: Record<string, (args: Type[], ctx: Ctx) => any> = {}

  const getTypeValue = (ty: Type | undefined): any => {
    try {
      return JSON.parse(typeToString(ty))
    } catch (_) {
      return null
    }
  }

  const refMap: Map<string, string> = new Map()
  const createRef = (ty: string): string => {
    const key = uuid()
    refMap.set(key, ty)
    return key
  }

  let currentEnv = 'node'
  const setEnv = (e: string) => (currentEnv = e)

  const environment: Array<Map<string, string>> = []

  const ctx: Ctx = {
    sourceFile,
    typeChecker,
    entryPoint,
    typeToString,
    getTypeValue,

    get currentEnv() {
      return currentEnv
    },
    setEnv,

    createRef,
    getRef: (k: string) => refMap.get(k),
    setRef: (k: string, ty: string) => refMap.set(k, ty),
    deleteRef: (k: string) => refMap.delete(k),

    createResult,
    getResultExpr,
    removeResult,
    printResultNode: () => console.log(resultTypeNode?.print()),

    addCustomEffect: (name, expr) => {
      const func = eval(expr)
      Object.assign(customEffects, { [name]: func })
    },
    runCustomEffect: async (name, args) => {
      const output = await customEffects[name]?.(args, ctx)
      if (output) {
        const [resultKey, _] = createResult(`${JSON.stringify(output)}`)
        return [resultKey]
      }
      return []
    },
    hasCustomEffect: (name) => customEffects[name] !== undefined,

    evaluateType,

    newScope() {
      environment.unshift(new Map())
    },
    addToScope(name, resKey) {
      if (environment.length === 0) ctx.newScope()
      const curScope = environment[0]
      curScope?.set(name, resKey)
    },
    clearScope() {
      environment.shift()
    },
    getKeyInScope(name) {
      return environment.find((scope) => scope.has(name))?.get(name)
    },
    withScope: (fn) => async () => {
      ctx.newScope()
      const res = await fn()
      ctx.clearScope()
      return res
    },
  }

  return ctx
}
