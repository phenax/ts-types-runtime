import { DefineEffect, Effect } from '../src/stdlib'

interface Wow<_A, _B> extends Effect { }

export type main = [
  DefineEffect<"Wow", `(a, b) => {
    console.log(typeToString(a), '-->', typeToString(b))
  }`>,
  Wow<"a", 69>,
]
