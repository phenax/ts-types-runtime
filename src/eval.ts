import { Type } from 'ts-morph'
import { promises as fs } from 'fs'
import readline from 'readline'

import { match } from './util'
import { Ctx } from './types'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

export const cleanup = () => {
  rl.close()
}

const readLineFromStdin = (): Promise<string> =>
  new Promise((res) => rl.on('line', res))

export const evaluateType = async (
  ctx: Ctx,
  effTyp: Type
): Promise<string[]> => {
  const name = effTyp.getSymbol()?.getName()

  return match(name, {
    DefineEffect: async () => {
      const [nameTyp, exprTyp] = effTyp.getTypeArguments()
      const name = nameTyp?.getLiteralValue() as string
      const exprStr = exprTyp?.getLiteralValue() as string

      ctx.addCustomEffect(name, exprStr)
      return []
    },

    Print: async () => {
      console.log(...effTyp.getTypeArguments().map(ctx.typeToString))
      return []
    },

    PutString: async () => {
      const [strinTyp] = effTyp.getTypeArguments()
      const typString = ctx.typeToString(strinTyp)
      const string = JSON.parse(
        !typString.startsWith('"') ? `"${typString}"` : typString
      )
      process.stdout.write(string)
      return []
    },

    Debug: async () => {
      const [labelTyp, valueTyp] = effTyp.getTypeArguments()
      const label = JSON.parse(ctx.typeToString(labelTyp))
      const value = ctx.typeToString(valueTyp)
      console.log(label, value)
      const [resultKey, _] = ctx.createResult(JSON.stringify(value))
      return [resultKey]
    },

    ReadFile: async () => {
      const [pathTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(ctx.typeToString(pathTyp))
      const contents = await fs.readFile(filePath, 'utf-8')
      const [resultKey, _] = ctx.createResult(JSON.stringify(contents))
      return [resultKey]
    },

    WriteFile: async () => {
      const [pathTyp, contentsTyp] = effTyp.getTypeArguments()
      const filePath = JSON.parse(ctx.typeToString(pathTyp))
      const contents = JSON.parse(ctx.typeToString(contentsTyp))
      await fs.writeFile(filePath, contents)
      return []
    },

    Bind: async () => {
      const [inputTyp, chainToKind] = effTyp.getTypeArguments()
      const [resultKey] = inputTyp ? await evaluateType(ctx, inputTyp) : []

      const [_, compNode] = ctx.createResult(
        `(${ctx.typeToString(chainToKind)} & { input: (${ctx.getResultExpr(
          resultKey
        )})['output'] })['return']`
      )
      // TODO: Avoid using getTypeAtLocation?
      const compTyp = compNode
        ?.getType()
        .getProperty('output')
        ?.getTypeAtLocation(ctx.entryPoint)

      return compTyp ? await evaluateType(ctx, compTyp) : []
    },

    GetEnv: async () => {
      const [envTyp] = effTyp.getTypeArguments()
      const envName = JSON.parse(ctx.typeToString(envTyp))
      const [resultKey, _] = ctx.createResult(
        `${JSON.stringify(process.env[envName] ?? '')}`
      )
      return [resultKey]
    },

    GetArgs: async () => {
      const [resultKey, _] = ctx.createResult(
        `${JSON.stringify(process.argv.slice(2))}`
      )
      return [resultKey]
    },

    ReadLine: async () => {
      const line = await readLineFromStdin()
      const [resultKey, _] = ctx.createResult(`${JSON.stringify(line)}`)
      return [resultKey]
    },

    JsExpr: async () => {
      const [exprTyp] = effTyp.getTypeArguments()
      const exprStr = JSON.parse(ctx.typeToString(exprTyp))
      const result = eval(`JSON.stringify(${exprStr})`)
      const [resultKey, _] = ctx.createResult(`${result}`)
      return [resultKey]
    },

    Seq: async () => {
      const [effectTyps] = effTyp.getTypeArguments()
      const effectResults = await evalList(
        ctx,
        effectTyps?.getTupleElements() ?? []
      )
      const [resultKey, _] = ctx.createResult(`[
        ${effectResults.map(ctx.getResultExpr).join(', ')}
      ]`)
      return [resultKey]
    },

    Do: async () => {
      const [effectTyps] = effTyp.getTypeArguments()
      const effectResults = await evalList(
        ctx,
        effectTyps?.getTupleElements() ?? []
      )
      const lastResKey = effectResults[effectResults.length - 1]
      const [resultKey, _] = ctx.createResult(
        `${ctx.getResultExpr(lastResKey)}['output']`
      )
      return [resultKey]
    },

    _: async () => {
      if (name && ctx.hasCustomEffect(name)) {
        return ctx.runCustomEffect(name, effTyp.getTypeArguments())
      }

      console.log(`${name} effect is not handled`)
      return []
    },
  })
}

export const evalList = async (ctx: Ctx, effectTyps: Type[]) => {
  const effectResults: string[] = []
  for (const item of effectTyps ?? []) {
    effectResults.push(...(await evaluateType(ctx, item)))
  }
  return effectResults
}
