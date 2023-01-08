import { Effect } from './io'

export interface WriteFile<_Path extends string, _Content extends string>
  extends Effect {}

export interface ReadFile<_Path extends string> extends Effect<string> {}
