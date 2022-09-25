/** Consumes values using optional callback with specified concurrency. */
export function consume<T>(
  callback?: (value: T, index: number, worker: number) => unknown | Promise<unknown>,
  { concurrency = 1 }: { concurrency?: number } = {}
) {
  return async function (values: AsyncIterable<T>) {
    let index = 0
    return Promise.allSettled(Array.from({ length: concurrency }, async (_, worker) => {
      for await (const value of values) {
        if (callback) {
          await Promise.resolve(callback(value, index++, worker))
        }
      }
    }))
  }
}
