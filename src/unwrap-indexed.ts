/** @yields values in order based on index. */
export async function* unwrapIndexed<T>(values: AsyncIterable<{ value: T, index: number }>): AsyncGenerator<T> {
  const map = new Map<number, T>()
  let j = 0
  for await (const { index, value } of values) {
    map.set(index, value)
    while (map.has(j)) {
      yield map.get(j) as T
      map.delete(j)
      j++
    }
  }
  if (map.size) {
    throw new Error(`Invalid 0-based indices, didn't see index ${j}.`)
  }
}

export default unwrapIndexed
