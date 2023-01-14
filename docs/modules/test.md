[ts-types-lang](../README.md) / [Modules](../modules.md) / test

# Module: test

## Table of contents

### Interfaces

- [Assert](../interfaces/test.Assert.md)
- [AssertEqualsK](../interfaces/test.AssertEqualsK.md)
- [Config](../interfaces/test.Config.md)
- [ShowAssertionError](../interfaces/test.ShowAssertionError.md)
- [Test](../interfaces/test.Test.md)

### Type Aliases

- [AssertEquals](test.md#assertequals)

## Type Aliases

### AssertEquals

Ƭ **AssertEquals**<`Left`, `Right`\>: [`Try`](../interfaces/exception.Try.md)<[`Assert`](../interfaces/test.Assert.md)<[`Equals`](util.md#equals)<`Left`, `Right`\>\>, <m\>() => [`Do`](../interfaces/effect.Do.md)<[[`ShowAssertionError`](../interfaces/test.ShowAssertionError.md)<`Left`, `Right`\>, [`Throw`](../interfaces/exception.Throw.md)<`m`\>]\>\>

#### Type parameters

| Name |
| :------ |
| `Left` |
| `Right` |

#### Defined in

[test.ts:18](https://github.com/phenax/ts-types-runtime-environment/blob/6c7b4f3/stdlib/test.ts#L18)
