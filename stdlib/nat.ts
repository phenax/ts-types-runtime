export type Nat = Zero | { _prev: Nat }
export type Zero = { _prev: null }
export type Succ<N extends Nat> = { _prev: N }
export type Pred<N extends Nat> = N extends Zero ? Zero : N['_prev']

export type Add<A extends Nat, B extends Nat> = A extends Zero
  ? B
  : Add<Pred<A>, Succ<B>>

export type ToNumber<N extends Nat, Acc extends 0[] = []> = N extends Zero
  ? Acc['length']
  : ToNumber<Pred<N>, [...Acc, 0]>

export type FromNumber<
  N extends number,
  Res extends Nat = Zero,
  Acc extends 0[] = []
> = N extends Acc['length'] ? Res : FromNumber<N, Succ<Res>, [...Acc, 0]>

export type _0 = Zero
export type _1 = Succ<_0>
export type _2 = Succ<_1>
export type _3 = Succ<_2>
export type _4 = Succ<_3>
export type _5 = Succ<_4>
export type _9 = Add<_4, _5>
