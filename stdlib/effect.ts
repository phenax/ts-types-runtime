export interface Effect<T = unknown> {
  output: T
}

export interface Kind1<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

type Func<Inp = unknown, Out = unknown>
  = Kind1<Inp, Out>
  | (<_T extends Inp>() => Out)

export interface Bind<_Eff extends Effect, _Fn extends Func> extends Effect {}

export interface Seq<_Effs extends Effect[]> extends Effect {}

export interface Do<_Effs extends Effect[]> extends Effect {}

export interface Pure<V> extends Effect<V> {}
