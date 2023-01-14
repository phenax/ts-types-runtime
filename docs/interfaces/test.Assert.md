[ts-types-lang](../README.md) / [Modules](../modules.md) / [test](../modules/test.md) / Assert

# Interface: Assert<_B\>

[test](../modules/test.md).Assert

Assert a boolean expression is true

**`Throws`**

if false

**`Example`**

Here's an example checking if `SomeValue` is not equal to [1,2,3]
Uses - [Not](../modules/util.md#not), [Equals](../modules/util.md#equals)

```ts
Assert<Not<Equals<SomeValue, [1, 2, 3]>>>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_B` | extends `boolean` | The boolean value to assert |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Assert`**
