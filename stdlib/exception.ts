import { Effect, Func } from './effect'

export interface Try<_E extends Effect, _Catch extends Func> extends Effect {}

export interface Throw<_E> extends Effect {}
