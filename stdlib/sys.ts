import { Effect } from './effect'

export interface GetEnv<_Name extends string> extends Effect<string> {}

export interface GetArgs extends Effect<string[]> {}

export interface JsExpr<_Expr extends string> extends Effect<any> {}

export interface DefineEffect<_Name extends string, _Func extends string>
  extends Effect {}

export interface Exit<_ extends number | undefined = undefined>
  extends Effect {}

export interface SetEvalEnvironment<_Env extends 'test.node' | 'node'>
  extends Effect {}
