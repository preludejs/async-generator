import * as Ch from '@prelude/channel'

/**
 * Serial implementation of tap transformation.
 *
 * @internal
 * @param f - Function to apply to each value
 * @returns Transformer function that applies the function and yields the original values
 */
function serialTap<T>(
  f: (value: T, index: number, worker: number) => void | Promise<void>
) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      await Promise.resolve(f(value, index++, 0))
      yield value
    }
  }
}

/**
 * Concurrent implementation of tap transformation.
 *
 * @internal
 * @param f - Function to apply to each value
 * @param concurrency - Maximum number of concurrent operations
 * @returns Transformer function that concurrently applies the function and yields the original values
 */
function concurrentTap<T>(
  f: (value: T, index: number, worker: number) => void | Promise<void>,
  concurrency: number
) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable<T>(values)
    const output = Ch.of<T>()
    Promise
      .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of input) {
          await Promise.resolve(f(value, index++, worker))
          await output.write(value)
        }
      }))
      .finally(() => {
        output.closeWriting()
      })
      .catch(() => {
        // unreachable
      })
    yield* output
  }
}

/**
 * Creates a transformer that applies a function to each value without changing the values.
 *
 * @description
 * The tap function is used for side effects while processing an async iterable. It applies
 * the provided function to each value but yields the original values unchanged.
 * Supports concurrent processing with configurable concurrency.
 *
 * @param f - Side-effect function to apply to each value
 * @param options - Configuration options
 * @param options.concurrency - Number of concurrent operations (default: 1)
 * @returns A transformer function that yields the original values after applying the function
 *
 * @example
 * ```ts
 * // Log values as they pass through
 * const result = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.tap(value => console.log(`Processing: ${value}`)),
 *   G.array
 * ); // [1, 2, 3, 4, 5]
 *
 * // Process values concurrently
 * const result = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.tap(async value => {
 *     await longRunningOperation(value);
 *   }, { concurrency: 3 }),
 *   G.array
 * );
 * ```
 */
export function tap<T>(
  f: (value: T, index: number, worker: number) => void | Promise<void>,
  { concurrency = 1 }: { concurrency?: number } = {}
) {
  return concurrency === 1 ?
    serialTap(f) :
    concurrentTap(f, concurrency)
}
