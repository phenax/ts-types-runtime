[ts-types-lang](../README.md) / [Modules](../modules.md) / effect

# Module: effect

## Table of contents

### Interfaces

- [Bind](../interfaces/effect.Bind.md)
- [BindTo](../interfaces/effect.BindTo.md)
- [Do](../interfaces/effect.Do.md)
- [Effect](../interfaces/effect.Effect.md)
- [Kind1](../interfaces/effect.Kind1.md)
- [Label](../interfaces/effect.Label.md)
- [Noop](../interfaces/effect.Noop.md)
- [Pure](../interfaces/effect.Pure.md)
- [Seq](../interfaces/effect.Seq.md)

### Type Aliases

- [Func](effect.md#func)

## Type Aliases

### Func

Ƭ **Func**<`Inp`, `Out`\>: [`Kind1`](../interfaces/effect.Kind1.md)<`Inp`, `Out`\> \| <_T\>() => `Out`

Generic function definition as a union of a kind and anonymous function

**`Example`**

In addition to defining a kind (see - [Kind1](../interfaces/effect.Kind1.md)),
 you can also in some places, use inline lambda functions

```ts
type main = Bind<
  ReadFile<"./file.txt">,
  <contents extends string>() => Print<contents>
>
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Inp` | `unknown` | The input type |
| `Out` | `unknown` | The output type |

#### Defined in

[effect.ts:56](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/effect.ts#L56)
