import { map } from './map.js'
import type { Transformer } from './prelude.js'

/**
 * Creates a transformer that mutates values by assigning properties from a function result.
 *
 * @description
 * This function creates a transformer that applies a function to each value in an async iterable
 * and merges the result back into the original object using `Object.assign()`. This effectively
 * mutates each object by adding or updating properties based on the function result.
 *
 * Note that this operation modifies the original objects in-place, which can be useful for
 * efficiency but may have side effects if the same objects are used elsewhere.
 *
 * @template T - The type of objects in the async iterable (must extend {})
 * @template U - The type of properties to assign to each object
 *
 * @param f - Function that produces properties to assign to each object
 * @returns A transformer function that yields objects with assigned properties
 *
 * @example
 * ```ts
 * // Add calculated properties to objects
 * const enrichedUsers = await G.pipe(
 *   G.ofIterable([
 *     { id: 1, firstName: 'John', lastName: 'Doe' },
 *     { id: 2, firstName: 'Jane', lastName: 'Smith' }
 *   ]),
 *   G.assign(user => ({
 *     fullName: `${user.firstName} ${user.lastName}`,
 *     displayId: `ID-${user.id}`
 *   })),
 *   G.array
 * );
 * // Results in:
 * // [
 * //   { id: 1, firstName: 'John', lastName: 'Doe', fullName: 'John Doe', displayId: 'ID-1' },
 * //   { id: 2, firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith', displayId: 'ID-2' }
 * // ]
 *
 * // Enrich with async data
 * const usersWithStatus = await G.pipe(
 *   G.ofIterable(users),
 *   G.assign(async user => {
 *     const status = await fetchUserStatus(user.id);
 *     return { status, lastChecked: new Date() };
 *   }),
 *   G.array
 * );
 * ```
 */
export function assign<T extends object, U>(f: (value: T, index: number) => U): Transformer<T, T & Awaited<U>> {
  return map(async function (value, index) {
    return Object.assign(value, await Promise.resolve(f(value, index)))
  })
}
