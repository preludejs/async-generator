import * as Ch from '@prelude/channel'

/** @yields accumulated values since last yield not exceeding `max`. */
export function cargo<T>(max = Infinity) {
  return async function* (values: AsyncIterable<T>) {
    const producer = Ch.ofAsyncIterable<T>(values, max)
    const consumer = Ch.of<T[]>()
    while (true) {
      const result = await producer.next()
      if (result.done) {
        break
      }
      const values = [ result.value, ...producer.consumeWrites() ]
      while (producer.pendingWrites > 0) {
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
