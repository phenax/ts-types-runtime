import { Bind, Kind1 } from '../stdlib/effect'
import { PutString, ReadLine, PutStringLn } from '../stdlib/stdio'

interface ResponseK extends Kind1<string> {
  return: PutStringLn<`Interesting that you believe "${this['input']}" is your purpose. Hmmmm...`>
}

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,

  PutStringLn<'----------------'>,
  PutString<'Your name? '>,
  Bind<ReadLine, <name extends string>() =>
    PutStringLn<`Hello, ${name}`>>,

  PutStringLn<'----------------'>,
  PutString<'Your purpose in life? '>,
  Bind<ReadLine, ResponseK>,

  PutStringLn<'----------------'>,
]
