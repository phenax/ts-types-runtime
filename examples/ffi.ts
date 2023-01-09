import { Bind, Effect, Kind1 } from '../stdlib/effect'
import { DefineEffect, JsExpr } from '../stdlib/sys'
import { Debug } from '../stdlib/stdio'

interface PrintK<Label extends string = ''> extends Kind1 {
  return: Debug<Label, this['input']>
}

type Square<N extends number> = JsExpr<`${N} ** 2`>

interface Mathemagic<_A, _B extends number> extends Effect {}

export type main = [
  Bind<JsExpr<'{ boobaa: [5 * 3, 5 * 2] }'>, PrintK<'|'>>,
  Bind<Square<69>, PrintK<'69^2 ='>>,
  DefineEffect<
    'Mathemagic',
    `(a, b) => {
      console.log(typeToString(a))
      return { result: 5 * b.getLiteralValue() }
    }`
  >,
  Bind<Mathemagic<'a', 69>, PrintK<'69 * 5 ='>>
]
