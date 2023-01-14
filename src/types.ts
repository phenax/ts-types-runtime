import {
  ExportedDeclarations,
  Node,
  SourceFile,
  Type,
  TypeChecker,
} from 'ts-morph'

export interface Ctx {
  sourceFile: SourceFile
  typeChecker: TypeChecker
  entryPoint: ExportedDeclarations
  typeToString: (ty: Type | undefined) => string
  getTypeValue: (ty: Type | undefined) => any

  createResult: (ty: string) => [string, Node | undefined]
  removeResult: (key?: string) => void,
  getResultExpr: (key?: string) => string
  printResultNode: () => void

  currentEnv: string
  setEnv: (e: string) => void

  createRef: (ty: string) => string
  getRef: (key: string) => any
  setRef: (key: string, ty: string) => void
  deleteRef: (key: string) => void

  addCustomEffect: (name: string, expr: string) => void
  runCustomEffect: (name: string, args: Type[]) => Promise<string[]>
  hasCustomEffect: (name: string) => boolean

  evaluateType: (ctx: Ctx, effTyp: Type) => Promise<string[]>

  withScope: (fn: () => Promise<string[]>) => () => Promise<string[]>
  newScope: () => void
  clearScope: () => void
  addToScope: (name: string, resKey: string) => void
  getKeyInScope: (name: string) => string | undefined
}
