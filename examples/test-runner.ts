import { Do, Effect } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { DefineEffect } from '../stdlib/sys'

type Test<m extends string, effs extends Effect[]> = [
  PutStringLn<`* ${m}`>,
  ...effs,
]

type Equals<Left, Right> =
  [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false

type Not<B extends boolean> = B extends true ? false : true

interface TestConfig {
  CompileTestFailures: false
}

type Assertion = TestConfig['CompileTestFailures'] extends true ? true : boolean
interface Assert<_B extends Assertion> extends Effect { }

export type main = [
  DefineEffect<'Assert', `([b], ctx) => {
    if (!ctx.getTypeValue(b)) {
      throw new Error('AAAAAAA')
    }
  }`>,

  PutStringLn<"Running tests...">,

  Do<[
    ...Test<"should do some stuff", [
      Assert<Equals<1, 1>>,
      Assert<Not<Equals<2, 1>>>,
    ]>,

    ...Test<"hello world", [
      Assert<Equals<1, 1>>,
    ]>,

    ...Test<"should do some other stuff", [
      Assert<Equals<1, 1>>,
    ]>,
  ]>,
]
