[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Effect

# Interface: Effect<T\>

[effect](../modules/effect.md).Effect

Generic interface for declaring effects

**`Example`**

```ts
interface MyEffect extends Effect<string[]> {}
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `unknown` | The output generated by the effect (defaults to `unknown`) |

## Hierarchy

- **`Effect`**

  ↳ [`Bind`](effect.Bind.md)

  ↳ [`BindTo`](effect.BindTo.md)

  ↳ [`Label`](effect.Label.md)

  ↳ [`Seq`](effect.Seq.md)

  ↳ [`Do`](effect.Do.md)

  ↳ [`Pure`](effect.Pure.md)

  ↳ [`Noop`](effect.Noop.md)

  ↳ [`Try`](exception.Try.md)

  ↳ [`Throw`](exception.Throw.md)

  ↳ [`WriteFile`](fs.WriteFile.md)

  ↳ [`ReadFile`](fs.ReadFile.md)

  ↳ [`CreateRef`](ref.CreateRef.md)

  ↳ [`GetRef`](ref.GetRef.md)

  ↳ [`SetRef`](ref.SetRef.md)

  ↳ [`DeleteRef`](ref.DeleteRef.md)

  ↳ [`PutString`](stdio.PutString.md)

  ↳ [`Print`](stdio.Print.md)

  ↳ [`Debug`](stdio.Debug.md)

  ↳ [`ReadLine`](stdio.ReadLine.md)

  ↳ [`GetEnv`](sys.GetEnv.md)

  ↳ [`GetArgs`](sys.GetArgs.md)

  ↳ [`JsExpr`](sys.JsExpr.md)

  ↳ [`DefineEffect`](sys.DefineEffect.md)

  ↳ [`Exit`](sys.Exit.md)

  ↳ [`SetEvalEnvironment`](sys.SetEvalEnvironment.md)

  ↳ [`Assert`](test.Assert.md)

  ↳ [`Test`](test.Test.md)

  ↳ [`ShowAssertionError`](test.ShowAssertionError.md)
