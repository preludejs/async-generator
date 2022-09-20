import type { AsyncIterated } from './prelude.js'

/** @yields flattened values. */
export const concat =
  async function *<Gs extends AsyncIterable<unknown>[]>(...valuesArray: Gs): AsyncGenerator<AsyncIterated<Gs[number]>> {
    for (const values of valuesArray) {
      for await (const value of values) {
        yield value as AsyncIterated<Gs[number]>
      }
    }
  }
