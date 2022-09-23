import type { Predicate, TypePredicate, AsyncPredicate } from './prelude.js'

export function filter<T, U extends T>(predicate: TypePredicate<T, U>): (values: AsyncIterable<T>) => AsyncGenerator<U>
export function filter<T>(predicate: AsyncPredicate<T>): (values: AsyncIterable<T>) => AsyncGenerator<T>
export function filter<T>(predicate: Predicate<T>): (values: AsyncIterable<T>) => AsyncGenerator<T>

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
