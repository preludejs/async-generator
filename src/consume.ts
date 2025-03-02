import type { Consumer } from './prelude.js'

/**
 * Creates a consumer that processes all values from an async iterable without returning a result.
 *
 * @description
 * This function creates a terminal consumer that processes every value in an async iterable,
 * typically for side effects. It doesn't produce a value but simply ensures that all values
 * are processed by the optional callback function.
 *
 * The consumer supports concurrent processing with the `concurrency` option. When greater than 1,
 * multiple worker threads will process values in parallel, which can improve performance for
 * CPU-bound or I/O-bound operations.
 *
 * If no callback is provided, this effectively just drains the async iterable, ensuring all
 * values are processed.
 *
 * @template T - The type of values in the async iterable
 * @param callback - Optional function to apply to each value
 * @param options - Configuration options
 * @param options.concurrency - Number of concurrent worker threads (default: 1)
 * @returns A consumer function that returns a promise resolving to void
 *
 * @example
 * ```ts
 * // Simple sequential processing
 * await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.consume(value => {
 *     console.log(`Processing: ${value}`);
 *   })
 * );
 *
 * // Concurrent processing of CPU-intensive operations
 * await G.pipe(
 *   G.ofIterable(largeDataset),
 *   G.consume(async item => {
 *     await processItemIntensively(item);
 *   }, { concurrency: 4 }) // Use 4 concurrent workers
 * );
 *
 * // Just drain the iterable (run it to completion)
 * await G.pipe(
 *   generatorThatHasSideEffects(),
 *   G.consume() // No callback, just ensures all values are processed
 * );
 *
 * // Concurrent processing with database operations
 * await G.pipe(
 *   G.ofIterable(records),
 *   G.consume(async record => {
 *     await db.insert(record);
 *   }, { concurrency: 10 }) // Handle 10 DB operations concurrently
 * );
 * ```
 */
export function consume<T>(
  callback?: (value: T, index: number, worker: number) => unknown,
  { concurrency = 1 }: { concurrency?: number } = {}
): Consumer<T, void> {
  return async function (values) {
    let index = 0
    await Promise.all(Array.from({ length: concurrency }, async (_, worker) => {
      for await (const value of values) {
        if (callback) {
          await Promise.resolve(callback(value, index++, worker))
        }
      }
    }))
  }
}
