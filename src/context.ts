import { Project, ScriptTarget, Type, Node, SyntaxKind } from 'ts-morph'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { Ctx } from './types'

const RESULT_TYPE_NAME = '__$result'

export interface CtxOptions {
  filePath: string
}

export const createContext = (options: CtxOptions): Ctx => {
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ES3,
    },
  })

  const typeChecker = project.getTypeChecker()

  const sourceFile = project.addSourceFileAtPath(path.resolve(options.filePath))

  const entryPoint = sourceFile.getExportedDeclarations().get('main')?.[0]

  if (!entryPoint) {
    throw new Error('No "main" entrypoint defined in source file')
  }

  const typeToString = (ty: Type | undefined): string =>
    ty ? typeChecker.compilerObject.typeToString(ty.compilerType) : ''

  const [resultTypeNode] = sourceFile.addStatements(
    `type ${RESULT_TYPE_NAME} = {}`
  )

  const getResultExpr = (resultKey?: string) =>
    `(${RESULT_TYPE_NAME}[${JSON.stringify(resultKey)})`

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

  const customEffects: Record<string, (args: Type[], ctx: Ctx) => any> = {}

  const getTypeValue = (ty: Type | undefined): any => {
    try {
      return JSON.parse(typeToString(ty))
    } catch(_) { return }
  }

  const ctx: Ctx = {
    sourceFile,
    typeChecker,
    entryPoint,
    typeToString,
    getTypeValue,

    createResult,
    getResultExpr,
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
  }

  return ctx
}
