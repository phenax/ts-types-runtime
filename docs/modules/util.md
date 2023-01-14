[ts-types-lang](../README.md) / [Modules](../modules.md) / util

# Module: util

## Table of contents

### Interfaces

- [ConstK](../interfaces/util.ConstK.md)
- [IdK](../interfaces/util.IdK.md)

### Type Aliases

- [ADT](util.md#adt)
- [ApplyK](util.md#applyk)
- [Equals](util.md#equals)
- [Id](util.md#id)
- [Let](util.md#let)
- [Not](util.md#not)

## Type Aliases

### ADT

Ƭ **ADT**<`D`\>: { [k in keyof D]: Object } extends infer Rec ? { `t`: `Rec`[keyof `Rec`]  } & { [k in keyof Rec]: ADTConstructor<Rec[k]\> } : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `Record`<`string`, `any`\> |

#### Defined in

[util.ts:23](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L23)

___

### ApplyK

Ƭ **ApplyK**<`K`, `Val`\>: `K` & { `input`: `Val`  }[``"return"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`Kind1`](../interfaces/effect.Kind1.md) |
| `Val` | `Val` |

#### Defined in

[util.ts:5](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L5)

___

### Equals

Ƭ **Equals**<`Left`, `Right`\>: [`Left`] extends [`Right`] ? [`Right`] extends [`Left`] ? ``true`` : ``false`` : ``false``

#### Type parameters

| Name |
| :------ |
| `Left` |
| `Right` |

#### Defined in

[util.ts:29](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L29)

___

### Id

Ƭ **Id**: <T\>() => `T`

#### Type declaration

▸ <`T`\>(): `T`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Returns

`T`

#### Defined in

[util.ts:7](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L7)

___

### Let

Ƭ **Let**<`f`\>: `ReturnType`<`f`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `f` | extends (...`args`: `any`) => `any` |

#### Defined in

[util.ts:3](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L3)

___

### Not

Ƭ **Not**<`B`\>: `B` extends ``true`` ? ``false`` : ``true``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `boolean` |

#### Defined in

[util.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L35)
