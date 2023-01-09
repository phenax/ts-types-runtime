import { program } from 'commander'
import { createContext } from './context'
import { cleanup, evalList } from './eval'

const main = () => {
  program
    .name('ts-types-lang')
    .description(`A runtime for typescript's type system that turns it into a general purpose, purely functional programming language!`)

  program
    .command('run')
    .description('Run a typescript .ts file')
    .argument('<file>', 'Typescript file to run')
    .action(async (filePath) => {
      const ctx = createContext({ filePath })
      const resultType = ctx.entryPoint.getType()
      const effects = resultType.isTuple()
        ? resultType.getTupleElements()
        : [resultType]
      await evalList(ctx, effects)
    })

  return program.parseAsync()
}

main()
  .finally(() => cleanup())
