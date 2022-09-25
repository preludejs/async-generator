/** @returns `true` if all elements are passing provided predicate, `false` otherwise. */
export function every<T>(predicate: (value: T, index: number) => boolean | Promise<boolean>) {
  return async function (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      if (!await Promise.resolve(predicate(value, index++))) {
        return false
      }
    }
    return true
  }
}
