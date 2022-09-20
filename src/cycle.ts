/**
 * @returns infinite async generator cycling through values.
 */
export const cycle =
  async function* <T>(values: AsyncIterable<T>) {
    const seen: T[] = []
    for await (const value of values) {
      seen.push(value)
      yield value
    }
    if (seen.length === 0) {
      return
    }
    while (true) {
      yield* seen
    }
  }
