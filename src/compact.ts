/** @yields non-nullish values. */
export async function* compact<T>(values: AsyncIterable<T>): AsyncGenerator<NonNullable<T>> {
  for await (const value of values) {
    if (value == null) {
      continue
    }
    yield value as unknown as NonNullable<T>
  }
}
