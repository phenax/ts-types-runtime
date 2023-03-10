[ts-types-lang](../README.md) / [Modules](../modules.md) / [ref](../modules/ref.md) / GetRef

# Interface: GetRef<_Key\>

[ref](../modules/ref.md).GetRef

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Key` | extends [`Ref`](../modules/ref.md#ref) | The output generated by the effect (defaults to `unknown`) |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`GetRef`**
