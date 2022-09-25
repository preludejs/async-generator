import type { AsyncIterated } from './prelude.js'

/** @yields values from concatenated async iterables. */
export async function* concat<Gs extends AsyncIterable<unknown>[]>(...valuesArray: Gs): AsyncGenerator<AsyncIterated<Gs[number]>> {
  for (const values of valuesArray) {
    for await (const value of values) {
      yield value as AsyncIterated<Gs[number]>
    }
  }
}
