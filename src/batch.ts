/** @yields values in n-length batches, last batch can have length between 1 and n. */
export function batch(n: number) {
  return async function* <T>(values: AsyncIterable<T>): AsyncGenerator<T[]> {
    let range: T[] = []
    for await (const value of values) {
      if (range.push(value) >= n) {
        yield range
        range = []
      }
    }
    if (range.length > 0) {
      yield range
    }
  }
}
