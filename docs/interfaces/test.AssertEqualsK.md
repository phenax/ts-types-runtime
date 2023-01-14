[ts-types-lang](../README.md) / [Modules](../modules.md) / [test](../modules/test.md) / AssertEqualsK

# Interface: AssertEqualsK<Right\>

[test](../modules/test.md).AssertEqualsK

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
| `Right` | extends `unknown` | The input type |

## Hierarchy

- [`Kind1`](effect.Kind1.md)

  ↳ **`AssertEqualsK`**

## Table of contents

### Properties

- [input](test.AssertEqualsK.md#input)
- [return](test.AssertEqualsK.md#return)

## Properties

### input

• **input**: `unknown`

#### Inherited from

[Kind1](effect.Kind1.md).[input](effect.Kind1.md#input)

#### Defined in

[effect.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/effect.ts#L35)

___

### return

• **return**: [`AssertEquals`](../modules/test.md#assertequals)<`unknown`, `Right`\>

#### Overrides

[Kind1](effect.Kind1.md).[return](effect.Kind1.md#return)

#### Defined in

[test.ts:34](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/test.ts#L34)
