import {
  Bind,
  BindTo,
  Do,
  Effect,
  Label,
  Noop,
  Pure,
  Seq,
} from '../stdlib/effect'
import { Throw, Try } from '../stdlib/exception'
import { Print, PutStringLn } from '../stdlib/stdio'
import { DefineEffect, JsExpr, SetEvalEnvironment } from '../stdlib/sys'
import { Test, AssertEqualsK, AssertEquals } from '../stdlib/test'

interface MyEffect<_a extends number, _b extends string, _c extends unknown>
  extends Effect {}

export type main = [
  SetEvalEnvironment<'test.node'>,

  PutStringLn<'====================='>,
  PutStringLn<'=== Running tests ==='>,
  PutStringLn<'=====================\n\n'>,

  testDo,
  testSeq,
  testBind,
  testException,
  testFFI,

  PutStringLn<''>
]

type testSeq = Do<
  [
    PutStringLn<'Seq'>,

    Test<
      'should run a sequence of effects and all results',
      [
        BindTo<'result', Seq<[Pure<1>, Pure<2>, Pure<3>, Pure<4>]>>,

        Bind<Label<'result'>, AssertEqualsK<[1, 2, 3, 4]>>
      ]
    >,

    Test<
      'should produce undefined for effects with no result',
      [
        BindTo<'result', Seq<[Pure<1>, Noop, Pure<3>, Noop]>>,

        Bind<Label<'result'>, AssertEqualsK<[1, undefined, 3, undefined]>>
      ]
    >
  ]
>

type testDo = Do<
  [
    PutStringLn<'Do'>,

    Test<
      'should run a sequence of effects and return the last effect',
      [
        BindTo<'result', Do<[Pure<1>, Pure<2>, Pure<3>, Pure<4>]>>,

        Bind<Label<'result'>, AssertEqualsK<4>>
      ]
    >,

    Test<
      'should return undefined if last effect doesnt produce a result',
      [
        BindTo<'result', Do<[Pure<1>, Noop, Pure<3>, Noop]>>,

        Bind<Label<'result'>, AssertEqualsK<undefined>>
      ]
    >
  ]
>

type testBind = Do<
  [
    PutStringLn<'Bind & BindTo'>,

    Test<
      'should bind value to function and kind',
      [
        Bind<
          Pure<[1, 2, 3]>,
          <val extends number[]>() => AssertEquals<val, [1, 2, 3]>
        >,

        Bind<Pure<[1, 2, 3]>, AssertEqualsK<[1, 2, 3]>>
      ]
    >,

    Test<
      'should bind label correctly',
      [
        BindTo<'value', Pure<{ a: 'b'; c: { d: 1 } }>>,

        Bind<Label<'value'>, AssertEqualsK<{ a: 'b'; c: { d: 1 } }>>
      ]
    >,

    Test<
      'should bind only inside Do scope',
      [
        Do<
          [
            BindTo<'value', Pure<'some value'>>,
            Bind<Label<'value'>, AssertEqualsK<'some value'>>
          ]
        >,

        Bind<Try<Label<'value'>, <_>() => Pure<'none'>>, AssertEqualsK<'none'>>
      ]
    >,

    Test<
      'should bind only inside Bind scope',
      [
        Bind<
          BindTo<'value', Pure<'some value'>>,
          <_>() => Bind<Label<'value'>, AssertEqualsK<'some value'>>
        >,

        Bind<Try<Label<'value'>, <_>() => Pure<'none'>>, AssertEqualsK<'none'>>
      ]
    >
  ]
>

type testException = Do<
  [
    PutStringLn<'Try/Throw'>,

    Test<
      'should return the result of effect',
      [Bind<Try<Pure<20>, <_>() => Pure<0>>, AssertEqualsK<20>>]
    >,

    Test<
      'should return the result of error handler',
      [
        Bind<
          Try<Do<[Throw<'wow'>, Pure<20>]>, <_>() => Pure<0>>,
          AssertEqualsK<0>
        >,

        Bind<
          Try<Do<[Throw<'wow'>, Pure<20>]>, <e>() => Pure<e>>,
          AssertEqualsK<'wow'>
        >
      ]
    >
  ]
>

type testFFI = Do<
  [
    PutStringLn<'FFI'>,

    Test<
      'should return the result of js expression',
      [Bind<JsExpr<'69 * 420'>, AssertEqualsK<28980>>]
    >,

    Test<
      'should test custom effect',
      [
        DefineEffect<
          'MyEffect',
          `([a, b, c], ctx) => {
              return [
                ctx.getTypeValue(a) * 2,
                ctx.getTypeValue(b) + '!',
                [...ctx.getTypeValue(c), 'wow'],
              ]
            }`
        >,
        Bind<
          MyEffect<4, 'hey', [1, 2]>,
          AssertEqualsK<[8, 'hey!', [1, 2, 'wow']]>
        >
      ]
    >
  ]
>
