/**
 * Creates a transformer that prepends values from an iterable before the original async iterable.
 *
 * @description
 * This function first yields all values from the prepend iterable, and then
 * yields all values from the original iterable. It's the counterpart to `append`.
 *
 * @param prependValues - Values to yield before the original iterable's values
 * @returns A transformer that yields the prepended values followed by the original values
 *
 * @example
 * ```ts
 * const result = await G.pipe(
 *   G.ofIterable([3, 4, 5]),
 *   G.prepend([1, 2]),
 *   G.array
 * ); // [1, 2, 3, 4, 5]
 * ```
 */
export function prepend<T, U>(prependValues: Iterable<U> | AsyncIterable<U>) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T | U> {
    for await (const value of prependValues) {
      yield value
    }
    for await (const value of values) {
      yield value
    }
  }
}
