import * as Ch from '@prelude/channel'

/** Consumes values. */
export const consume =
  <T, U>(f: (value: T, index: number, worker: number) => Promise<U>, { concurrency = 1 }: { concurrency?: number } = {}) =>
    async (values: AsyncIterable<T>) => {
      const ch = Ch.of<U>(Infinity)
      let index = 0
      return Promise.allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of values) {
          if (ch.done) {
            return
          }
          await f(value, index++, worker)
        }
      }))
    }
