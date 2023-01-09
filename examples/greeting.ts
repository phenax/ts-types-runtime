import { Bind, Kind1, Seq } from '../stdlib/effect'
import { PutString, ReadLine, PutStringLn } from '../stdlib/stdio'

interface GreetK extends Kind1<string> {
  return: Seq<[PutString<'Hello, '>, PutString<`${this['input']}\n`>]>
}

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,
  PutString<'Your name? '>,
  Bind<ReadLine, GreetK>
]
