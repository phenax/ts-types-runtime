export const match = <K extends string, R>(
  k: K | undefined,
  pattern: { [key in K | '_']: () => R }
) => (k && pattern[k] ? pattern[k]() : pattern._())
