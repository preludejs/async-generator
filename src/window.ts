/**
 * @yields window of values.
 *
 * @param n window length.
 * @param yieldsShorter should yield shorter range if collection is shorter than window (default false).
 */
export function window<T>(n: number, yieldsShorter = false) {
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T[]> {
    const range: T[] = []
    for await (const value of values) {
      switch (range.push(value)) {
        case n + 1:
          range.shift()
          // fallthrough
        case n:
          yield range.slice()
          break
        default:
          // noop
      }
    }
    if (range.length < n && yieldsShorter) {
      yield range
    }
  }
}
