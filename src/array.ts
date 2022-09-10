/** @returns an array of collected values. */
const array =
  async <T>(values: AsyncIterable<T>): Promise<T[]> => {
    const result: T[] = []
    for await (const value of values) {
      result.push(value)
    }
    return result
  }

export default array
