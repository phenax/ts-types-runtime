export interface Effect<T = unknown> { output: T }

export interface Kind1<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

export interface Bind<_Eff extends Effect, _Fn extends Kind1> extends Effect { }

export interface Seq<_Effs extends Effect[]> extends Effect { }

export interface Do<_Effs extends Effect[]> extends Effect { }

export interface DefineEffect<_Name extends string, _Func extends string> extends Effect { }

