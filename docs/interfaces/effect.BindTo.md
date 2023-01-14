[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / BindTo

# Interface: BindTo<_Name, _Eff\>

[effect](../modules/effect.md).BindTo

Bind result of evaluating an effect to a label (Equivalent to haskell's <- syntax)

Note: labels are scoped to outermost Do, Bind, Try, etc scopes

**`Example`**

```ts
type main = Do<[
  // contents <- readFile "./file.txt"
  BindTo<"contents", ReadFile<"./file.txt">>,
  Bind<Label<"contents">, <c extends string>() => Print<c>>
]>
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Name` | extends `string` | The name of label |
| `_Eff` | extends [`Effect`](effect.Effect.md) | Effect to evaluate |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`BindTo`**
