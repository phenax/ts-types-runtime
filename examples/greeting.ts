import { PutString, Bind, Kind1, ReadLine, Seq, PutStringLn } from '../stdlib'

interface GreetK extends Kind1<string> {
  return: Seq<[PutString<'Hello, '>, PutString<`${this['input']}\n`>]>
}

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,
  PutString<'Your name? '>,
  Bind<ReadLine, GreetK>
]
