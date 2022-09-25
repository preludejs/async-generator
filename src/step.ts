/** @yields values at index where modulo is zero. */
export function step<T>(modulo: number) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
    let i = 0
    for await (const value of values) {
      if (i === 0) {
        yield value
      }
      if (++i === modulo) {
        i = 0
      }
    }
  }
}
