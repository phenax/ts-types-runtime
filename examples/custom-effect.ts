import { Bind, DefineEffect, Effect, Kind1, Print } from '../stdlib'

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
