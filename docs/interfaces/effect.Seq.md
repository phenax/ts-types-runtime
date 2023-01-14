[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Seq

# Interface: Seq<_Effs\>

[effect](../modules/effect.md).Seq

Evaluate a sequence of effects in series and get the list of results

**`Example`**

```ts
type main = Bind<
  Seq<[ Pure<1>, ReadFile<"./foobar.txt">  ]>,
  <t extends [number, string]>() => Print<t>
>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Effs` | extends [`Effect`](effect.Effect.md)[] | List of effects |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Seq`**
