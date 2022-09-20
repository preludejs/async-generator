export const skip =
  <T>(n: number) =>
    async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
      let index = 0
      for await (const value of values) {
        if (++index > n) {
          yield value
        }
      }
    }
