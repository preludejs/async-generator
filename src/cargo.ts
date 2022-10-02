import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'

/** @returns transformer that accumulates values since last yield; yielded batches will not exceed provided `length` (defaults to infinity). */
export function cargo<T>(length = Infinity): Transformer<T, T[]> {
  return async function* (values) {
    const producer = Ch.ofAsyncIterable<T>(values, length)
    const consumer = Ch.of<T[]>()
    while (true) {
      const result = await producer.next()
      if (result.done) {
        break
      }
      const values = [ result.value ]
      while (producer.pendingWrites > 0 && values.length < length) {
        values.push(producer.consumeWrite())
      }
      if (consumer.done) {
        break
      }
      await consumer.write(values)
    }
    yield* consumer
  }
}
