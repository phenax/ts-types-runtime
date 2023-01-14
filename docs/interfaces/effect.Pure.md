[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Pure

# Interface: Pure<V\>

[effect](../modules/effect.md).Pure

Wrap a value inside an effect (Equivalent to haskell's pure function)

**`Example`**

```ts
type main = Bind<Pure<1>, <t extends number>() => Print<t>>
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `V` | Value |

## Hierarchy

- [`Effect`](effect.Effect.md)<`V`\>

  ↳ **`Pure`**
