import type { Predicate, TypePredicate, AsyncPredicate, Transformer } from './prelude.js'

export function filter<T, U extends T>(predicate: TypePredicate<T, U>): Transformer<T, U>
export function filter<T>(predicate: AsyncPredicate<T>): Transformer<T>
export function filter<T>(predicate: Predicate<T>): Transformer<T>

/** @yields elements passing provided predicate only. */
export function filter(predicate: (value: unknown, index: number) => unknown) {
  return async function* (values: AsyncIterable<unknown>) {
    let index = 0
    for await (const value of values) {
      if (await Promise.resolve(predicate(value, index++))) {
        yield value
      }
    }
  }
}
