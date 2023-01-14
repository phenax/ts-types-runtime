[ts-types-lang](../README.md) / [Modules](../modules.md) / [stdio](../modules/stdio.md) / PutString

# Interface: PutString<_\>

[stdio](../modules/stdio.md).PutString

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_` | extends `string` | The output generated by the effect (defaults to `unknown`) |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`PutString`**