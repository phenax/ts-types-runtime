import { Do } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { SetEvalEnvironment } from '../stdlib/sys'
import { Test, Assert } from '../stdlib/test'
import { Equals, Not } from '../stdlib/util'

type testSomeStuff = Do<[
  PutStringLn<"Some Stuff">,

  Test<"should do some stuff", [
    Assert<Equals<1, 1>>,
    Assert<Not<Equals<2, 1>>>,
  ]>,

  Test<"bing bong, bing bing bong", [
    Assert<Equals<1, 1>>,
  ]>,
]>

type testSomeMoreStuff = Do<[
  PutStringLn<"Other stuff?">,

  Test<"should do some other stuff", [
    Assert<Equals<[1, 2, 3], [1, 2, 3]>>,
  ]>,

  // Test<"this'll fail fo sho", [
  //   Assert<Equals<[1, 2, 3], [4, 5, 6]>>,
  // ]>,
]>

export type main = [
  // Update env to node with test helpers
  SetEvalEnvironment<'test.node'>,

  PutStringLn<"=== Running tests... ===\n">,

  testSomeStuff,
  testSomeMoreStuff,
]
