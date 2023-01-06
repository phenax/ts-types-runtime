import { Project, ScriptTarget, Type, Node, StringLiteral, TypeFormatFlags, SyntaxKind } from 'ts-morph'
import path from 'path'
import { promises as fs } from 'fs'
import readline from 'readline';
import { stdout } from 'process';
import { v4 as uuid } from 'uuid';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const readLineFromStdin = (): Promise<string> => new Promise((res) => {
  rl.on('line', res)
})

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES3,
  },
})

const typeChecker = project.getTypeChecker()

const sourceFile = project.addSourceFileAtPath(path.resolve("./src/index.ts"))

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

const [resultTypeNode] = sourceFile.addStatements(`type ${RESULT_TYPE_NAME} = {}`)

const addResult = (name: string, ty: string): Node | undefined => {
  if (resultTypeNode.isKind(SyntaxKind.TypeAliasDeclaration)) {
    const value = resultTypeNode.getChildAtIndex(3)
    if (value.isKind(SyntaxKind.TypeLiteral)) {
      return value.addProperty({
        name: JSON.stringify(name),
        type: `{ output: ${ty} }`,
      })
    }
  }
}

const match = <K extends string, R>(k: K | undefined, pattern: { [key in K | '_']: () => R }) =>
  k && pattern[k] ? pattern[k]() : pattern._()

const accumulateResults = async (effTyp: Type, node: Node): Promise<string[]> => {
  const name = effTyp.getSymbol()?.getName()

  return match(name, {
    Print: async () => {
      console.log(...effTyp.getTypeArguments().map(typeToString));
      return []
    },

    PutString: async () => {
      const [strinTyp] = effTyp.getTypeArguments()
      const typString = typeToString(strinTyp)
      const string = JSON.parse(!typString.startsWith('"') ? `"${typString}"` : typString)
      stdout.write(string);
      return []
    },

    Debug: async () => {
      const [labelTyp, valueTyp] = effTyp.getTypeArguments()
      const label = JSON.parse(typeToString(labelTyp))
      const value = typeToString(valueTyp)
      console.log(label, value)
      // TODO: Return value
      return []
    },

    ReadFile: async () => {
      const [pathTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(typeToString(pathTyp))
      const contents = await fs.readFile(filePath, 'utf-8')
      const hash = uuid()
      addResult(hash, JSON.stringify(contents))
      return [hash]
    },

    WriteFile: async () => {
      const [pathTyp, contentsTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(typeToString(pathTyp))
      const contents = JSON.parse(typeToString(contentsTyp))
      await fs.writeFile(filePath, contents)
      return []
    },

    Bind: async () => {
      const [inputTyp, chainToKind] = effTyp.getTypeArguments()
      const [resultKey] = inputTyp ? await accumulateResults(inputTyp, node) : []

      const hash = uuid()
      const compNode = addResult(hash,
        `(${typeToString(chainToKind)} & { input: ${RESULT_TYPE_NAME}[${JSON.stringify(resultKey)}]['output'] })['return']`)
      const compTyp = compNode?.getType().getProperty('output')?.getTypeAtLocation(node)

      if (compTyp)
        return accumulateResults(compTyp, node)
      return []
    },

    GetEnv: async () => {
      const [envTyp] = effTyp.getTypeArguments()
      const envName = JSON.parse(typeToString(envTyp))
      const hash = uuid()
      addResult(hash, `${JSON.stringify(process.env[envName] ?? '')}`)
      return [hash]
    },

    GetArgs: async () => {
      const hash = uuid()
      addResult(hash, `${JSON.stringify(process.argv.slice(2))}`)
      return [hash]
    },

    ReadLine: async () => {
      const line = await readLineFromStdin()
      const hash = uuid()
      addResult(hash, `${JSON.stringify(line)}`)
      return [hash]
    },

    JsExpr: async () => {
      const [exprTyp] = effTyp.getTypeArguments()
      const exprStr = JSON.parse(typeToString(exprTyp))
      const result = eval(`JSON.stringify(${exprStr})`)
      const hash = uuid()
      addResult(hash, `${result}`)
      return [hash]
    },

    Seq: async () => {
      const [effectTyps] = effTyp.getTypeArguments()
      const effectResults: string[] = []
      for (const item of effectTyps?.getTupleElements() ?? []) {
        effectResults.push(...(await accumulateResults(item, node)))
      }

      const hash = uuid()
      addResult(hash, `[
        ${effectResults.map(r => `${RESULT_TYPE_NAME}[${JSON.stringify(r)}]`).join(', ')}
      ]`)
      return [hash]
    },

    _: async () => {
      console.log(`${name} result effect is unhandled`)
      return []
    },
  })
}

// const evalAccumulator = async (effNode: Node, node: Node) => {
//   const effTyp = effNode.getType()
//   await accumulateResults(effTyp, node)
// }

const main = async () => {
  if (typeRefNode) {
    const resultType = entryPoint?.getType()

    if (typeRefNode && entryPoint && resultType?.getSymbol()?.getName() === 'Program') {
      const exitCodeTy = getPropertyType(typeRefNode, 'exitCode')
      const effectTypes = getPropertyType(typeRefNode, 'effects')
      if (effectTypes?.isTuple()) {
        for (const typ of effectTypes.getTupleElements()) {
          await accumulateResults(typ, typeRefNode)
        }
      }

      const exitCode = exitCodeTy?.getLiteralValue() as number

      if (exitCode !== 0) {
        process.exit(exitCode)
      }
    } else {
      const ty = typeChecker.getTypeAtLocation(typeRefNode)
      console.log(typeToString(ty))
    }
  }
}

main()
  .then(() => {
    // console.log(entryPoint?.print())
    // console.log(resultTypeNode?.print())
    process.exit(0)
  })
  .catch(e => (console.error(e), process.exit(1)))

