import { Print, PutString, Bind, Kind1, JsExpr, ReadLine, Seq } from '../src/stdlib'

export type main = Bind<
  JsExpr<"Math.floor(Math.random() * 10)">,
  StartGuessing
>

interface AskForGuess<N extends number> extends Kind1<string> {
  return: this['input'] extends `${N}` ? Print<"Yaya"> : Print<"naaah">
}

interface StartGuessing extends Kind1<number> {
  return: Bind<Seq<[PutString<"Your guess? ">, ReadLine]>, AskForGuess<this['input']>>
}

