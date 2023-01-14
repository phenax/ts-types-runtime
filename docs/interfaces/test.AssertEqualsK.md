[ts-types-lang](../README.md) / [Modules](../modules.md) / [test](../modules/test.md) / AssertEqualsK

# Interface: AssertEqualsK<Right\>

[test](../modules/test.md).AssertEqualsK

An alternate point-free api for [AssertEquals](../modules/test.md#assertequals)

**`Type Param`**

Right value

**`Example`**

```ts
type main = [
  Bind<JsExpr<'21 * 3'>, AssertEqualsK<63>>
]
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `Right` | extends `unknown` |

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

[effect.ts:35](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/effect.ts#L35)

___

### return

• **return**: [`AssertEquals`](../modules/test.md#assertequals)<`unknown`, `Right`\>

#### Overrides

[Kind1](effect.Kind1.md).[return](effect.Kind1.md#return)

#### Defined in

[test.ts:77](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/test.ts#L77)
