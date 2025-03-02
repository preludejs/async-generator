/**
 * Creates an async generator that restores the original order of values based on their indices.
 *
 * @description
 * This function takes an async iterable of objects with `value` and `index` properties and
 * yields the values in the order of their indices, regardless of the order in which they
 * were received. This is particularly useful for preserving the original order when
 * processing items concurrently.
 *
 * The function expects contiguous, 0-based indices. If any index is missing (causing gaps),
 * it will throw an error once all values have been processed.
 *
 * This is typically used in conjunction with `withIndex` to enable concurrent processing
 * while maintaining the original sequence order.
 *
 * @template T - The type of values in the async iterable
 * @param values - The async iterable of indexed values to unwrap
 * @returns An async generator that yields values in their original indexed order
 *
 * @example
 * ```ts
 * // Basic usage - restore order
 * const concurrentResults = [
 *   { value: 'c', index: 2 },
 *   { value: 'a', index: 0 },
 *   { value: 'b', index: 1 }
 * ];
 *
 * const ordered = await G.pipe(
 *   G.ofIterable(concurrentResults),
 *   G.unwrapIndexed,
 *   G.array
 * ); // ['a', 'b', 'c']
 *
 * // Preserve order with concurrent processing
 * const processedInOrder = await G.pipe(
 *   G.ofIterable(items),
 *   G.withIndex, // Add indices
 *   G.map(async ({ value, index }) => {
 *     // Process concurrently, which might change order
 *     const processed = await processAsynchronously(value);
 *     return { value: processed, index };
 *   }, { concurrency: 5 }),
 *   G.unwrapIndexed, // Restore original order
 *   G.array
 * );
 * ```
 *
 * @throws {Error} If any index in the sequence is missing when processing completes
 */
export async function* unwrapIndexed<T>(values: AsyncIterable<{ value: T, index: number }>): AsyncGenerator<T> {
  const map = new Map<number, T>()
  let j = 0
  for await (const { index, value } of values) {
    map.set(index, value)
    while (map.has(j)) {
      yield map.get(j) as T
      map.delete(j)
      j++
    }
  }
  if (map.size > 0) {
    throw new Error(`Invalid 0-based indices, didn't see index ${j}.`)
  }
}

export default unwrapIndexed
