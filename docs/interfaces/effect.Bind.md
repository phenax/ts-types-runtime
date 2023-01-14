[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Bind

# Interface: Bind<_Eff, _Fn\>

[effect](../modules/effect.md).Bind

Monadic bind an effect to a function (Equivalent to haskell's >>= operator)

**`Example`**

```ts
type main = Bind<
  ReadFile<"./file.txt">,
  <contents extends string>() => Print<contents>
>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Eff` | extends [`Effect`](effect.Effect.md) | Effect to evaluate first |
| `_Fn` | extends [`Func`](../modules/effect.md#func) | Function to call with the result of _Eff |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Bind`**
