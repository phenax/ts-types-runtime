import { Bind, Debug, JsExpr, Kind1 } from "../src/stdlib"

interface PrintK<Label extends string = ""> extends Kind1 {
  return: Debug<Label, this['input']>
}

type Square<N extends number> = JsExpr<`${N} ** 2`>

export type main = [
  Bind<JsExpr<"{ boobaa: [5 * 3, 5 * 2] }">, PrintK<'|'>>,
  Bind<Square<69>, PrintK<"69^2 =">>,
]
