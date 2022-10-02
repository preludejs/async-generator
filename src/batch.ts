import type { Transformer } from './prelude.js'

/** @returns transformer batching values into `length`-sized arrays, last batch can have length between 1 and `length`. */
export function batch<T>(length: number): Transformer<T, T[]> {
  return async function* (values) {
    let range: T[] = []
    for await (const value of values) {
      if (range.push(value) >= length) {
        yield range
        range = []
      }
    }
    if (range.length > 0) {
      yield range
    }
  }
}
