/** Appends provided values. */
export function append<T, U>(appendValues: Iterable<U> | AsyncIterable<U>) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T | U> {
    for await (const value of values) {
      yield value
    }
    for await (const value of appendValues) {
      yield value
    }
  }
}
