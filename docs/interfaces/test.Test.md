[ts-types-lang](../README.md) / [Modules](../modules.md) / [test](../modules/test.md) / Test

# Interface: Test<_M, _Effs\>

[test](../modules/test.md).Test

Create a test block

**`Example`**

```ts
type main = [
  Test<"should check if result is 21", [
    Bind<EvalSomeEffect<2, 3>, <a extends number>() => AssertEquals<a, 21>>,
    // equivalent to...
    Bind<EvalSomeEffect<2, 3>, AssertEqualsK<21>>,
  ]>
]
```

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_M` | extends `string` | description of the test |
| `_Effs` | extends [`Effect`](effect.Effect.md)[] | List of effects to evaluate |

## Hierarchy

- [`Effect`](effect.Effect.md)

  ↳ **`Test`**
