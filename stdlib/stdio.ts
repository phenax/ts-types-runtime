import { Effect } from './effect'

export interface PutString<_ extends string> extends Effect {}

export interface Print<_ extends any> extends Effect {}

export interface Debug<_ extends string, T> extends Effect<T> {}

export interface ReadLine extends Effect<string> {}

export type PutStringLn<S extends string> = PutString<`${S}\n`>
