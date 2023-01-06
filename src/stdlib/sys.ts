import { EffectAtom } from './io'

export interface GetEnv<_Name extends string> extends EffectAtom<string> { }

export interface GetArgs extends EffectAtom<string[]> { }

export interface JsExpr<_Expr extends string> extends EffectAtom<any> { }

