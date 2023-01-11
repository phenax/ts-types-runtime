import { Bind, Effect, Kind1 } from '../stdlib/effect'
import { DefineEffect, JsExpr } from '../stdlib/sys'
import { Debug } from '../stdlib/stdio'

interface PrintK<Label extends string = ''> extends Kind1 {
  return: Debug<Label, this['input']>
}

// Declare custom effect
interface CustomThingy<_A, _B extends number> extends Effect {}

// Alias for squaring a number
type Square<N extends number> = JsExpr<`${N} ** 2`>

export type main = [
  // FFI via js expression
  Bind<JsExpr<'{ boobaa: [5 * 3, 5 * 2] }'>, PrintK<'|'>>,
  Bind<Square<69>, PrintK<'69^2 ='>>,

  // FFI via custom effect
  DefineEffect<
    'CustomThingy',
    `([a, b], ctx) => {
      console.log(ctx.typeToString(a))
      return { result: 5 * ctx.getTypeValue(b) }
    }`
  >,
  Bind<CustomThingy<'a', 69>, PrintK<'69 * 5 ='>>
]
