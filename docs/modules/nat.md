[ts-types-lang](../README.md) / [Modules](../modules.md) / nat

# Module: nat

## Table of contents

### Type Aliases

- [Add](nat.md#add)
- [FromNumber](nat.md#fromnumber)
- [Nat](nat.md#nat)
- [Pred](nat.md#pred)
- [Succ](nat.md#succ)
- [ToNumber](nat.md#tonumber)
- [Zero](nat.md#zero)
- [\_0](nat.md#_0)
- [\_1](nat.md#_1)
- [\_2](nat.md#_2)
- [\_3](nat.md#_3)
- [\_4](nat.md#_4)
- [\_5](nat.md#_5)
- [\_9](nat.md#_9)

## Type Aliases

### Add

Ƭ **Add**<`A`, `B`\>: `A` extends [`Zero`](nat.md#zero) ? `B` : [`Add`](nat.md#add)<[`Pred`](nat.md#pred)<`A`\>, [`Succ`](nat.md#succ)<`B`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Nat`](nat.md#nat) |
| `B` | extends [`Nat`](nat.md#nat) |

#### Defined in

[nat.ts:6](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L6)

___

### FromNumber

Ƭ **FromNumber**<`N`, `Res`, `Acc`\>: `N` extends `Acc`[``"length"``] ? `Res` : [`FromNumber`](nat.md#fromnumber)<`N`, [`Succ`](nat.md#succ)<`Res`\>, [...Acc, ``0``]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `number` |
| `Res` | extends [`Nat`](nat.md#nat) = [`Zero`](nat.md#zero) |
| `Acc` | extends ``0``[] = [] |

#### Defined in

[nat.ts:14](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L14)

___

### Nat

Ƭ **Nat**: [`Zero`](nat.md#zero) \| { `_prev`: [`Nat`](nat.md#nat)  }

#### Defined in

[nat.ts:1](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L1)

___

### Pred

Ƭ **Pred**<`N`\>: `N` extends [`Zero`](nat.md#zero) ? [`Zero`](nat.md#zero) : `N`[``"_prev"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`Nat`](nat.md#nat) |

#### Defined in

[nat.ts:4](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L4)

___

### Succ

Ƭ **Succ**<`N`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`Nat`](nat.md#nat) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_prev` | `N` |

#### Defined in

[nat.ts:3](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L3)

___

### ToNumber

Ƭ **ToNumber**<`N`, `Acc`\>: `N` extends [`Zero`](nat.md#zero) ? `Acc`[``"length"``] : [`ToNumber`](nat.md#tonumber)<[`Pred`](nat.md#pred)<`N`\>, [...Acc, ``0``]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`Nat`](nat.md#nat) |
| `Acc` | extends ``0``[] = [] |

#### Defined in

[nat.ts:10](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L10)

___

### Zero

Ƭ **Zero**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_prev` | ``null`` |

#### Defined in

[nat.ts:2](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L2)

___

### \_0

Ƭ **\_0**: [`Zero`](nat.md#zero)

#### Defined in

[nat.ts:20](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L20)

___

### \_1

Ƭ **\_1**: [`Succ`](nat.md#succ)<[`_0`](nat.md#_0)\>

#### Defined in

[nat.ts:21](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L21)

___

### \_2

Ƭ **\_2**: [`Succ`](nat.md#succ)<[`_1`](nat.md#_1)\>

#### Defined in

[nat.ts:22](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L22)

___

### \_3

Ƭ **\_3**: [`Succ`](nat.md#succ)<[`_2`](nat.md#_2)\>

#### Defined in

[nat.ts:23](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L23)

___

### \_4

Ƭ **\_4**: [`Succ`](nat.md#succ)<[`_3`](nat.md#_3)\>

#### Defined in

[nat.ts:24](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L24)

___

### \_5

Ƭ **\_5**: [`Succ`](nat.md#succ)<[`_4`](nat.md#_4)\>

#### Defined in

[nat.ts:25](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L25)

___

### \_9

Ƭ **\_9**: [`Add`](nat.md#add)<[`_4`](nat.md#_4), [`_5`](nat.md#_5)\>

#### Defined in

[nat.ts:26](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/nat.ts#L26)
