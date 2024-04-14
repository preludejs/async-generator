import array from './array.js'
import type { AsyncIterated } from './prelude.js'

export function cartesianProduct<T, U extends undefined | AsyncIterable<unknown>>(
  otherValues?: U
) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<[T, U extends undefined ? T : AsyncIterated<U>]> {
    const otherValues_ = await array(otherValues ?? values)
    const values_ = otherValues ? values : otherValues_
    for await (const value of values_) {
      for (const otherValue of otherValues_) {
        yield [value, otherValue] as [T, U extends undefined ? T : AsyncIterated<U>]
      }
    }
  }
}

export default cartesianProduct
