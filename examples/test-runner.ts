import { DefineEffect, Do, Effect, Print, PutString, PutStringLn } from '../stdlib'

type Testi<m extends string, effs extends Effect[]> = [
  PutStringLn<m>,
  ...effs,
]

type Equals<Left, Right> =
  [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false

interface Assert<_B extends true> extends Effect { }

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
