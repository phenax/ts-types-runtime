export interface EffectAtom<T = unknown> { output: T }
export type Effect = EffectAtom[]

export interface Kind1<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

export interface Program<Effs extends Effect, ExitCode extends number = 0> {
  effects: Effs,
  exitCode: ExitCode,
}

export interface Bind<Eff extends EffectAtom, Fn extends Kind1> extends EffectAtom {
  input: Eff
  chainTo: Fn
}

export interface Seq<Effs extends EffectAtom[]> extends EffectAtom {
  effects: Effs
}

