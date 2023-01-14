[ts-types-lang](../README.md) / [Modules](../modules.md) / [effect](../modules/effect.md) / Effect

# Interface: Effect<T\>

[effect](../modules/effect.md).Effect

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

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

## Table of contents

### Properties

- [output](effect.Effect.md#output)

## Properties

### output

• **output**: `T`

#### Defined in

[effect.ts:2](https://github.com/phenax/ts-types-runtime-environment/blob/6c7b4f3/stdlib/effect.ts#L2)
