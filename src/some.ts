/** @returns `true` if at least one `f`-predicate returns `true`, `false` otherwise. */
export const some =
  <T>(predicate: (value: T, index: number) => boolean | Promise<boolean>) =>
    async (values: Iterable<T>): Promise<boolean> => {
      let index = 0
      for (const value of values) {
        if (await Promise.resolve(predicate(value, index++))) {
          return true
        }
      }
      return false
    }
