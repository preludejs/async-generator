/**
 * Creates a transformer that skips the first n values from an async iterable.
 *
 * @description
 * This function creates a transformer that ignores the first `n` values from an async iterable
 * and yields all values that come after. It's essentially the opposite of `take` and is useful for:
 * - Implementing pagination
 * - Skipping header rows in data files
 * - Creating data subsets without the initial values
 *
 * If the source has fewer than `n` items, no values will be yielded.
 * If `n` is 0 or negative, all values will be yielded.
 *
 * @template T - The type of values in the async iterable
 * @param n - The number of values to skip
 * @returns A transformer function that skips the first n values and yields the rest
 *
 * @example
 * ```ts
 * // Skip the first 3 values
 * const afterThree = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6]),
 *   G.skip(3),
 *   G.array
 * ); // [4, 5, 6]
 *
 * // Skip header row in CSV data
 * const dataWithoutHeader = await G.pipe(
 *   G.ofIterable(csvLines),
 *   G.skip(1), // Skip header row
 *   G.map(parseCsvLine),
 *   G.array
 * );
 *
 * // Implement pagination with skip and take
 * const getPage = (pageNumber, pageSize) => G.pipe(
 *   G.ofIterable(largeDataset),
 *   G.skip((pageNumber - 1) * pageSize),
 *   G.take(pageSize),
 *   G.array
 * );
 * ```
 */
export function skip<T>(n: number) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
    let index = 0
    for await (const value of values) {
      if (++index > n) {
        yield value
      }
    }
  }
}
