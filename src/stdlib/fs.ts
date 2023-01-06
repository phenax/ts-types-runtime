import { EffectAtom } from './io'

export interface WriteFile<_Path extends string, _Content extends string> extends EffectAtom { }

export interface ReadFile<_Path extends string> extends EffectAtom<string> { }

