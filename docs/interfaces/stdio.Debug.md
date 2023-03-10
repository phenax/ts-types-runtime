[ts-types-lang](../README.md) / [Modules](../modules.md) / [stdio](../modules/stdio.md) / Debug

# Interface: Debug<_, T\>

[stdio](../modules/stdio.md).Debug

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_` | extends `string` | The output generated by the effect (defaults to `unknown`) |
| `T` | `T` | - |

## Hierarchy

- [`Effect`](effect.Effect.md)<`T`\>

  ↳ **`Debug`**
