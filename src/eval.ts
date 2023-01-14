import { Type } from 'ts-morph'

import { match } from './util'
import { Ctx } from './types'
import * as builtins from './eval-env/builtins'

type EffDefn = {
  default: (ctx: Ctx, args: Type[]) => Record<string, () => Promise<string[]>>
  cleanup?: () => void
}
const mergeEffDefns = (a: EffDefn, b: EffDefn): EffDefn => ({
  default: (ctx: Ctx, args: Type[]) => ({
    ...a.default(ctx, args),
    ...b.default(ctx, args),
  }),
  cleanup: () => {
    a.cleanup?.()
    b.cleanup?.()
  },
})

const cleanupActions = new Set<undefined | (() => void)>()
export const cleanup = () => cleanupActions.forEach((f) => f?.())

let prevEnv: string

export const evaluateType = async (
  ctx: Ctx,
  effTyp: Type
): Promise<string[]> => {
  // TODO: base type check
  const name = effTyp.getSymbol()?.getName()
  const args = effTyp.getTypeArguments()

  // console.log(ctx.typeToString(effTyp))
  // console.log(name, args.map(ctx.typeToString))

  const envDefns = await match(ctx.currentEnv, {
    node: () => import('./eval-env/node') as Promise<EffDefn>,
    'test.node': async () =>
      mergeEffDefns(
        await import('./eval-env/test'),
        await import('./eval-env/node')
      ),
    _: async () => {
      throw new Error(`Invalid env: ${ctx.currentEnv}`)
    },
  })

  const { default: envEffects, cleanup } = mergeEffDefns(
    builtins as unknown as EffDefn,
    envDefns
  )

  // Update cleanup if env has changed
  if (prevEnv !== ctx.currentEnv) {
    cleanupActions.add(cleanup)
    prevEnv = ctx.currentEnv
  }

  if (name && ctx.hasCustomEffect(name)) {
    return ctx.runCustomEffect(name, args)
  }

  return match(name, {
    ...envEffects(ctx, args),
    _: async () => {
      console.log(ctx.typeToString(effTyp))
      throw new Error(`${name} effect is not handled`)
    },
  })
}
