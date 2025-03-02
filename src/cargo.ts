import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'

/**
 * Creates a transformer that accumulates values into dynamic batches.
 *
 * @description
 * This function creates a transformer that accumulates values from an async iterable into batches,
 * with each batch containing all values that arrived since the last batch was yielded. Unlike `batch`,
 * which creates fixed-size batches, `cargo` creates dynamic batches based on processing timing.
 *
 * The `length` parameter acts as a maximum capacity for each batch. If more values arrive than
 * this capacity while processing the current value, they will be processed in subsequent batches.
 *
 * Cargo is particularly useful for:
 * - Processing data in variable-sized batches based on arrival timing
 * - Efficiently handling bursts of data
 * - Implementing windowed processing with event-driven semantics
 *
 * @template T - The type of values in the async iterable
 * @param length - Maximum number of values in a batch (defaults to Infinity)
 * @returns A transformer function that yields arrays of accumulated values
 *
 * @example
 * ```ts
 * // Process dynamic batches of data
 * await G.pipe(
 *   eventStream, // An async iterable of events
 *   G.cargo(100), // Process in batches, max 100 items per batch
 *   G.consume(async batch => {
 *     console.log(`Processing batch of ${batch.length} items`);
 *     await processBatchOfEvents(batch);
 *   })
 * );
 *
 * // Simulate bursty traffic handling
 * const simulateBurstyTraffic = async function*() {
 *   // First burst: 5 quick values
 *   for (let i = 0; i < 5; i++) {
 *     yield i;
 *     await sleep(10); // Very small delay
 *   }
 *
 *   // Pause
 *   await sleep(1000);
 *
 *   // Second burst: 3 quick values
 *   for (let i = 5; i < 8; i++) {
 *     yield i;
 *     await sleep(10);
 *   }
 * };
 *
 * const batches = await G.pipe(
 *   simulateBurstyTraffic(),
 *   G.cargo(), // Will likely result in 2 batches based on timing
 *   G.array
 * );
 * // Likely result: [[0,1,2,3,4], [5,6,7]]
 * ```
 */
export function cargo<T>(length = Infinity): Transformer<T, T[]> {
  return async function* (values) {
    const input = Ch.ofAsyncIterable(values, length)
    for await (const value of input) {
      yield [ value, ...input.consumeWrites() ]
    }
  }
}
