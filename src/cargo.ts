import * as Ch from '@prelude/channel'

/** @yields accumulated values since last yield not exceeding `max`. */
export const cargo =
  <T>(max = Infinity) =>
    async function* (values: AsyncIterable<T>) {
      const producer = Ch.ofAsyncIterable<T>(values, max)
      const consumer = Ch.of<T[]>()
      while (true) {
        const result = await Ch.next(producer)
        if (result.done) {
          break
        }
        const values = [ result.value ]
        while (producer.writes.length > 0) {
          values.push(Ch.Internal.consumeWrite(producer))
        }
        if (consumer.done) {
          break
        }
        await Ch.write(consumer, values)
      }
      yield* consumer
    }
