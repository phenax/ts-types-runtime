import { PutString, Bind, Kind1, ReadLine, Seq } from '../src/stdlib'

interface GreetK extends Kind1<string> {
  return: Seq<[
    PutString<"Hello, ">,
    PutString<`${this['input']}\n`>
  ]>,
}

export type main = [
  PutString<"Your name? ">,
  Bind<ReadLine, GreetK>,
]

