/**
 * Extracts the element type from an async iterable or iterator.
 *
 * @template G - An async iterable or iterator type
 */
export type AsyncIterated<G> =
  G extends AsyncIterable<infer T> ?
    T :
    G extends AsyncIterator<infer T> ?
      T :
      never

/**
 * A synchronous predicate function that tests values in an async iterable.
 *
 * @template T - The type of values being tested
 */
export type Predicate<T> =
  (value: T, index: number) =>
    boolean

/**
 * An asynchronous predicate function that tests values in an async iterable.
 *
 * @template T - The type of values being tested
 */
export type AsyncPredicate<T> =
  (value: T, index: number) =>
    Promise<boolean>

/**
 * A type predicate function that narrows the type of values in an async iterable.
 *
 * @template T - The original type of values
 * @template U - The narrowed subtype
 */
export type TypePredicate<T, U extends T> =
  (value: T, index: number) =>
    value is U

/**
 * A union of all predicate types (sync, async, or type predicate).
 *
 * @template T - The type of values being tested
 */
export type AnyPredicate<T, U extends T = T> =
  | Predicate<T>
  | AsyncPredicate<T>
  | TypePredicate<T, U>

/**
 * A function that creates an async generator without input values.
 *
 * @template T - The type of values produced
 */
export type Producer<T> =
  () =>
    AsyncGenerator<T>

/**
 * A function that transforms one async iterable into another.
 *
 * @template T - The input value type
 * @template R - The output value type (defaults to T if not specified)
 */
export type Transformer<T, R = T> =
  (values: AsyncIterable<T>) =>
    AsyncGenerator<R>

/**
 * A function that consumes an async iterable and produces a single result.
 *
 * @template T - The type of values consumed
 * @template R - The result type
 */
export type Consumer<T, R> =
  (values: AsyncIterable<T>) =>
    Promise<R>

export type Defined<T> =
  T extends undefined ?
    never :
    T
