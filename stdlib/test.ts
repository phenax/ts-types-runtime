import { Do, Effect, Kind1 } from './effect'
import { Throw, Try } from './exception'
import { Equals } from './util'

export interface Config {
  // compileTimeTestFailures: false
  // stopAtFailure: true // TODO: stopAtFailure
}

export interface Assert<_B extends boolean> extends Effect {}

export interface Test<_m extends string, _effs extends Effect[]> extends Effect {}

export interface ShowAssertionError<_L extends unknown, _R extends unknown> extends Effect {} 

export type AssertEquals<Left, Right> = Try<
  Assert<Equals<Left, Right>>,
  <m>() => Do<[
    ShowAssertionError<Left, Right>,
    Throw<m>,
  ]>
>

export interface AssertEqualsK<Right extends unknown> extends Kind1 {
  return: AssertEquals<this['input'], Right>
}
