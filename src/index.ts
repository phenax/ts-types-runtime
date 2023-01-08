import { createContext } from './context'
import { evalList } from './eval'

const main = async () => {
  const ctx = createContext()
  const resultType = ctx.entryPoint.getType()
  const effects = resultType.isTuple()
    ? resultType.getTupleElements()
    : [resultType]
  await evalList(ctx, effects)
}

main()
  .then(() => process.exit(0))
  .catch((e) => (console.error(e), process.exit(1)))
