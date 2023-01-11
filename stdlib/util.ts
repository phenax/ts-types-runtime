import { Kind1 } from './effect'

export type Let<f extends (...args: any) => any> = ReturnType<f>

export type Apply<K extends Kind1, Val> = (K & { input: Val })['return']

export interface Id extends Kind1 {
  return: this['input']
}

type ADTDescr = { _type: string; value: any }

interface ADTConstructor<A extends ADTDescr> extends Kind1<A['value']> {
  return: this['input'] extends infer Inp ? A & { value: Inp } : A
}

type Pat = Record<string, ADTDescr>
export type ADT<D extends Record<string, any>> = {
  [k in keyof D]: { _type: k; value: D[k] }
} extends infer Rec extends Pat
  ? { t: Rec[keyof Rec] } & { [k in keyof Rec]: ADTConstructor<Rec[k]> }
  : never
