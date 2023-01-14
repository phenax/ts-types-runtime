import { Bind, Do, Kind1 } from '../stdlib/effect'
import { WriteFile } from '../stdlib/fs'
import { PutString, ReadLine, PutStringLn } from '../stdlib/stdio'

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,
  PutStringLn<''>,

  PutString<'Your name? '>,
  Bind<ReadLine, <name extends string>() => PutStringLn<`Hello, ${name}`>>,

  PutString<'Your purpose in life? '>,
  Bind<ReadLine, HandleResponseK>,

  PutStringLn<'Bye bye'>
]

interface HandleResponseK extends Kind1<string> {
  return: Do<
    [
      PutStringLn<`Interesting that you believe "${this['input']}" is your purpose. Hmmmm...`>,
      PutStringLn<'Judging harshly...'>,
      PutStringLn<'Saving response...'>,
      WriteFile<'./response.txt', this['input']>
    ]
  >
}
