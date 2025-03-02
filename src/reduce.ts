/**
 * Creates a consumer that reduces values from an async iterable to a single result.
 *
 * @description Processes each value in the async iterable using the provided reduction function,
 * accumulating a result starting with the initial value.
 *
 * @param reduction - Function that takes the accumulated result, the current value, and the index,
 *                   and returns the new accumulated result
 * @param initial - The initial value for the reduction
 * @returns A consumer function that returns a promise resolving to the final reduced value
 *
 * @example
 * ```ts
 * const sum = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.reduce((acc, value) => acc + value, 0)
 * ); // sum === 15
 * ```
 */
export function reduce<T, R>(reduction: (result: R, value: T, index: number) => R | Promise<R>, initial: R | Promise<R>) {
  return async function (values: AsyncIterable<T>): Promise<R> {
    let result = await Promise.resolve(initial)
    let index = 0
    for await (const value of values) {
      result = await Promise.resolve(reduction(result, value, index++))
    }
    return result
  }
}
