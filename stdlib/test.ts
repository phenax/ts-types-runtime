import { Effect } from "./effect";

export interface Config {
  compileTimeTestFailures: false
}

type Assertion = Config['compileTimeTestFailures'] extends true ? true : boolean

export interface Assert<_B extends Assertion> extends Effect { }
export interface Test<_m extends string, _effs extends Effect[]> extends Effect { }
