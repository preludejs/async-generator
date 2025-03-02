import type { Transformer } from './prelude.js'

/**
 * Internal helper function for when cycle count is zero or negative.
 * Just consumes the values without yielding anything.
 *
 * @internal
 */
// eslint-disable-next-line require-yield
async function* cycleZero(values: AsyncIterable<unknown>) {
  for await (const _value of values) {
    return
  }
}

/**
 * Creates a transformer that repeats values from an async iterable multiple times.
 *
 * @description
 * This function creates a transformer that repeats values from an async iterable a specified
 * number of times. It first collects all values into memory, then repeats them in sequence.
 *
 * By default, the values repeat infinitely (n = Infinity). Be careful with infinite cycles -
 * they should be used with combinators like `take` to avoid infinite loops.
 *
 * Special cases:
 * - If n is 0 or negative, no values are yielded (but the input is still consumed)
 * - If the source iterable is empty, nothing is yielded
 * - If n is 1, values are yielded exactly once (same as just passing through)
 *
 * Note that all values are stored in memory, so be cautious with very large data sets.
 *
 * @template T - The type of values in the async iterable
 * @param n - Number of times to repeat the values (default: Infinity)
 * @returns A transformer function that yields the input values repeated n times
 *
 * @example
 * ```ts
 * // Repeat values 3 times
 * const repeated = await G.pipe(
 *   G.ofIterable([1, 2, 3]),
 *   G.cycle(3),
 *   G.array
 * ); // [1, 2, 3, 1, 2, 3, 1, 2, 3]
 *
 * // Create an infinite cycle but take only 10 values
 * const tenValues = await G.pipe(
 *   G.ofIterable(['a', 'b', 'c']),
 *   G.cycle(), // Infinite cycle
 *   G.take(10),
 *   G.array
 * ); // ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a']
 *
 * // Generate repeated patterns
 * const pattern = await G.pipe(
 *   G.ofIterable([0, 1]),
 *   G.cycle(4),
 *   G.array
 * ); // [0, 1, 0, 1, 0, 1, 0, 1]
 * ```
 */
export function cycle<T>(n = Infinity): Transformer<T> {
  if (n <= 0) {
    return cycleZero
  }
  return async function* (values) {
    const seen: T[] = []
    for await (const value of values) {
      seen.push(value)
      yield value
    }
    if (seen.length === 0) {
      return
    }
    for (let i = 1; i < n; i++) {
      yield* seen
    }
  }
}
