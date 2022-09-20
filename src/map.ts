import * as Ch from '@prelude/channel'

export const map =
  <T, U>(f: (value: T, index: number, worker: number) => Promise<U>, { concurrency = 1 }: { concurrency?: number } = {}) =>
    async function* (values: AsyncIterable<T>) {
      let index = 0
      const input = Ch.ofAsyncIterable<T>(values)
      const output = Ch.of<U>()
      Promise
        .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
          for await (const value of input) {
            await Ch.write(output, await f(value, index++, worker))
          }
        }))
        .finally(() => {
          output.done = true
        })
      yield* output
    }
