/**
 * Creates a transformer that yields every nth value from an async iterable.
 *
 * @description
 * This function creates a transformer that samples values from an async iterable at regular
 * intervals, yielding only every nth value (where n is the provided step). The first value
 * is always included, followed by every nth value thereafter.
 *
 * This is useful for:
 * - Downsampling data streams
 * - Reducing data volume while preserving patterns
 * - Taking periodic samples from a continuous stream
 *
 * Unlike `filter` with a modulo check, this implementation uses a counter that resets,
 * which can be more efficient for large step values.
 *
 * @template T - The type of values in the async iterable
 * @param step_ - The step interval (must be a positive integer)
 * @returns A transformer function that yields every nth value
 *
 * @example
 * ```ts
 * // Take every 3rd value
 * const sampledData = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
 *   G.step(3), // Take 1st, 4th, 7th, 10th
 *   G.array
 * ); // [1, 4, 7, 10]
 *
 * // Downsample a sensor reading stream
 * const downsampledReadings = G.pipe(
 *   sensorReadings, // High-frequency data
 *   G.step(60),     // Take every 60th reading
 *   G.consume(reading => {
 *     recordDownsampledReading(reading);
 *   })
 * );
 *
 * // Combine with other transformers
 * const processedData = await G.pipe(
 *   G.ofIterable(largeDataset),
 *   G.filter(item => item.isValid),
 *   G.step(5), // Process only 1/5th of the valid items
 *   G.map(item => processItem(item)),
 *   G.array
 * );
 * ```
 *
 * @throws {RangeError} If step is less than 1 or not a safe integer
 */
export function step<T>(step_: number) {
  if (step_ < 1) {
    throw new RangeError(`Expected step to be greater than zero, got ${step_}.`)
  }
  if (!Number.isSafeInteger(step_)) {
    throw new RangeError(`Expected step to be a safe integer, got ${step_}.`)
  }
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
    let i = 0
    for await (const value of values) {
      if (i === 0) {
        yield value
      }
      if (++i === step_) {
        i = 0
      }
    }
  }
}
