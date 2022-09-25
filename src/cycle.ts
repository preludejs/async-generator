/** @yields infinitely cycled values or nothing if values were empty. */
export async function* cycle<T>(values: AsyncIterable<T>) {
  const seen: T[] = []
  for await (const value of values) {
    seen.push(value)
    yield value
  }
  if (seen.length === 0) {
    return
  }
  while (true) {
    yield* seen
  }
}
