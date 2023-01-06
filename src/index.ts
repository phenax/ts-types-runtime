import { Program, Print, PutString, Bind, Debug, Kind1, GetEnv, JsExpr, ReadFile, GetArgs, ReadLine } from './stdlib'

interface PrintK<Label extends string = ""> extends Kind1<unknown> {
  return: Debug<Label, this['input']>
}

export type main = Program<[
  Bind<GetArgs, PrintK>,
  [1, 2, 3] extends infer Res ? Print<Res> : never,
  Bind<GetEnv<"NODE_ENV">, PrintK>,
  Bind<JsExpr<"{ boobaa: [5 * 3, 5 * 2] }">, PrintK>,
  // ChainIO<ReadLine, WithInputK>,
  Bind<ReadFile<"./default.nix">, PrintK>,
  PutString<"Your name? ">,
  Bind<ReadLine, PrintK<"Hello,">>,
]>

