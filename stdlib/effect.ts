/**
 * Generic interface for declaring effects
 * @typeParam T - The output generated by the effect (defaults to `unknown`)
 *
 * @example
 * ```ts
 * interface MyEffect extends Effect<string[]> {}
 * ```
 */
export interface Effect<T = unknown> {
  /** @hidden */
  output: T
}

/**
 * An implementation of `* -> *` higher-kinded type
 *
 * @typeParam Inp - The input type
 * @typeParam Out - The output type
 *
 * @example
 * You can define a return property for the function body
 *   and use `this['input']` to access the argument
 *   Uses - {@link util.ApplyK}
 *
 * ```ts
 * interface SomeFunc extends Kind1<number, string> {
 *   return: `Your number is ${this['input']}`,
 * }
 *
 * type result = ApplyK<SomeFunc, 200>
 * ```
 */
export interface Kind1<Inp = unknown, Out = unknown> {
  input: Inp
  return: Out
}

/**
 * Generic function definition as a union of a kind and anonymous function
 *
 * @typeParam Inp - The input type
 * @typeParam Out - The output type
 *
 * @example
 * In addition to defining a kind (see - {@link Kind1}),
 *  you can also in some places, use inline lambda functions
 *
 * ```ts
 * type main = Bind<
 *   ReadFile<"./file.txt">,
 *   <contents extends string>() => Print<contents>
 * >
 * ```
 */
export type Func<Inp = unknown, Out = unknown> =
  | Kind1<Inp, Out>
  | (<_T extends Inp>() => Out)

/**
 * Monadic bind an effect to a function (Equivalent to haskell's >>= operator)
 *
 * @typeParam _Eff - Effect to evaluate first
 * @typeParam _Fn - Function to call with the result of _Eff
 *
 * @example
 * ```ts
 * type main = Bind<
 *   ReadFile<"./file.txt">,
 *   <contents extends string>() => Print<contents>
 * >
 * ```
 */
export interface Bind<_Eff extends Effect, _Fn extends Func> extends Effect {}

/**
 * Bind result of evaluating an effect to a label (Equivalent to haskell's <- syntax)
 *
 * Note: labels are scoped to outermost Do, Bind, Try, etc scopes
 *
 * @typeParam _Name - The name of label
 * @typeParam _Eff - Effect to evaluate
 *
 * @example
 * ```ts
 * type main = Do<[
 *   // contents <- readFile "./file.txt"
 *   BindTo<"contents", ReadFile<"./file.txt">>,
 *   Bind<Label<"contents">, <c extends string>() => Print<c>>
 * ]>
 * ```
 */
export interface BindTo<_Name extends string, _Eff extends Effect>
  extends Effect {}

/**
 * Access a label defined with {@link BindTo}
 *
 * @typeParam _Name - The name of label
 *
 * @example
 * ```ts
 * type main = Do<[
 *   BindTo<"contents", ReadFile<"./file.txt">>,
 *   Bind<Label<"contents">, <c extends string>() => Print<c>>
 * ]>
 * ```
 */
export interface Label<_Name extends string> extends Effect {}

/**
 * Evaluate a sequence of effects in series and get the list of results
 *
 * @typeParam _Effs - List of effects
 *
 * @example
 * ```ts
 * type main = Bind<
 *   Seq<[ Pure<1>, ReadFile<"./foobar.txt">  ]>,
 *   <t extends [number, string]>() => Print<t>
 * >
 * ```
 */
export interface Seq<_Effs extends Effect[]> extends Effect {}

/**
 * Evaluate a sequence of effects in series and get the result of the last effect (Equivalent to haskell's do syntax)
 *
 * @typeParam _Effs - List of effects
 *
 * @example
 * ```ts
 * type main = Bind<
 *   Do<[ Pure<1>, ReadFile<"./foobar.txt">  ]>,
 *   <t extends string>() => Print<t>
 * >
 * ```
 */
export interface Do<_Effs extends Effect[]> extends Effect {}

/**
 * Wrap a value inside an effect (Equivalent to haskell's pure function)
 *
 * @typeParam V - Value
 *
 * @example
 * ```ts
 * type main = Bind<Pure<1>, <t extends number>() => Print<t>>
 * ```
 */
export interface Pure<V> extends Effect<V> {}

/**
 * Noop effect that does nothing (returns undefined)
 *
 * @example
 * ```ts
 * type main = Bind<Noop, <t extends undefined>() => Print<t>>
 * ```
 */
export interface Noop extends Effect {}
