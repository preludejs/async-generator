/** @yields values in order based on index. */
export const ordered =
  async function* <T>(values: AsyncIterable<{ value: T, index: number }>): AsyncGenerator<T> {
    const map = new Map<number, T>
    let j = 0
    for await (const { value, index } of values) {
      map.set(index, value)
      while (map.has(j)) {
        yield map.get(j) as T
        map.delete(j)
        j++
      }
    }
  }
