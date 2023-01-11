import { Do, Effect } from '../stdlib/effect'
import { Print, PutStringLn } from '../stdlib/stdio'
import { DefineEffect } from '../stdlib/sys'

type Testi<m extends string, effs extends Effect[]> = [
  PutStringLn<m>,
  ...effs,
]

type Equals<Left, Right> =
  [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false


type CompileTimeErrors = false
interface Assert<_B extends (CompileTimeErrors extends true ? true : boolean)> extends Effect { }

type testCases = [
  ...Testi<"should do some stuff", [
    Assert<Equals<1, 2>>,
  ]>,

  ...Testi<"hello world", [
    Print<2>,
  ]>,

  ...Testi<"should do some other stuff", [
    Print<5>,
  ]>,
]

export type main = [
  DefineEffect<'Assert', `(b) => {
    if (!b.getLiteralValue()) {
      throw new Error('AAAAAAA')
    }
  }`>,
  PutStringLn<"Running tests...">,
  Do<testCases>,
]
