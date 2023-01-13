import { Type } from 'ts-morph'
import { Ctx } from './types'

export const match = <K extends string, R>(
  k: K | undefined,
  pattern: { [key in K | '_']: () => R }
) => (k && pattern[k] ? pattern[k]() : pattern._())

export const evalList = async (ctx: Ctx, effectTyps: Type[]) => {
  const effectResults: string[] = []
  for (const item of effectTyps ?? []) {
    effectResults.push(...(await ctx.evaluateType(ctx, item)))
  }
  return effectResults
}
