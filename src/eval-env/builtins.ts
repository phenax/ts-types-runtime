import { SyntaxKind, Type } from 'ts-morph'
import { Ctx } from '../types'
import { evalList } from '../util'

const applyFunc = (ctx: Ctx, fn: Type | undefined, val: string): Type => {
  const resultType = (() => {
    const baseTypes = fn?.getBaseTypes().flatMap(t => t.getSymbol()?.getName())

    if (baseTypes?.includes('Kind1')) {
      const [_, resultNode] = ctx.createResult(
        `(${ctx.typeToString(fn)} & { input: ${val} })['return']`
      )
      return resultNode
        ?.getType()
        .getProperty('output')
        ?.getTypeAtLocation(resultNode)
    } else {
      const [_key, resultNode] = ctx.createResult(`ReturnType<${ctx.typeToString(fn)}>`)

      const resValueNode = resultNode
        ?.asKind(SyntaxKind.PropertySignature)
        ?.getChildAtIndexIfKind(2, SyntaxKind.TypeLiteral)
        ?.getProperty('output')
        ?.getChildAtIndexIfKind(2, SyntaxKind.TypeReference)

      const functionNode = resValueNode
        ?.getChildAtIndexIfKind(1, SyntaxKind.SyntaxList)
        ?.getFirstChildIfKind(SyntaxKind.FunctionType)

      if (functionNode) {
        const typeParameters = functionNode.getTypeParameters() ?? []

        if (typeParameters.length > 0) {
          const constraint = typeParameters[0]?.getConstraint()
          if (constraint) {
            constraint?.replaceWithText(val)
          } else {
            typeParameters[0]?.setConstraint(val)
          }
        }

        return resValueNode?.getType()
      }
    }

    return undefined
  })()

  // TODO: Cleanup unwanted result node values

  if (!resultType) {
    throw new Error('Fuck shit')
  }

  return resultType
}

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

    const resultType =
      applyFunc(ctx, chainToKind, `(${ctx.getResultExpr(resultKey)})['output']`)
    return ctx.evaluateType(ctx, resultType)
  },

  Try: async () => {
    const [effTyp, catchK] = args

    try {
      if (!effTyp) throw new Error('wow')
      return await ctx.evaluateType(ctx, effTyp)
    } catch (e) {
      const error = JSON.stringify((e as any)?.message ?? e)
      const resultType = applyFunc(ctx, catchK, error)
      return ctx.evaluateType(ctx, resultType)
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
