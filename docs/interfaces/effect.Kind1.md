[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Kind1

# Interface: Kind1<Inp, Out\>

[effect](../modules/effect.md).Kind1

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `Inp` | `unknown` | The input type |
| `Out` | `unknown` | The output type |

## Hierarchy

- **`Kind1`**

  ↳ [`AssertEqualsK`](test.AssertEqualsK.md)

  ↳ [`IdK`](util.IdK.md)

  ↳ [`ConstK`](util.ConstK.md)

## Table of contents

### Properties

- [input](effect.Kind1.md#input)
- [return](effect.Kind1.md#return)

## Properties

### input

• **input**: `Inp`

#### Defined in

[effect.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/effect.ts#L35)

___

### return

• **return**: `Out`

#### Defined in

[effect.ts:36](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/effect.ts#L36)
