/**
 * Creates a transformer that limits the number of values yielded from an async iterable.
 *
 * @description
 * This function creates a transformer that takes only the first `n` values from an async iterable
 * and then stops, ignoring any remaining values. It's particularly useful for:
 * - Limiting the amount of data processed from potentially large or infinite data sources
 * - Implementing pagination
 * - Creating previews of data
 *
 * If the source has fewer items than the specified number, all items will be yielded.
 * If `n` is 0 or negative, no values will be yielded.
 *
 * @param n - The maximum number of values to take
 * @returns A transformer function that yields at most n values
 *
 * @example
 * ```ts
 * // Take the first 3 values
 * const firstThree = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6]),
 *   G.take(3),
 *   G.array
 * ); // [1, 2, 3]
 *
 * // Limit results from an infinite generator
 * const numbers = await G.pipe(
 *   G.ofInterval(100), // Infinite sequence of timestamps
 *   G.take(5),         // Take only first 5
 *   G.map(data => data.index),
 *   G.array
 * ); // [0, 1, 2, 3, 4]
 *
 * // Implement simple pagination
 * const getPage = (pageNumber, pageSize) => G.pipe(
 *   G.ofIterable(largeDataset),
 *   G.skip((pageNumber - 1) * pageSize),
 *   G.take(pageSize),
 *   G.array
 * );
 * ```
 *
 * @throws {Error} If n is not a safe integer
 */
export function take(n: number) {
  if (!Number.isSafeInteger(n)) {
    throw new Error(`Expected number of elements to take to be a safe integer, got ${n}.`)
  }
  return async function* <T>(values: AsyncIterable<T>) {
    if (n <= 0) {
      return
    }
    let index = 0
    for await (const value of values) {
      yield value
      if (++index >= n) {
        break
      }
    }
  }
}
