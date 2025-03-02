/**
 * Creates a consumer that checks if at least one value in an async iterable satisfies a predicate.
 *
 * @description
 * This function tests whether at least one value in an async iterable passes the given predicate
 * function. It returns `true` as soon as it finds any value that passes the test, and `false`
 * only after checking all values and finding none that pass. Similar to Array.prototype.some(),
 * but works with async iterables and supports both synchronous and asynchronous predicates.
 *
 * The function short-circuits and returns `true` as soon as it finds a value that passes
 * the predicate, without processing the remaining values.
 *
 * @template T - The type of values in the async iterable
 * @param predicate - Function to test each value with its index
 * @returns A consumer function that returns a promise resolving to a boolean
 *
 * @example
 * ```ts
 * // Check if any number is negative
 * const hasNegative = await G.pipe(
 *   G.ofIterable([1, 2, -3, 4, 5]),
 *   G.some(x => x < 0)
 * ); // true
 *
 * const allPositive = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.some(x => x < 0)
 * ); // false
 *
 * // Check if any user is an admin with async predicate
 * const hasAdmin = await G.pipe(
 *   G.ofIterable(users),
 *   G.some(async user => {
 *     const roles = await fetchUserRoles(user.id);
 *     return roles.includes('admin');
 *   })
 * );
 *
 * // Efficiently check for data that meets criteria
 * // (short-circuits on first match)
 * const hasCriticalError = await G.pipe(
 *   G.ofIterable(logEntries),
 *   G.some(entry => entry.level === 'CRITICAL')
 * );
 * ```
 */
export function some<T>(predicate: (value: T, index: number) => boolean | Promise<boolean>) {
  return async function (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      if (await Promise.resolve(predicate(value, index++))) {
        return true
      }
    }
    return false
  }
}
