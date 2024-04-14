/** @returns an array of collected values. */
export async function array<T>(values: AsyncIterable<T>) {
  const result: T[] = []
  for await (const value of values) {
    result.push(value)
  }
  return result
}

export default array
