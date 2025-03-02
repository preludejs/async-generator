import type { Predicate, TypePredicate, AsyncPredicate, Transformer } from './prelude.js'

/**
 * Creates a transformer that filters values based on a predicate function.
 *
 * @description
 * This function creates a transformer that only yields values from an async iterable
 * that pass a predicate test. The predicate can be a synchronous function, an async function,
 * or a type predicate for TypeScript type narrowing.
 *
 * The filter function supports three different predicate types:
 * - Regular predicates that return a boolean
 * - Async predicates that return a Promise<boolean>
 * - Type predicates that narrow the type (e.g., `is User`)
 *
 * @template T - The type of values in the input async iterable
 * @template U - The narrowed type when using a type predicate (extends T)
 *
 * @param predicate - Function to test each value with its index
 * @returns A transformer function that yields only values that pass the predicate
 *
 * @example
 * ```ts
 * // Filter even numbers
 * const evenNumbers = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6]),
 *   G.filter(x => x % 2 === 0),
 *   G.array
 * ); // [2, 4, 6]
 *
 * // Async predicate
 * const validUsers = await G.pipe(
 *   G.ofIterable(users),
 *   G.filter(async user => {
 *     const isValid = await validateUser(user);
 *     return isValid;
 *   }),
 *   G.array
 * );
 *
 * // Type predicate (narrows the type)
 * interface User { id: number; name: string; }
 * interface Admin extends User { role: 'admin'; permissions: string[]; }
 *
 * function isAdmin(user: User): user is Admin {
 *   return 'role' in user && user.role === 'admin';
 * }
 *
 * const admins = await G.pipe(
 *   G.ofIterable(users),
 *   G.filter(isAdmin), // Narrows type from User to Admin
 *   G.array
 * );
 * ```
 */
export function filter<T, U extends T>(predicate: TypePredicate<T, U>): Transformer<T, U>

export function filter<T>(predicate: Predicate<T> | AsyncPredicate<T>): Transformer<T>

export function filter(predicate: (value: unknown, index: number) => unknown) {
  return async function* (values: AsyncIterable<unknown>) {
    let index = 0
    for await (const value of values) {
      const result = Boolean(await Promise.resolve(predicate(value, index++)))
      if (result) {
        yield value
      }
    }
  }
}
