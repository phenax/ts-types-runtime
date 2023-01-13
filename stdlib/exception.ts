import { Effect, Kind1 } from './effect'

export interface Try<_E extends Effect, _Catch extends Kind1> extends Effect {}

export interface Throw<_E> extends Effect {}
