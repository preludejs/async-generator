/**
 * Creates a consumer that counts the number of elements in an async iterable that satisfy a predicate.
 *
 * @description
 * This function creates a consumer that iterates through all values in an async iterable and
 * counts how many of them pass the given predicate function. It's similar to Array.prototype.filter
 * followed by a length check, but more efficient as it doesn't need to create an intermediate array.
 *
 * If you need to count all elements without filtering, you can pass a predicate that always returns true.
 *
 * @template T - The type of values in the async iterable
 * @param predicate - Function that tests each value with its index
 * @returns A consumer function that returns a promise resolving to the count of matching elements
 *
 * @example
 * ```ts
 * // Count even numbers
 * const evenCount = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6, 7, 8]),
 *   G.count(x => x % 2 === 0)
 * ); // 4
 *
 * // Count total number of elements
 * const totalCount = await G.pipe(
 *   G.ofIterable(someAsyncIterable),
 *   G.count(() => true)
 * );
 *
 * // Count elements matching complex criteria
 * const adultUsers = await G.pipe(
 *   G.ofIterable(users),
 *   G.count(user => user.age >= 18 && user.hasAcceptedTerms)
 * );
 * ```
 */
export function count<T>(predicate: (value: T, index: number) => boolean) {
  return async function (values: AsyncIterable<T>) {
    let result = 0
    let index = 0
    for await (const value of values) {
      if (await Promise.resolve(predicate(value, index++))) {
        result++
      }
    }
    return result
  }
}
