import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'

/** @returns transformer that accumulates values since last yield; yielded batches will not exceed provided `length` (defaults to infinity). */
export function cargo<T>(length = Infinity): Transformer<T, T[]> {
  return async function* (values) {
    const input = Ch.ofAsyncIterable(values, length)
    for await (const value of input) {
      yield [ value, ...input.consumeWrites() ]
    }
  }
}
