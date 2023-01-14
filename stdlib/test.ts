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

export interface Test<_m extends string, _effs extends Effect[]>
  extends Effect {}

export interface ShowAssertionError<_L extends unknown, _R extends unknown>
  extends Effect {}

export type AssertEquals<Left, Right> = Try<
  Assert<Equals<Left, Right>>,
  <m>() => Do<[ShowAssertionError<Left, Right>, Throw<m>]>
>

export interface AssertEqualsK<Right extends unknown> extends Kind1 {
  return: AssertEquals<this['input'], Right>
}
