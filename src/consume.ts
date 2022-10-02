import type { Consumer } from './prelude.js'

/** @returns consumer without return value. */
export function consume<T>(
  callback?: (value: T, index: number, worker: number) => unknown | Promise<unknown>,
  { concurrency = 1 }: { concurrency?: number } = {}
): Consumer<T, void> {
  return async function (values) {
    let index = 0
    await Promise.all(Array.from({ length: concurrency }, async (_, worker) => {
      for await (const value of values) {
        if (callback) {
          await Promise.resolve(callback(value, index++, worker))
        }
      }
    }))
  }
}
