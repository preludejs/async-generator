import type { Transformer } from './prelude.js'
import sleep from './sleep.js'

/**
 * Creates a transformer that adds random time delays between yielded values.
 *
 * @description
 * This function yields each value from the source iterable immediately,
 * then waits for a random amount of time before processing the next value.
 * The delay consists of a fixed component plus a random component.
 *
 * @param jitter_ - Maximum random delay in milliseconds to add to the base delay
 * @param delay - Base delay in milliseconds to apply after each value (default: 0)
 * @returns A transformer that passes through all values with time delays between them
 *
 * @example
 * ```ts
 * // Yield values with 100-600ms delays between them
 * const throttled = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.jitter(500, 100),
 *   G.array
 * );
 * ```
 */
export function jitter<T>(jitter_: number, delay = 0): Transformer<T> {
  return async function* (values) {
    for await (const value of values) {
      yield value
      await sleep(delay + (Math.random() * jitter_))
    }
  }
}
