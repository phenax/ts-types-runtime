import { EffectAtom } from './io'

export interface PutString<_ extends string> extends EffectAtom { }

export interface Print<_ extends any> extends EffectAtom { }

export interface Debug<_ extends string, T> extends EffectAtom<T> { }

export interface ReadLine extends EffectAtom<string> { }

