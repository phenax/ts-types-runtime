import { Bind, Kind1, Do } from '../stdlib/effect'
import { PutString, ReadLine, PutStringLn } from '../stdlib/stdio'
import { JsExpr } from '../stdlib/sys'

export type main = [
  PutStringLn<'Guess a number between 0 & 9. You have 5 guesses'>,
  Bind<JsExpr<'Math.floor(Math.random() * 10)'>, StartGuessing>
]

interface AskForGuess<N extends number, Attempts extends 0[]> extends Kind1<string> {
  return: `${this['input']}` extends `${N}`
    ? PutStringLn<'Yay! You got it right!'>
    : Do<
        [
          PutString<'Wrong guess. Total attempts'>,
          PutStringLn<` ${[...Attempts, 0] extends infer Ls extends 0[]
            ? Ls['length']
            : 0}/5`>,
          (StartGuessing<[...Attempts, 0]> & { input: N })['return']
        ]
      >
}

interface StartGuessing<Attempts extends 0[] = []> extends Kind1<number> {
  return: Attempts['length'] extends 5
    ? PutStringLn<'Max attempts exceeded. Game over!'>
    : Bind<
        Do<[PutString<'Your guess? '>, ReadLine]>,
        AskForGuess<this['input'], Attempts>
      >
}
