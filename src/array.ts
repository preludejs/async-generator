/**
 * Consumes an async iterable and collects all values into an array.
 *
 * @description
 * This function iterates through all values in the async iterable and collects them
 * into a standard JavaScript array. It's commonly used as the final step in a pipeline
 * to materialize the results for further processing or as a return value.
 *
 * Note that this function needs to process the entire async iterable before returning,
 * so it should be used with care for potentially infinite iterables or very large data sets.
 * When working with infinite generators, always use combinators like `take` to limit
 * the number of values processed.
 *
 * @template T - The type of values in the async iterable
 * @param values - The async iterable to collect values from
 * @returns A promise that resolves to an array containing all the values
 *
 * @example
 * ```ts
 * // Basic usage - collect all values into an array
 * const numbers = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.map(x => x * 2),
 *   G.array
 * ); // [2, 4, 6, 8, 10]
 *
 * // Filter and collect
 * const evenNumbers = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6]),
 *   G.filter(x => x % 2 === 0),
 *   G.array
 * ); // [2, 4, 6]
 *
 * // Working with infinite generators - use take() to prevent infinite loops
 * const firstTenIntervals = await G.pipe(
 *   G.ofInterval(1000), // Infinite sequence of timestamps every 1000ms
 *   G.take(10),         // Only process the first 10 values
 *   G.map(data => data.index),
 *   G.array
 * ); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export async function array<T>(values: AsyncIterable<T>) {
  const result: T[] = []
  for await (const value of values) {
    result.push(value)
  }
  return result
}

export default array
