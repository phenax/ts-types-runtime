import { Kind1 } from './effect'

export type Let<f extends (...args: any) => any> = ReturnType<f>

export type ApplyK<K extends Kind1, Val> = (K & { input: Val })['return']

export type Id = <T>() => T
export interface IdK extends Kind1 {
  return: this['input']
}

export interface ConstK<Val> extends Kind1<unknown, Val> {
  return: Val
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

export type Equals<Left, Right> = [Left] extends [Right]
  ? [Right] extends [Left]
    ? true
    : false
  : false

export type Not<B extends boolean> = B extends true ? false : true
