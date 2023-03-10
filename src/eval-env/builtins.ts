import { Type } from 'ts-morph'
import { Ctx } from '../types'
import { applyFunc, evalList } from '../util'

export default (ctx: Ctx, args: Type[]) => ({
  SetEvalEnvironment: async () => {
    ctx.setEnv(ctx.getTypeValue(args[0]))
    return []
  },

  DefineEffect: async () => {
    const [nameTyp, exprTyp] = args
    const name = nameTyp?.getLiteralValue() as string
    const exprStr = exprTyp?.getLiteralValue() as string

    ctx.addCustomEffect(name, exprStr)
    return []
  },

  CreateRef: async () => {
    const val = ctx.typeToString(args[0])
    const refKey = ctx.createRef(val)
    const [resultKey, _] = ctx.createResult(JSON.stringify(refKey))
    return [resultKey]
  },

  GetRef: async () => {
    const refKey = ctx.getTypeValue(args[0])
    const val = ctx.getRef(refKey)
    if (!val) throw new Error('Ref has been deleted')
    const [resultKey, _] = ctx.createResult(val)
    return [resultKey]
  },

  SetRef: async () => {
    const [keyTy, valTyp] = args
    ctx.setRef(ctx.getTypeValue(keyTy), ctx.typeToString(valTyp))
    return []
  },

  DeleteRef: async () => {
    ctx.deleteRef(ctx.getTypeValue(args[0]))
    return []
  },

  Pure: async () => {
    const [valTyp] = args
    const [resultKey, _] = ctx.createResult(ctx.typeToString(valTyp))
    return [resultKey]
  },

  Noop: async () => [],

  Print: async () => {
    console.log(...args.map(ctx.typeToString))
    return []
  },

  PutString: async () => {
    const [strinTyp] = args
    const typString = ctx.getTypeValue(strinTyp) ?? ctx.typeToString(strinTyp)
    process.stdout.write(typString)
    return []
  },

  Debug: async () => {
    const [labelTyp, valueTyp] = args
    const label = ctx.getTypeValue(labelTyp)
    const value = ctx.typeToString(valueTyp)
    console.log(label, value)
    const [resultKey, _] = ctx.createResult(JSON.stringify(value))
    return [resultKey]
  },

  Bind: ctx.withScope(async () => {
    const [inputTyp, chainToKind] = args
    let [resultKey] = inputTyp ? await ctx.evaluateType(ctx, inputTyp) : []

    const resultType = applyFunc(
      ctx,
      chainToKind,
      resultKey ? `${ctx.getResultExpr(resultKey)}` : 'never'
    )
    return ctx.evaluateType(ctx, resultType)
  }),

  BindTo: async () => {
    const [labelTyp, effTyp] = args
    const label = ctx.getTypeValue(labelTyp)
    const [resultKey] = effTyp ? await ctx.evaluateType(ctx, effTyp) : []
    if (resultKey) {
      ctx.addToScope(label, resultKey)
      return [resultKey]
    }
    return []
  },

  Label: async () => {
    const label = ctx.getTypeValue(args[0])
    const value = ctx.getKeyInScope(label)
    if (!value) {
      throw new Error(`Label "${label}" not found`)
    }
    return [value]
  },

  Try: ctx.withScope(async () => {
    const [effTyp, catchK] = args

    try {
      if (!effTyp) throw new Error('wow')
      return await ctx.evaluateType(ctx, effTyp)
    } catch (e) {
      const error = JSON.stringify((e as any)?.message ?? e)
      const resultType = applyFunc(ctx, catchK, error)
      return ctx.evaluateType(ctx, resultType)
    }
  }),

  Throw: async () => {
    throw args[0] && ctx.getTypeValue(args[0])
  },

  JsExpr: async () => {
    const [exprTyp] = args
    const exprStr = ctx.getTypeValue(exprTyp)
    const result = eval(`JSON.stringify(${exprStr})`)
    const [resultKey, _] = ctx.createResult(`${result}`)
    return [resultKey]
  },

  Seq: ctx.withScope(async () => {
    const [effectTyps] = args
    const effectResults = await evalList(
      ctx,
      effectTyps?.getTupleElements() ?? []
    )
    const [resultKey, _] = ctx.createResult(`[
      ${effectResults.map(ctx.getResultExpr).join(', ')}
    ]`)
    return [resultKey]
  }),

  Do: ctx.withScope(async () => {
    const [effectTyps] = args
    const effectResults = await evalList(
      ctx,
      effectTyps?.getTupleElements() ?? []
    )
    // TODO: Use last type's result instead of last result key
    const lastResKey = effectResults[effectResults.length - 1]
    const [resultKey, _] = ctx.createResult(
      `${ctx.getResultExpr(lastResKey)}`
    )
    return [resultKey]
  }),
})
