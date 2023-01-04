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

export interface Kind<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

export interface WriteFileC extends Kind<string> {
  return: WriteFile<"./somefile.txt", this['input']>
}

export interface ChainIO<Eff extends EffectAtom, Fn extends Kind> extends EffectAtom {
  input: Eff
  chainTo: Fn
}

export type main = Program<[
  [1, 2, 3] extends infer Res ? Print<Res> : never,
  Print<"bye bye">,
  ReadFile<"./.gitignore">,

  ChainIO<
    ReadFile<"./default.nix">,
    WriteFileC
  >,
]>
