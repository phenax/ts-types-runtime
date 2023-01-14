[ts-types-lang](../README.md) / [Modules](../modules.md) / test

# Module: test

## Table of contents

### Interfaces

- [Assert](../interfaces/test.Assert.md)
- [AssertEqualsK](../interfaces/test.AssertEqualsK.md)
- [ShowAssertionError](../interfaces/test.ShowAssertionError.md)
- [Test](../interfaces/test.Test.md)

### Type Aliases

- [AssertEquals](test.md#assertequals)

## Type Aliases

### AssertEquals

Ƭ **AssertEquals**<`Left`, `Right`\>: [`Try`](../interfaces/exception.Try.md)<[`Assert`](../interfaces/test.Assert.md)<[`Equals`](util.md#equals)<`Left`, `Right`\>\>, <m\>() => [`Do`](../interfaces/effect.Do.md)<[[`ShowAssertionError`](../interfaces/test.ShowAssertionError.md)<`Left`, `Right`\>, [`Throw`](../interfaces/exception.Throw.md)<`m`\>]\>\>

Assert if left and right values are equal structurally

**`Type Param`**

Left value

**`Type Param`**

Right value

**`Example`**

```ts
type main = [
  AssertEquals<`Foo ${'bar'}`, 'Foo bar'>
  AssertEquals<[2, ...[3, 4]], [2, 3, 4]>
]
```

#### Type parameters

| Name |
| :------ |
| `Left` |
| `Right` |

#### Defined in

[test.ts:59](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/test.ts#L59)
