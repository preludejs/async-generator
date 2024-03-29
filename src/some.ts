/** @returns `true` if at least one predicate is successful, `false` otherwise. */
export function some<T>(predicate: (value: T, index: number) => boolean | Promise<boolean>) {
  return async function (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      if (await Promise.resolve(predicate(value, index++))) {
        return true
      }
    }
    return false
  }
}
