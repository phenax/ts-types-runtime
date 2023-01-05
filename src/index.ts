export interface EffectAtom<T = unknown> { output: T }
export type Effect = EffectAtom[]

export interface PrintString<_ extends string> extends EffectAtom { }
export interface Print<_ extends any> extends EffectAtom { }
// interface Debug<_ extends string, T> extends EffectAtom<T> { }

export interface WriteFile<_Path extends string, _Content extends string> extends EffectAtom { }
export interface ReadFile<_Path extends string> extends EffectAtom<string> { }

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

export interface PrintK extends Kind1<string> {
  return: Print<this['input']>
}

export type main = Program<[
  [1, 2, 3] extends infer Res ? Print<Res> : never,
  Print<`wow: ${string} -> ${'helo'}`>,
  ChainIO<ReadFile<"./default.nix">, PrintK>,
]>
