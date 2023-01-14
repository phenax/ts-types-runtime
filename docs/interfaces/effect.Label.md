[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Label

# Interface: Label<_Name\>

[effect](../modules/effect.md).Label

Access a label defined with [BindTo](effect.BindTo.md)

**`Example`**

```ts
type main = Do<[
  BindTo<"contents", ReadFile<"./file.txt">>,
  Bind<Label<"contents">, <c extends string>() => Print<c>>
]>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Name` | extends `string` | The name of label |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Label`**
