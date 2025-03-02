/**
 * Creates an async generator that pairs each value with its sequential index.
 *
 * @description
 * This function transforms an async iterable by wrapping each value in an object that includes
 * the value and its sequential index. This is useful when you need to keep track of positions
 * in the original sequence, especially when processing values in parallel or when performing
 * transformations that might affect ordering.
 *
 * The result is an async generator yielding objects with the structure:
 * `{ value: T, index: number }`
 *
 * This function is often used in conjunction with `unwrapIndexed` to preserve the original
 * order when processing asynchronously with concurrency.
 *
 * @template T - The type of values in the async iterable
 * @param values - The async iterable whose values will be paired with indices
 * @returns An async generator that yields objects containing values and their indices
 *
 * @example
 * ```ts
 * // Add indices to values
 * const indexed = await G.pipe(
 *   G.ofIterable(['a', 'b', 'c']),
 *   G.withIndex,
 *   G.array
 * ); // [{ value: 'a', index: 0 }, { value: 'b', index: 1 }, { value: 'c', index: 2 }]
 *
 * // Preserve original order with concurrent processing
 * const processedInOrder = await G.pipe(
 *   G.ofIterable(items),
 *   G.withIndex,
 *   G.map(async ({ value, index }) => {
 *     const processed = await processAsynchronously(value);
 *     return { value: processed, index };
 *   }, { concurrency: 5 }),
 *   G.unwrapIndexed,
 *   G.array
 * );
 *
 * // Access indices during processing without changing the output
 * await G.pipe(
 *   G.ofIterable(data),
 *   G.withIndex,
 *   G.tap(({ value, index }) => {
 *     console.log(`Processing item ${index}: ${value}`);
 *   }),
 *   G.map(({ value }) => value), // Unwrap to original values
 *   G.array
 * );
 * ```
 */
export async function* withIndex<T>(values: AsyncIterable<T>): AsyncGenerator<{ value: T, index: number }> {
  let index = 0
  for await (const value of values) {
    yield { value, index: index++ }
  }
}

export default withIndex
