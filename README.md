# TS Types lang [WIP]
A runtime for typescript's **type system** that turns it into a **general purpose**, **purely functional** programming language!

Take a look at the [./examples](./examples) directory for examples on how to write a program in typescript types


### Example

```typescript
import { PutString, PutStringLn, Bind, Kind1, ReadLine, Do } from 'ts-types-lang/stdlib'

// :: string -> Effect ()
interface GreetK extends Kind1<string> {
  return: PutString<`Hello, ${this['input']}`>,
}

// main :: [Effect ()] | Effect ()
export type main = [
  PutString<"Your name? ">,
  Bind<ReadLine, GreetK>,
]
```

To run it -
```bash
npx tsr ./examples/guess-number.ts
// OR
yarn exec tsr ./examples/guess-number.ts
```


### Why?

I dunno

