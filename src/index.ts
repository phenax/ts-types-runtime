import { Print, PutString, Bind, Debug, Kind1, GetEnv, JsExpr, ReadFile, GetArgs, ReadLine, Seq, Effect, DefineEffect } from './stdlib'

interface PrintK<Label extends string = ""> extends Kind1<unknown> {
  return: Debug<Label, this['input']>
}

interface AskForGuess<N extends number> extends Kind1<string> {
  return: this['input'] extends `${N}` ? Print<"Yaya"> : Print<"naaah">
}

interface StartGuessing extends Kind1<number> {
  return: Bind<Seq<[PutString<"Your guess? ">, ReadLine]>, AskForGuess<this['input']>>
}

interface Wow<_A, _B> extends Effect { }

export type main = [
  DefineEffect<"Wow", `(a, b) => {
    console.log(typeToString(a), '-->', typeToString(b))
  }`>,
  Wow<"a", 69>,

  Bind<GetArgs, PrintK>,
  PutString<"1,2,3? ">,
  [1, 2, 3] extends infer Res ? Print<Res> : never,
  Bind<GetEnv<"NODE_ENV">, PrintK>,
  Bind<JsExpr<"{ boobaa: [5 * 3, 5 * 2] }">, PrintK>,
  Bind<ReadFile<"./default.nix">, PrintK>,

  PutString<"Your name? ">,
  Bind<ReadLine, PrintK<"Hello,">>,

  Bind<
    JsExpr<"Math.floor(Math.random() * 10)">,
    StartGuessing
  >,

  Print<"Before times">,
  Seq<[
    Print<"Hey">,
    Print<"Wow">,
    Bind<JsExpr<"200 * 2">, PrintK<"200 * 2 =">>,
  ]>,
]

