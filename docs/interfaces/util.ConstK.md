[ts-types-lang](../README.md) / [Modules](../modules.md) / [util](../modules/util.md) / ConstK

# Interface: ConstK<Val\>

[util](../modules/util.md).ConstK

An implementation of `* -> *` higher-kinded type

**`Example`**

You can define a return property for the function body
  and use `this['input']` to access the argument
  Uses - [ApplyK](../modules/util.md#applyk)

```ts
interface SomeFunc extends Kind1<number, string> {
  return: `Your number is ${this['input']}`,
}

type result = ApplyK<SomeFunc, 200>
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `Val` | The input type |

## Hierarchy

- [`Kind1`](effect.Kind1.md)<`unknown`, `Val`\>

  ↳ **`ConstK`**

## Table of contents

### Properties

- [input](util.ConstK.md#input)
- [return](util.ConstK.md#return)

## Properties

### input

• **input**: `unknown`

#### Inherited from

[Kind1](effect.Kind1.md).[input](effect.Kind1.md#input)

#### Defined in

[effect.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/effect.ts#L35)

___

### return

• **return**: `Val`

#### Overrides

[Kind1](effect.Kind1.md).[return](effect.Kind1.md#return)

#### Defined in

[util.ts:13](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/util.ts#L13)
