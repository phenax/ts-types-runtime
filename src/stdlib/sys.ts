import { Effect } from './io'

export interface GetEnv<_Name extends string> extends Effect<string> { }

export interface GetArgs extends Effect<string[]> { }

export interface JsExpr<_Expr extends string> extends Effect<any> { }

