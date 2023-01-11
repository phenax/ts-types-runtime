import { Bind, Effect, Kind1 } from '../stdlib/effect'
import { DefineEffect } from '../stdlib/sys'
import { Print } from '../stdlib/stdio'

interface Mathemagic<_A, _B> extends Effect {}

interface PrintK extends Kind1 {
  return: Print<this['input']>
}

export type main = [
  DefineEffect<
    'Mathemagic',
    `(a, b) => {
      console.log(typeToString(a))
      return { result: 5 * b.getLiteralValue() }
    }`
  >,
  Bind<Mathemagic<'a', 69>, PrintK>
]
