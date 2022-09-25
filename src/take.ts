/** @yields n values. */
export function take(n: number) {
  if (!Number.isSafeInteger(n)) {
    throw new Error(`Expected number of elements to take to be a safe integer, got ${n}.`)
  }
  return async function* <T>(values: AsyncIterable<T>) {
    if (n <= 0) {
      return
    }
    let index = 0
    for await (const value of values) {
      yield value
      if (++index >= n) {
        break
      }
    }
  }
}
