/** @returns function returning number of elements that satisfy predicate. */
export function count<T>(predicate: (value: T, index: number) => boolean) {
  return async function (values: AsyncIterable<T>) {
    let result = 0
    let index = 0
    for await (const value of values) {
      if (await Promise.resolve(predicate(value, index++))) {
        result++
      }
    }
    return result
  }
}
