import type { Transformer } from './prelude.js'

/**
 * Creates a transformer that appends values from an iterable after the original async iterable.
 *
 * @description
 * This function yields all values from the original async iterable first, followed by
 * all values from the provided appendValues iterable. It supports both synchronous
 * and asynchronous iterables for the appended values.
 *
 * @param appendValues - The values to append after the original async iterable
 * @returns A transformer function that yields all original values followed by the append values
 *
 * @example
 * ```ts
 * // Append numbers to a sequence
 * const result = await G.pipe(
 *   G.ofIterable([1, 2, 3]),
 *   G.append([4, 5, 6]),
 *   G.array
 * ); // [1, 2, 3, 4, 5, 6]
 *
 * // Append values from another async iterable
 * const result = await G.pipe(
 *   G.ofIterable(['a', 'b', 'c']),
 *   G.append(G.ofIterable(['d', 'e', 'f'])),
 *   G.array
 * ); // ['a', 'b', 'c', 'd', 'e', 'f']
 * ```
 */
export function append<T, U>(appendValues: Iterable<U> | AsyncIterable<U>): Transformer<T, T | U> {
  return async function* (values) {
    for await (const value of values) {
      yield value
    }
    for await (const value of appendValues) {
      yield value
    }
  }
}
