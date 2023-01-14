import { SyntaxKind, Type } from 'ts-morph'
import { Ctx } from './types'

export const match = <K extends string, R>(
  k: K | undefined,
  pattern: { [key in K | '_']: () => R }
) => (k && pattern[k] ? pattern[k]() : pattern._())

export const evalList = async (ctx: Ctx, effectTyps: Type[]) => {
  const effectResults: (string | undefined)[] = []
  for (const item of effectTyps ?? []) {
    const [resultKey] = await ctx.evaluateType(ctx, item)
    effectResults.push(resultKey ? resultKey : undefined)
  }
  return effectResults
}

export const applyFunc = (
  ctx: Ctx,
  fn: Type | undefined,
  val: string
): Type => {
  const resultType = (() => {
    const baseTypes = fn
      ?.getBaseTypes()
      .flatMap((t) => t.getSymbol()?.getName() ?? [])

    if (!!fn?.getProperty('return') || baseTypes?.includes('Kind1')) {
      const [key, resultNode] = ctx.createResult(
        `(${ctx.typeToString(fn)} & { input: ${val} })['return']`
      )
      ctx.removeResult(key)

      return resultNode
        ?.getType()
        .getProperty('output')
        ?.getTypeAtLocation(resultNode)
    } else {
      const [key, resultNode] = ctx.createResult(
        `ReturnType<${ctx.typeToString(fn)}>`
      )
      ctx.removeResult(key)

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

  if (!resultType) {
    throw new Error('Couldnt get result for function application')
  }

  return resultType
}
