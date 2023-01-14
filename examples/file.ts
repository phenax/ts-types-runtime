import { Bind, BindTo, Do, Kind1, Label } from '../stdlib/effect'
import { PutStringLn } from '../stdlib/stdio'
import { ReadFile } from '../stdlib/fs'
import { Try } from '../stdlib/exception'

interface PrintK extends Kind1<string> {
  return: PutStringLn<this['input']>
}

export type main = [
  Do<
    [
      BindTo<'contents', ReadFile<'./bin.js'>>,
      PutStringLn<'------'>,
      Bind<Label<'contents'>, <c extends string>() => PutStringLn<c>>
    ]
  >,

  Try<
    Bind<Label<'contents'>, PrintK>,
    <e extends string>() => PutStringLn<`ERROR: ${e}`>
  >,

  PutStringLn<'-------------'>,

  Bind<ReadFile<'./default.nix'>, <c extends string>() => PutStringLn<c>>,

  PutStringLn<'-------------'>,

  Try<
    Bind<ReadFile<'./unicorn'>, PrintK>,
    <M extends string>() => PutStringLn<`ERROR: ${M}`>
  >
]
