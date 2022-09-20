/** @yields values with index */
export const withIndex =
  async function* <T>(values: AsyncIterable<T>): AsyncGenerator<{ value: T, index: number }> {
    let index = 0
    for await (const value of values) {
      yield { value, index: index++ }
    }
  }
