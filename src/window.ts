/**
 * Creates a transformer that yields sliding windows of values from an async iterable.
 *
 * @description
 * This function creates a transformer that collects values into sliding windows of a fixed size
 * and yields each complete window as an array. It maintains a buffer that slides forward as new
 * values arrive, yielding a new window each time the buffer reaches the specified length.
 *
 * The sliding window pattern is useful for:
 * - Calculating moving averages or other rolling statistics
 * - Detecting patterns that span multiple sequential values
 * - Analyzing trends in time series data
 * - Processing data that requires context from neighboring elements
 *
 * By default, only complete windows (of length n) are yielded. If the `yieldsShorter` parameter
 * is set to true, a final shorter window will be yielded if there aren't enough values to
 * fill a complete window at the end.
 *
 * @template T - The type of values in the async iterable
 * @param n - The size of each window
 * @param yieldsShorter - Whether to yield a shorter final window if there aren't enough values (default: false)
 * @returns A transformer function that yields arrays representing sliding windows of values
 *
 * @example
 * ```ts
 * // Basic sliding window
 * const windows = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.window(3),
 *   G.array
 * ); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // Include shorter final window
 * const allWindows = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4]),
 *   G.window(3, true),
 *   G.array
 * ); // [[1, 2, 3], [2, 3, 4], [3, 4]]
 *
 * // Calculate moving averages
 * const movingAverages = await G.pipe(
 *   G.ofIterable(measurements),
 *   G.window(5),
 *   G.map(window => window.reduce((sum, val) => sum + val, 0) / window.length),
 *   G.array
 * );
 *
 * // Detect patterns in sequence
 * const foundPatterns = await G.pipe(
 *   G.ofIterable(sequence),
 *   G.window(4),
 *   G.filter(window => isPattern(window)),
 *   G.array
 * );
 * ```
 */
export function window<T>(n: number, yieldsShorter = false) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T[]> {
    const range: T[] = []
    for await (const value of values) {
      switch (range.push(value)) {
        case n + 1:
          range.shift()
          // fallthrough
        case n:
          yield range.slice()
          break
        default:
          // noop
      }
    }
    if (range.length < n && yieldsShorter) {
      yield range
    }
  }
}
