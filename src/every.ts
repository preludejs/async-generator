import type { AnyPredicate, Consumer } from './prelude.js'

/**
 * Creates a consumer that checks if all values in an async iterable satisfy a predicate.
 *
 * @description
 * This function tests whether all values in an async iterable pass the given predicate function.
 * It returns `true` if every value passes the test, and `false` as soon as it encounters any
 * value that fails. Similar to Array.prototype.every(), but works with async iterables and
 * supports both synchronous and asynchronous predicates.
 *
 * The function short-circuits and returns `false` as soon as it finds a value that doesn't
 * pass the predicate, without processing the remaining values.
 *
 * @template T - The type of values in the async iterable
 * @param predicate - Function to test each value with its index
 * @returns A consumer function that returns a promise resolving to a boolean
 *
 * @example
 * ```ts
 * // Check if all numbers are positive
 * const allPositive = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.every(x => x > 0)
 * ); // true
 *
 * const hasNegative = await G.pipe(
 *   G.ofIterable([1, 2, -3, 4, 5]),
 *   G.every(x => x > 0)
 * ); // false
 *
 * // With async predicate
 * const allValid = await G.pipe(
 *   G.ofIterable(users),
 *   G.every(async user => {
 *     const isValid = await validateUser(user);
 *     return isValid;
 *   })
 * );
 * ```
 */
export function every<T>(predicate: AnyPredicate<T>): Consumer<T, boolean> {
  return async function (values) {
    let index = 0
    for await (const value of values) {
      if (!await Promise.resolve(predicate(value, index++))) {
        return false
      }
    }
    return true
  }
}
