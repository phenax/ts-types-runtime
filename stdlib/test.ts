import { Do, Effect, Kind1 } from './effect'
import { Throw, Try } from './exception'
import { Equals } from './util'

/**
 * Assert a boolean expression is true
 *
 * @typeParam _B - The boolean value to assert
 *
 * @throws {"assertion error"} if false
 *
 * @example
 * Here's an example checking if `SomeValue` is not equal to [1,2,3]
 * Uses - {@link util.Not}, {@link util.Equals}
 *
 * ```ts
 * Assert<Not<Equals<SomeValue, [1, 2, 3]>>>
 * ```
 */
export interface Assert<_B extends boolean> extends Effect {}

/**
 * Create a test block
 *
 * @typeParam _M - description of the test
 * @typeParam _Effs - List of effects to evaluate
 *
 * @example
 * ```ts
 * type main = [
 *   Test<"should check if result is 21", [
 *     Bind<EvalSomeEffect<2, 3>, <a extends number>() => AssertEquals<a, 21>>,
 *     // equivalent to...
 *     Bind<EvalSomeEffect<2, 3>, AssertEqualsK<21>>,
 *   ]>
 * ]
 * ```
 */
export interface Test<_M extends string, _Effs extends Effect[]>
  extends Effect {}

export interface ShowAssertionError<_L extends unknown, _R extends unknown>
  extends Effect {}

/**
 * Assert if left and right values are equal structurally
 *
 * @typeParam _Left - Left value
 * @typeParam _Right - Right value
 *
 * @example
 * ```ts
 * type main = [
 *   AssertEquals<`Foo ${'bar'}`, 'Foo bar'>
 *   AssertEquals<[2, ...[3, 4]], [2, 3, 4]>
 * ]
 * ```
 */
export type AssertEquals<Left, Right> = Try<
  Assert<Equals<Left, Right>>,
  <m>() => Do<[ShowAssertionError<Left, Right>, Throw<m>]>
>

/**
 * An alternate point-free api for {@link AssertEquals}
 *
 * @typeParam _Right - Right value
 *
 * @example
 * ```ts
 * type main = [
 *   Bind<JsExpr<'21 * 3'>, AssertEqualsK<63>>
 * ]
 * ```
 */
export interface AssertEqualsK<Right extends unknown> extends Kind1 {
  return: AssertEquals<this['input'], Right>
}
