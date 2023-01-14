[ts-types-lang](../README.md) / [Modules](../modules.md) / stdio

# Module: stdio

## Table of contents

### Interfaces

- [Debug](../interfaces/stdio.Debug.md)
- [Print](../interfaces/stdio.Print.md)
- [PutString](../interfaces/stdio.PutString.md)
- [ReadLine](../interfaces/stdio.ReadLine.md)

### Type Aliases

- [PutStringLn](stdio.md#putstringln)

## Type Aliases

### PutStringLn

Ƭ **PutStringLn**<`S`\>: `S` extends infer S ? [`PutString`](../interfaces/stdio.PutString.md)<\`${S}
\`\> : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Defined in

[stdio.ts:11](https://github.com/phenax/ts-types-runtime-environment/blob/e75a5a1/stdlib/stdio.ts#L11)
