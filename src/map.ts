import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'
import unwrapIndexed from './unwrap-indexed.js'
import withIndex from './with-index.js'

type F<T, U> = (value: T, index: number, worker: number) => U | Promise<U>

/**
 * Serial implementation of map transformation.
 *
 * @internal
 * @param f - Mapping function
 * @returns Transformer function for mapping values serially
 */
function serial<T, U>(f: F<T, U>) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      yield await Promise.resolve(f(value, index++, 0))
    }
  }
}

/**
 * Unordered concurrent implementation of map transformation.
 *
 * @internal
 * @param f - Mapping function
 * @param concurrency - Maximum number of concurrent operations
 * @returns Transformer function for mapping values concurrently without preserving order
 */
function unordered<T, U>(f: F<T, U>, concurrency: number) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable(values)
    const output = Ch.of<U>()
    Promise
      .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of input) {
          await output.write(await Promise.resolve(f(value, index++, worker)))
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
 * Ordered concurrent implementation of map transformation.
 *
 * @internal
 * @param f - Mapping function
 * @param concurrency - Maximum number of concurrent operations
 * @returns Transformer function for mapping values concurrently while preserving order
 */
function ordered<T, U>(f: F<T, U>, concurrency: number) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable(withIndex(values))
    const output = Ch.of<{ index: number, value: U }>()
    Promise
      .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of input) {
          await output.write({
            index: value.index,
            value: await Promise.resolve(f(value.value, index++, worker))
          })
        }
      }))
      .finally(() => {
        output.closeWriting()
      })
      .catch(() => {
        // unreachable
      })
    yield* unwrapIndexed(output)
  }
}

/**
 * Creates a transformer that maps each value using the provided function.
 *
 * @description
 * Applies a mapping function to each value in an async iterable, with support for
 * concurrent processing and order preservation.
 *
 * @param f - Function to apply to each value, receiving the value, its index, and worker number
 * @param options - Configuration options
 * @param options.concurrency - Number of concurrent operations (default: 1)
 * @param options.preserveOrder - Whether to preserve the original order (default: true)
 * @returns A transformer function that yields the mapped values
 *
 * @example
 * ```ts
 * // Serial mapping (default)
 * const doubled = await G.pipe(
 *   G.ofIterable([1, 2, 3]),
 *   G.map(x => x * 2),
 *   G.array
 * ); // [2, 4, 6]
 *
 * // Concurrent mapping with preserved order
 * const results = await G.pipe(
 *   G.ofIterable([1, 2, 3, 4, 5]),
 *   G.map(async x => {
 *     await sleep(100);
 *     return x * 2;
 *   }, { concurrency: 3 }),
 *   G.array
 * ); // [2, 4, 6, 8, 10]
 * ```
 */
export function map<T, U>(f: F<T, U>, { concurrency = 1, preserveOrder = true }: {
  concurrency?: number,
  preserveOrder?: boolean
} = {}): Transformer<T, U> {
  if (concurrency === 1) {
    return serial(f)
  }
  if (!preserveOrder) {
    return unordered(f, concurrency)
  }
  return ordered(f, concurrency)
}
