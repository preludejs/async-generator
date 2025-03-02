import * as Ch from '@prelude/channel'

/**
 * Creates an async generator that yields values at regular time intervals.
 *
 * @description
 * This function creates an infinite async generator that emits values periodically
 * according to the specified interval in milliseconds. Each value is an object containing:
 *
 * - `generatedAt`: The timestamp when the value was created by the interval
 * - `yieldedAt`: The timestamp when the value was actually yielded (might differ from generation time)
 * - `index`: A sequential counter starting from 0
 *
 * This generator uses proper resource management with `setInterval` to ensure that the interval
 * is cleared when the generator is closed or if an error occurs.
 *
 * Note that this generator is infinite and should typically be used with `take` or similar
 * combinators to limit the number of values processed.
 *
 * @param milliseconds - The time interval between values in milliseconds
 * @returns An async generator that yields timestamp objects at regular intervals
 *
 * @example
 * ```ts
 * // Emit a value every second, take only 5 values
 * const timestamps = await G.pipe(
 *   G.ofInterval(1000), // Every 1 second
 *   G.take(5),          // Only take 5 values
 *   G.array
 * );
 * // Result: Array of 5 objects with generatedAt, yieldedAt, and index properties
 *
 * // Generate values every 500ms and transform them
 * const countDownFrom10 = await G.pipe(
 *   G.ofInterval(500),
 *   G.take(10),
 *   G.map((_, idx) => 10 - idx), // Count down from 10
 *   G.array
 * ); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
 *
 * // Create a polling system
 * const polledResults = G.pipe(
 *   G.ofInterval(5000), // Poll every 5 seconds
 *   G.map(async () => {
 *     return await fetchLatestData();
 *   }),
 *   G.consume(data => {
 *     updateUI(data);
 *   })
 * );
 * ```
 */
export async function* ofInterval(milliseconds: number): AsyncGenerator<{ generatedAt: Date, yieldedAt: Date, index: number }> {
  const ch = Ch.of<Date>(Infinity)
  const intervalId =
    setInterval(() => {
      if (ch.doneWriting) {
        clearInterval(intervalId)
        return
      }
      ch.writeIgnore(new Date())
    }, milliseconds)
  let index = 0
  try {
    for await (const generatedAt of ch) {
      yield { generatedAt, yieldedAt: new Date, index: index++ }
    }
  } finally {
    clearInterval(intervalId)
    if (!ch.doneWriting) {
      ch.closeWriting()
    }
  }
}
