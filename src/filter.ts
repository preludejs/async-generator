import type { Predicate, TypePredicate, AsyncPredicate, Transformer } from './prelude.js'

export function filter<T, U extends T>(predicate: TypePredicate<T, U>): Transformer<T, U>
export function filter<T>(predicate: Predicate<T> | AsyncPredicate<T>): Transformer<T>

/** @yields elements passing provided predicate only. */
export function filter(predicate: (value: unknown, index: number) => unknown) {
  return async function* (values: AsyncIterable<unknown>) {
    let index = 0
    for await (const value of values) {
      const result = Boolean(await Promise.resolve(predicate(value, index++)))
      if (result) {
        yield value
      }
    }
  }
}
