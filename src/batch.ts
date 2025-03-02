import type { Transformer } from './prelude.js'

/**
 * Creates a transformer that groups values into fixed-size batches.
 *
 * @description
 * This function creates a transformer that collects values from an async iterable into arrays
 * of the specified length. When a batch reaches the specified length, it is yielded and a new
 * batch begins. If there are any remaining values that don't fill a complete batch, those will
 * be yielded as a final, smaller batch.
 *
 * Batching is useful for operations that are more efficient when performed on multiple items
 * at once, such as database operations, API requests, or processing optimizations.
 *
 * @template T - The type of values in the async iterable
 * @param length - The size of each batch
 * @returns A transformer function that yields arrays of batched values
 *
 * @example
 * ```ts
 * // Group into batches of 3
 * const batches = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6, 7, 8]),
 *   G.batch(3),
 *   G.array
 * );
 * // Results in: [[1, 2, 3], [4, 5, 6], [7, 8]]
 * // Note: The last batch has only 2 items
 *
 * // Process batches of data
 * await G.pipe(
 *   G.ofIterable(largeDataset),
 *   G.batch(100),
 *   G.consume(async batch => {
 *     // Process 100 items at a time
 *     await bulkInsert(batch);
 *   })
 * );
 * ```
 *
 * @throws {Error} If length is less than 1
 */
export function batch<T>(length: number): Transformer<T, T[]> {
  if (length < 1) {
    throw new Error(`Expected batch length to be at least 1, got ${length}`)
  }
  return async function* (values) {
    let range: T[] = []
    for await (const value of values) {
      if (range.push(value) >= length) {
        yield range
        range = []
      }
    }
    if (range.length > 0) {
      yield range
    }
  }
}
