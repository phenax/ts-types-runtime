[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Do

# Interface: Do<_Effs\>

[effect](../modules/effect.md).Do

Evaluate a sequence of effects in series and get the result of the last effect (Equivalent to haskell's do syntax)

**`Example`**

```ts
type main = Bind<
  Do<[ Pure<1>, ReadFile<"./foobar.txt">  ]>,
  <t extends string>() => Print<t>
>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Effs` | extends [`Effect`](effect.Effect.md)[] | List of effects |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Do`**
