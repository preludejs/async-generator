import type { Consumer } from './prelude.js'

/**
 * Creates a consumer that checks if all values in an async iterable are unique.
 *
 * @description
 * This function processes an async iterable and determines if all values (or derived keys)
 * are unique. It returns `true` if all values are unique, and `false` as soon as it
 * encounters a duplicate. The function can use an optional mapping function to transform
 * values into keys before checking uniqueness, which is useful for complex objects.
 *
 * @template T - The type of values in the async iterable
 * @template K - The type of keys used for uniqueness checks (defaults to T)
 *
 * @param f - Optional function to transform values into keys for uniqueness checking
 * @returns A consumer function that returns a promise resolving to a boolean
 *
 * @example
 * ```ts
 * // Check if all numbers are unique
 * const allUnique = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.areUnique()
 * ); // true
 *
 * const hasDuplicates = await G.pipe(
 *   G.ofIterable([1, 2, 3, 3, 5]),
 *   G.areUnique()
 * ); // false
 *
 * // Check uniqueness using a specific property
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 *
 * const uniqueIds = await G.pipe(
 *   G.ofIterable(users),
 *   G.areUnique(user => user.id)
 * ); // true
 * ```
 */
export function areUnique<T, K = T>(f?: (value: T) => K | Promise<K>): Consumer<T, boolean> {
  return async function (values) {
    const set = new Set<unknown>
    const g = f ?? (_ => _)
    for await (const value of values) {
      const key = await Promise.resolve(g(value))
      if (set.has(key)) {
        return false
      }
      set.add(key)
    }
    return true
  }
}
