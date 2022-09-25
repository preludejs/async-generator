
/**
 * `true` if values are unique, `false` otherwise.
 * Optional value to key mapping function can be provided.
 */
export function areUnique<T, K = T>(f?: (value: T) => K | Promise<K>) {
  return async function(values: AsyncIterable<T>) {
    const set = new Set<unknown>
    const g = f ?? (_ => _)
    for await (const value of values) {
      const key = await Promise.resolve(g(value))
      if (set.has(key)) {
        return false
      }
      set.add(key)
    }
    return true
  }
}
