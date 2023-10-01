import type { Transformer } from './prelude.js'

async function* cycleZero(values: AsyncIterable<unknown>) {
  for await (const _value of values) {
    return
  }
}

/** @returns transformer cycling through values n times (defaults to infinity). */
export function cycle<T>(n = Infinity): Transformer<T> {
  if (n <= 0) {
    return cycleZero
  }
  return async function* (values) {
    const seen: T[] = []
    for await (const value of values) {
      seen.push(value)
      yield value
    }
    if (seen.length === 0) {
      return
    }
    for (let i = 1; i < n; i++) {
      yield* seen
    }
  }
}
