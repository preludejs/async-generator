export function reduce<T, R>(reduction: (result: R, value: T, index: number) => R | Promise<R>, initial: R | Promise<R>) {
  return async function (values: AsyncIterable<T>): Promise<R> {
    let result = await Promise.resolve(initial)
    let index = 0
    for await (const value of values) {
      result = await Promise.resolve(reduction(result, value, index++))
    }
    return result
  }
}
