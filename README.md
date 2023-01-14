# TS Types lang
A runtime for typescript's **type system** that turns it into a **general purpose**, **purely functional** programming language with effects!

## Documentation
- [stdlib reference](./docs/modules.md)
- [examples](./examples/)


## Implemented effects
  * read/write file
  * simple stdio interactions
  * error handling
  * test runner
  * mutable references
  * evaluate js expression
  * get cli args, env vars
  * define custom effects


## Example

Take a look at the [./examples](./examples/) directory for more examples on how to write a program in typescript types

```typescript
import { Bind, Do, Kind1 } from 'ts-types-lang/stdlib/effect'
import { WriteFile } from 'ts-types-lang/stdlib/fs'
import { PutString, ReadLine, PutStringLn } from 'ts-types-lang/stdlib/stdio'

export type main = [
  PutStringLn<'Greetotron 6000 initializing...'>,
  PutStringLn<''>,

  PutString<'Your name? '>,
  Bind<ReadLine, <name extends string>() =>
    PutStringLn<`Hello, ${name}`>>,

  PutString<'Your purpose in life? '>,
  Bind<ReadLine, HandleResponseK>,

  PutStringLn<'Bye bye'>,
]

// :: string -> Effect ()
interface HandleResponseK extends Kind1<string, Effect> {
  return: Do<[
    PutStringLn<`Interesting that you believe "${this['input']}" is your purpose. Hmmmm...`>,
    PutStringLn<'Judging harshly...'>,
    PutStringLn<'Saving response...'>,
    WriteFile<'./response.txt', this['input']>,
  ]>
}
```

## Run a types-lang module

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


## FAQ

#### Why?
I dunno

#### How?
I dunno

#### What?
I dunno

