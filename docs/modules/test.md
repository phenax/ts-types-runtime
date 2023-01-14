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

#### Type parameters

| Name |
| :------ |
| `Left` |
| `Right` |

#### Defined in

[test.ts:28](https://github.com/phenax/ts-types-runtime-environment/blob/78e384c/stdlib/test.ts#L28)
