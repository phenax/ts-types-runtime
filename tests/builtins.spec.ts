import { Bind, BindTo, Do, Effect, Label, Pure } from '../stdlib/effect'
import { Throw, Try } from '../stdlib/exception'
import { PutStringLn } from '../stdlib/stdio'
import { DefineEffect, JsExpr, SetEvalEnvironment } from '../stdlib/sys'
import { Test, AssertEqualsK, AssertEquals } from '../stdlib/test'

interface MyEffect<_a extends number, _b extends string, _c extends unknown> extends Effect {}

export type main = [
  SetEvalEnvironment<'test.node'>,

  PutStringLn<'====================='>,
  PutStringLn<'=== Running tests ==='>,
  PutStringLn<'=====================\n\n'>,

  Do<[
    PutStringLn<'Bind & BindTo'>,

    Test<'should bind value to function and kind', [
      Bind<Pure<[1,2,3]>, <val extends number[]>() =>
        AssertEquals<val, [1, 2, 3]>>,

      Bind<Pure<[1,2,3]>, AssertEqualsK<[1,2,3]>>,
    ]>,

    Test<'should bind label correctly', [
      BindTo<"value", Pure<{ a: 'b', c: { d: 1 } }>>,

      Bind<Label<"value">, AssertEqualsK<{ a: 'b', c: { d: 1 } }>>,
    ]>,

    Test<'should bind only inside Do scope', [
      Do<[
        BindTo<"value", Pure<"some value">>,
        Bind<Label<"value">, AssertEqualsK<"some value">>,
      ]>,

      Bind<
        Try<Label<"value">, <_>() => Pure<"none">>,
        AssertEqualsK<"none">
      >,
    ]>,

    Test<'should bind only inside Bind scope', [
      Bind<
        BindTo<"value", Pure<"some value">>,
        <_>() => Bind<Label<"value">, AssertEqualsK<"some value">>
      >,

      Bind<
        Try<Label<"value">, <_>() => Pure<"none">>,
        AssertEqualsK<"none">
      >,
    ]>,
  ]>,

  Do<[
    PutStringLn<'Try/Throw'>,

    Test<'should return the result of effect', [
      Bind<Try<Pure<20>, <_>() => Pure<0>>,
        AssertEqualsK<20>>,
    ]>,

    Test<'should return the result of error handler', [
      Bind<Try<Do<[ Throw<"wow">, Pure<20> ]>, <_>() => Pure<0>>,
        AssertEqualsK<0>>,

      Bind<Try<Do<[ Throw<"wow">, Pure<20> ]>, <e>() => Pure<e>>,
        AssertEqualsK<"wow">>,
    ]>,
  ]>,

  Do<[
    PutStringLn<'FFI'>,

    Test<'should return the result of js expression', [
      Bind<JsExpr<'69 * 420'>, AssertEqualsK<28980>>,
    ]>,

    Test<'should test custom effect', [
      DefineEffect<'MyEffect', `([a, b, c], ctx) => {
        return [
          ctx.getTypeValue(a) * 2,
          ctx.getTypeValue(b) + '!',
          [...ctx.getTypeValue(c), 'wow'],
        ]
      }`>,
      Bind<MyEffect<4, "hey", [1, 2]>, AssertEqualsK<[
        8, "hey!", [1, 2, 'wow'],
      ]>>,
    ]>,
  ]>,

  PutStringLn<"">,
]
