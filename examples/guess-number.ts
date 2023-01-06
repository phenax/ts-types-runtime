import { Print, PutString, Bind, Kind1, JsExpr, ReadLine, Do, PutStringLn } from '../src/stdlib'

export type main = [
  PutStringLn<"You have 5 guesses">,
  Bind<
    JsExpr<"Math.floor(Math.random() * 10)">,
    StartGuessing
  >
]

interface AskForGuess<N extends number, Attempts extends 0[]> extends Kind1<string> {
  return: `${this['input']}` extends `${N}`
    ? PutStringLn<"Yay! You got it right!">
    : Do<[
      Print<`Wrong guess. Total attempts: ${
        [...Attempts, 0] extends infer Ls extends 0[] ? Ls['length'] : 0
      }`>,
      (StartGuessing<[...Attempts, 0]> & { input: N })['return'],
    ]>
}

interface StartGuessing<Attempts extends 0[] = []> extends Kind1<number> {
  return: Attempts['length'] extends 5
    ? PutStringLn<"Max attempts exceeded. Game over!">
    : Bind<
      Do<[
        PutString<"Your guess? ">,
        ReadLine
      ]>,
      AskForGuess<this['input'], Attempts>
    >
}

