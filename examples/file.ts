import { Bind, Kind1 } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { ReadFile } from '../stdlib/fs'

interface PrintK extends Kind1<string> {
  return: PutStringLn<this['input']>
}

export type main = Bind<ReadFile<'./default.nix'>, PrintK>
