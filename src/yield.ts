/** @returns producer yielding value once. */
async function* yield_<T>(value: T | Promise<T>): AsyncGenerator<T> {
  yield await Promise.resolve(value)
}

export { yield_ as yield }
