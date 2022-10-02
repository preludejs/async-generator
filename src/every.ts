import type { AnyPredicate, Consumer } from './prelude.js'

/** @returns `true` if all elements are passing provided predicate, `false` otherwise. */
export function every<T>(predicate: AnyPredicate<T>): Consumer<T, boolean> {
  return async function (values) {
    let index = 0
    for await (const value of values) {
      if (!await Promise.resolve(predicate(value, index++))) {
        return false
      }
    }
    return true
  }
}
