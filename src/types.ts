import { ExportedDeclarations, Node, SourceFile, Type, TypeChecker } from "ts-morph"

export interface Ctx {
  sourceFile: SourceFile
  typeChecker: TypeChecker
  entryPoint: ExportedDeclarations
  typeToString: (ty: Type | undefined) => string

  createResult: (ty: string) => [string, Node | undefined]
  getResultExpr: (key?: string) => string
  printResultNode: () => void

  addCustomEffect: (name: string, expr: string) => void
  runCustomEffect: (name: string, args: Type[]) => Promise<string[]>
  hasCustomEffect: (name: string) => boolean
}

