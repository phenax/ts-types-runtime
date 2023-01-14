[ts-types-lang](../README.md) / [Modules](../modules.md) / [util](../modules/util.md) / IdK

# Interface: IdK

[util](../modules/util.md).IdK

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

## Hierarchy

- [`Kind1`](effect.Kind1.md)

  ↳ **`IdK`**

## Table of contents

### Properties

- [input](util.IdK.md#input)
- [return](util.IdK.md#return)

## Properties

### input

• **input**: `unknown`

#### Inherited from

[Kind1](effect.Kind1.md).[input](effect.Kind1.md#input)

#### Defined in

[effect.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/effect.ts#L35)

___

### return

• **return**: `unknown`

#### Overrides

[Kind1](effect.Kind1.md).[return](effect.Kind1.md#return)

#### Defined in

[util.ts:9](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/util.ts#L9)
