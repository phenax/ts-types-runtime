import { Bind, Kind1 } from '../stdlib/effect'
import { PutString, ReadLine, PutStringLn } from '../stdlib/stdio'

interface GreetK extends Kind1<string> {
  return: PutStringLn<`Hello, ${this['input']}`>
}

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,
  PutString<'Your name? '>,
  Bind<ReadLine, GreetK>
]
