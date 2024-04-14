import type { Defined } from './prelude.js'

/**
 * @yields defined values, `undefined` values are filtered out.
 *
 * @see compact
 */
export async function *defined<T>(values: AsyncIterable<T>): AsyncGenerator<Defined<T>> {
  for await (const value of values) {
    if (value === undefined) {
      continue
    }
    yield value as Defined<T>
  }
}

export default defined
