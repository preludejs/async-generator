import type { AsyncIterated } from './prelude.js'

/**
 * Creates an async generator that concatenates multiple async iterables.
 *
 * @description
 * This function combines multiple async iterables into a single async generator.
 * Values are processed in order - all values from the first iterable, then all values
 * from the second iterable, and so on. This is useful for sequentially processing
 * multiple data sources without having to manually chain them.
 *
 * Note that this is different from merging, as concat waits for each iterable to
 * completely finish before moving to the next one.
 *
 * @template Gs - Array type of async iterables
 * @param valuesArray - Multiple async iterables to concatenate
 * @returns An async generator that yields all values from each iterable in sequence
 *
 * @example
 * ```ts
 * // Concatenate multiple arrays
 * const result = await G.pipe(
 *   G.concat(
 *     G.ofIterable([1, 2, 3]),
 *     G.ofIterable([4, 5, 6]),
 *     G.ofIterable([7, 8, 9])
 *   ),
 *   G.array
 * ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * // Concatenate different data sources
 * const allData = await G.pipe(
 *   G.concat(
 *     G.ofIterable(localData),
 *     fetchFromDatabase(),
 *     fetchFromApi()
 *   ),
 *   G.map(item => processItem(item)),
 *   G.array
 * );
 * ```
 */
export async function* concat<Gs extends AsyncIterable<unknown>[]>(...valuesArray: Gs): AsyncGenerator<AsyncIterated<Gs[number]>> {
  for (const values of valuesArray) {
    for await (const value of values) {
      yield value as AsyncIterated<Gs[number]>
    }
  }
}
