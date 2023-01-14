import { Bind, Kind1 } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { ReadFile } from '../stdlib/fs'
import { Try } from '../stdlib/exception'

interface PrintK extends Kind1<string> {
  return: PutStringLn<this['input']>
}

export type main = [
  Bind<ReadFile<'./default.nix'>, <contents extends string>() =>
    PutStringLn<contents>>,

  Try<
    Bind<ReadFile<'./unicorn'>, PrintK>,
    <M extends string>() => PutStringLn<`ERROR: ${M}`>
  >
]
