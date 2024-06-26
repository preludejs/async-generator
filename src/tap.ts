import * as Ch from '@prelude/channel'

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

export function tap<T>(
  f: (value: T, index: number, worker: number) => void | Promise<void>,
  { concurrency = 1 }: { concurrency?: number } = {}
) {
  return concurrency === 1 ?
    serialTap(f) :
    concurrentTap(f, concurrency)
}
