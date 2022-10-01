/** Prepends provided values. */
export function prepend<T, U>(prependValues: Iterable<U> | AsyncIterable<U>) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T | U> {
    for await (const value of prependValues) {
      yield value
    }
    for await (const value of values) {
      yield value
    }
  }
}
