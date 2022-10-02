import type { Transformer } from './prelude.js'

/** Appends provided values. */
export function append<T, U>(appendValues: Iterable<U> | AsyncIterable<U>): Transformer<T, T | U> {
  return async function* (values) {
    for await (const value of values) {
      yield value
    }
    for await (const value of appendValues) {
      yield value
    }
  }
}
