import { Do, Kind1 } from '../stdlib/effect'
import { Print, PutStringLn } from '../stdlib/stdio'
import { SetEvalEnvironment } from '../stdlib/sys'
import { Test, Assert } from '../stdlib/test'
import { Equals, Not } from '../stdlib/util'

interface PrintK extends Kind1 {
  return: Print<this['input']>
}

export type main = [
  SetEvalEnvironment<'test.node'>,

  PutStringLn<"Running tests...">,

  Do<[
    Test<"should do some stuff", [
      Assert<Equals<1, 2>>,
      Assert<Not<Equals<2, 1>>>,
    ]>,

    Test<"hello world", [
      Assert<Equals<1, 1>>,
    ]>,

    Test<"should do some other stuff", [
      Assert<Equals<1, 1>>,
    ]>,
  ]>,
]
