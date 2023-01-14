ts-types-lang / [Modules](modules.md)

# TS Types lang
A runtime for typescript's **type system** that turns it into a **general purpose**, **purely functional** programming language with effects!

### Documentation
- [stdlib reference](./docs/modules.md)
- [examples](./examples/)

### Example

Take a look at the [./examples](./examples) directory for more examples on how to write a program in typescript types

```typescript
import { Bind } from 'ts-types-lang/stdlib/effect'
import { PutString, PutStringLn, ReadLine } from 'ts-types-lang/stdlib/stdio'

export type main = [
  PutString<"Your name? ">,
  // Read a line from stdin and then greet
  Bind<ReadLine, <name extends string>() =>
    PutStringLn<`Hello, ${name}`>>,
]
```

### Run a types-lang module

Install it -
```bash
npm i --save ts-types-lang
# OR
yarn add ts-types-lang
```

Or just run it -
```bash
npx tsr run ./examples/guess-number.ts
# OR
yarn exec tsr run ./examples/guess-number.ts
```

### FAQ

#### Why?
I dunno

#### How?
I dunno

#### What?
I dunno
