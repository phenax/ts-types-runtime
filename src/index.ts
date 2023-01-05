export interface EffectAtom<T = unknown> { output: T }
export type Effect = EffectAtom[]

export interface PrintString<_ extends string> extends EffectAtom { }
export interface Print<_ extends any> extends EffectAtom { }
export interface Debug<_ extends string, T> extends EffectAtom<T> { }

export interface WriteFile<_Path extends string, _Content extends string> extends EffectAtom { }
export interface ReadFile<_Path extends string> extends EffectAtom<string> { }

export interface GetEnv<_Name extends string> extends EffectAtom<string> { }

export interface ReadLine extends EffectAtom<string> { }

export interface JsExpr<_Expr extends string> extends EffectAtom<any> {}

export interface Program<Effs extends Effect, ExitCode extends number = 0> {
  effects: Effs,
  exitCode: ExitCode,
}

export interface Kind1<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

export interface ChainIO<Eff extends EffectAtom, Fn extends Kind1> extends EffectAtom {
  input: Eff
  chainTo: Fn
}

interface PrintK<Label extends string = ""> extends Kind1<unknown> {
  return: Debug<Label, this['input']>
}

// interface WithInputK extends Kind1<string> {
//   return: ChainIO<ReadLine, PrintK<this['input']>>
// }

// ChainIO<ReadLine, WithInputK>,
// ChainIO<ReadFile<"./default.nix">, PrintK>,
// Print<"Your name?:">,
// ChainIO<ReadLine, PrintK<"Hello,">>,

export type main = Program<[
  [1, 2, 3] extends infer Res ? Print<Res> : never,
  ChainIO<GetEnv<"NODE_ENV">, PrintK>,
  ChainIO<JsExpr<"{ boobaa: [5 * 3, 5 * 2] }">, PrintK>,
]>
