[ts-types-lang](../README.md) / [Modules](../modules.md) / [fs](../modules/fs.md) / WriteFile

# Interface: WriteFile<_Path, _Content\>

[fs](../modules/fs.md).WriteFile

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Path` | extends `string` | The output generated by the effect (defaults to `unknown`) |
| `_Content` | extends `string` | - |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`WriteFile`**
