import * as Ch from '@prelude/channel'

export function map<T, U>(
  f: (value: T, index: number, worker: number) => U | Promise<U>,
  { concurrency = 1 }: { concurrency?: number } = {}
) {
  if (concurrency === 1) {
    return async function* (values: AsyncIterable<T>) {
      let index = 0
      for await (const value of values) {
        yield await Promise.resolve(f(value, index++, 0))
      }
    }
  }
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable<T>(values)
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
    yield* output
  }
}
