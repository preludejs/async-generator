/** Skips n values yielding the rest. */
export function skip<T>(n: number) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
    let index = 0
    for await (const value of values) {
      if (++index > n) {
        yield value
      }
    }
  }
}
