import { Type } from 'ts-morph'
import { promises as fs } from 'fs'
import readline from 'readline'
import { Ctx } from '../types'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

const readLineFromStdin = (): Promise<string> =>
  new Promise((res) => rl.on('line', res))

export const cleanup = () => {
  rl.close()
}

export default (ctx: Ctx, args: Type[]) => ({
  ReadFile: async () => {
    const [pathTyp] = args
    const filePath = ctx.getTypeValue(pathTyp)
    const contents = await fs.readFile(filePath, 'utf-8')
    const [resultKey, _] = ctx.createResult(JSON.stringify(contents))
    return [resultKey]
  },

  WriteFile: async () => {
    const [pathTyp, contentsTyp] = args
    const filePath = ctx.getTypeValue(pathTyp)
    const contents = ctx.getTypeValue(contentsTyp)
    await fs.writeFile(filePath, contents)
    return []
  },

  GetEnv: async () => {
    const [envTyp] = args
    const envName = ctx.getTypeValue(envTyp)
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

  Exit: async () => {
    process.exit(args[0] && ctx.getTypeValue(args[0]))
  },

  ReadLine: async () => {
    const line = await readLineFromStdin()
    const [resultKey, _] = ctx.createResult(`${JSON.stringify(line)}`)
    return [resultKey]
  },
})
