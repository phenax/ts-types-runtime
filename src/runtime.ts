import { Project, ScriptTarget, Type, Node, StringLiteral, TypeFormatFlags, SyntaxKind } from 'ts-morph'
import path from 'path'
import fs from 'fs'

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES3,
  },
})

const typeChecker = project.getTypeChecker()

const sourceFile = project.addSourceFileAtPath(path.resolve("./src/index.ts"))

sourceFile.addStatements('type Foobar = "aaaaaaaa";')

const entryPoint = sourceFile.getExportedDeclarations().get('main')?.[0]

const typeToString = (ty: Type | undefined): string =>
  ty ? typeChecker.compilerObject.typeToString(ty.compilerType) : ''

const getPropertyType = (n: Node, prop: string): Type | undefined => {
  const tt = typeChecker.getTypeAtLocation(n)
  const propSym = tt.getProperty(prop)
  const ty = propSym && typeChecker.getTypeOfSymbolAtLocation(propSym, n)
  return ty
}

const typeRefNode = entryPoint?.getLastChild()

const RESULT_TYPE_NAME = '__$result'

const [statement] = sourceFile.addStatements(`type ${RESULT_TYPE_NAME} = {}`)

const addResult = (name: string, ty: string) => {
  if (statement.isKind(SyntaxKind.TypeAliasDeclaration)) {
    const value = statement.getChildAtIndex(3)
    if (value.isKind(SyntaxKind.TypeLiteral)) {
      value.addProperty({
        name: JSON.stringify(name),
        type: `{ output: ${ty} }`,
      })
    }
  }
}

const accumulateResults = (effTyp: Type, node: Node): string[] => {
  const name = effTyp.getSymbol()?.getName()

  switch (name) {
    case 'ReadFile':
      const [pathTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(typeToString(pathTyp))
      const contents = fs.readFileSync(filePath, 'utf-8')
      const hash = Math.random().toFixed(8).slice(2)
      addResult(hash, JSON.stringify(contents))
      return [hash]

    case 'ChainIO':
      const inputTyp = effTyp.getProperty('input')?.getTypeAtLocation(node)
      const inputResults = inputTyp && accumulateResults(inputTyp, node)
      return [...(inputResults ?? [])]
    default:
      return []
  }
}

const evalAccumulator = (effNode: Node, node: Node) => {
  const effTyp = effNode.getType()
  const name = effTyp.getSymbol()?.getName()

  switch (name) {
    case 'PrintString':
    case 'Print':
      console.log(...effTyp.getTypeArguments().map(typeToString));
      return null

    case 'ReadFile':
      const [hash] = accumulateResults(effTyp, node)
      effNode.replaceWithText(`${RESULT_TYPE_NAME}[${JSON.stringify(hash)}]`)
      return null

    case 'WriteFile':
      const [pathTyp, contentsTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(typeToString(pathTyp))
      const contents = JSON.parse(typeToString(contentsTyp))
      fs.writeFileSync(filePath, contents)
      return null

    case 'ChainIO':
      const inputTyp = effTyp.getProperty('input')?.getTypeAtLocation(node)
      const chainToKind = effTyp.getProperty('chainTo')?.getTypeAtLocation(node)
      console.log('wow')

      const [hashRes] = inputTyp ? accumulateResults(inputTyp, node) : []
      const chainRes = `(${typeToString(chainToKind)} & { input: ${RESULT_TYPE_NAME}[${JSON.stringify(hashRes)}]['output'] })['return']`

      const updateEffNode = effNode.replaceWithText(chainRes)

      evalAccumulator(updateEffNode, node)
      return null
    default:
      console.log(`${name} effect is unhandled`)
  }

  return null
}

if (typeRefNode) {
  const resultType = entryPoint?.getType()

  if (typeRefNode && entryPoint && resultType?.getSymbol()?.getName() === 'Program') {
    const exitCodeTy = getPropertyType(typeRefNode, 'exitCode')
    const effectTypes = getPropertyType(typeRefNode, 'effects')
    if (effectTypes?.isTuple()) {
      console.log('Effects to run', effectTypes?.getTupleElements().map(eff => typeToString(eff)))

      const effectNodes = entryPoint.getChildrenOfKind(SyntaxKind.TypeReference)
        .flatMap(n => n.getChildrenOfKind(SyntaxKind.TupleType))
        .flatMap(tt => tt.getChildrenOfKind(SyntaxKind.SyntaxList))
        .flatMap(n => n.getChildren())
        .filter(n => !n.isKind(SyntaxKind.CommaToken))

      effectNodes.flatMap(n => evalAccumulator(n, typeRefNode))
    }

    console.log('Exited with code', exitCodeTy?.getLiteralValue())
  } else {
    const ty = typeChecker.getTypeAtLocation(typeRefNode)
    console.log(typeToString(ty))
  }
}

console.log(entryPoint?.print())

