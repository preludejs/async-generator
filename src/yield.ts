/**
 * Creates a producer that yields a single value once.
 *
 * @description
 * This function creates an async generator that yields the given value
 * exactly once and then completes. It supports both synchronous values
 * and promises, waiting for the promise to resolve before yielding.
 *
 * @param value - The value or promise to yield
 * @returns An async generator that yields the provided value once
 *
 * @example
 * ```ts
 * // Yield a single value
 * const result = await G.pipe(
 *   G.yield(42),
 *   G.array
 * ); // [42]
 *
 * // Yield a promised value
 * const result = await G.pipe(
 *   G.yield(Promise.resolve("hello")),
 *   G.array
 * ); // ["hello"]
 * ```
 */
async function* yield_<T>(value: T | Promise<T>): AsyncGenerator<T> {
  yield await Promise.resolve(value)
}

export { yield_ as yield }
