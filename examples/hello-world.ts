import { Bind, Do, Kind1 } from '../stdlib/effect'
import { CreateRef, GetRef, Ref, SetRef } from '../stdlib/ref'
import { Print } from '../stdlib/stdio'

interface PrintK extends Kind1 {
  return: Print<this['input']>
}

interface Func extends Kind1<Ref> {
  return: Do<[SetRef<this['input'], 69>, Bind<GetRef<this['input']>, PrintK>]>
}

export type main = [Bind<CreateRef<200>, Func>, Print<1>]
