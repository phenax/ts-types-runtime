import { Type } from 'ts-morph'
import { Ctx } from '../types'

export default (ctx: Ctx, args: Type[]) => ({
  Test: async () => {
    const [msg, effs] = args
    process.stdout.write(` - ${ctx.getTypeValue(msg)} `)

    try {
      for (const eff of effs?.getTupleElements() ?? []) {
        await ctx.evaluateType(ctx, eff)
      }

      console.log('[✓]')
    } catch(e) {
      console.log('[TEST FAILED]')
      throw e
    }

    return []
  },

  Assert: async () => {
    if (!ctx.getTypeValue(args[0])) {
      throw new Error('Assertion failed')
    }

    return []
  },
})
