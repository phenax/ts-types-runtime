import { Bind, Kind1 } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { ReadFile } from '../stdlib/fs'
import { Try } from '../stdlib/exception'

interface PrintK extends Kind1<string> {
  return: PutStringLn<this['input']>
}

interface ConstK<Val> extends Kind1<unknown, Val> {
  return: Val
}

export type main = [
  Bind<ReadFile<'./default.nix'>, PrintK>,
  Bind<
    Try<
      ReadFile<'./unicorn'>,
      ConstK<"hello world">
    >,
    PrintK
  >,
]
