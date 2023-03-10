[ts-types-lang](../README.md) / [Modules](../modules.md) / [sys](../modules/sys.md) / SetEvalEnvironment

# Interface: SetEvalEnvironment<_Env\>

[sys](../modules/sys.md).SetEvalEnvironment

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_Env` | extends ``"test.node"`` \| ``"node"`` | The output generated by the effect (defaults to `unknown`) |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`SetEvalEnvironment`**
