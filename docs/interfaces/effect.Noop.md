[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Noop

# Interface: Noop

[effect](../modules/effect.md).Noop

Noop effect that does nothing (returns undefined)

**`Example`**

```ts
type main = Bind<Noop, <t extends undefined>() => Print<t>>
```

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Noop`**
