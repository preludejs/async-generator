/** @yields values from iterable. */
export async function* ofIterable<T>(values: Iterable<T> | Promise<Iterable<T>>) {
  for (const value of await Promise.resolve(values)) {
    yield await Promise.resolve(undefined).then(() => value)
  }
}
