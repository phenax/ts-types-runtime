import { Type } from 'ts-morph'
import { Ctx } from "../types"

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
      const [ keyTy, valTyp ] = args
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

    Bind: async () => {
      const [inputTyp, chainToKind] = args
      const [resultKey] = inputTyp ? await ctx.evaluateType(ctx, inputTyp) : []

      // TODO: Handle resultKey undefined case
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

      return compTyp ? await ctx.evaluateType(ctx, compTyp) : []
    },

    Try: async () => {
      const [effTyp, catchK] = args

      try {
        if (!effTyp) throw new Error('wow')
        return await ctx.evaluateType(ctx, effTyp)
      } catch(e) {
        const error = JSON.stringify((e as any)?.message ?? e)
        const catchResExpr = `(${ctx.typeToString(catchK)} & { input: ${error} })['return']`
        const [resultKey, _] = ctx.createResult(catchResExpr)
        return [resultKey]
      }
    },

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

    Seq: async () => {
      const [effectTyps] = args
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
      const [effectTyps] = args
      const effectResults = await evalList(
        ctx,
        effectTyps?.getTupleElements() ?? []
      )
      // TODO: Use last type's result instead of last result key
      const lastResKey = effectResults[effectResults.length - 1]
      const [resultKey, _] = ctx.createResult(
        `(${ctx.getResultExpr(lastResKey)})['output']`
      )
      return [resultKey]
    },
})
