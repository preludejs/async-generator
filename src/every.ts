/** @returns `true` if all elements are passing provided predicate, `false` otherwise. */
export const every =
  <T>(predicate: (value: T, index: number) => boolean | Promise<boolean>) =>
    async (values: AsyncIterable<T>): Promise<boolean> => {
      let index = 0
      for await (const value of values) {
        if (!await Promise.resolve(predicate(value, index++))) {
          return false
        }
      }
      return true
    }
