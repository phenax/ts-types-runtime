import { Bind, Kind1, ReadFile, PutStringLn } from '../src/stdlib'

interface PrintK extends Kind1<string> {
  return: PutStringLn<this['input']>
}

export type main = [
  Bind<ReadFile<"./default.nix">, PrintK>,
]