import { Effect } from './effect'

// TODO: Make Ref opaque
// declare const $ref: unique symbol

export type Ref = string // & { [$ref]: true }

export interface CreateRef<_Val> extends Effect<Ref> {}

export interface GetRef<_Key extends Ref> extends Effect {}

export interface SetRef<_Key extends Ref, _Val> extends Effect {}

export interface DeleteRef<_Key extends Ref> extends Effect {}
