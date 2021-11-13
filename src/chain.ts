import type { AsyncIterated } from './prelude.js'

const chain =
  async function *<Gs extends AsyncIterable<unknown>[]>(...gs: Gs): AsyncGenerator<AsyncIterated<Gs[number]>> {
    for (const g of gs) {
      for await (const _ of g) {
        yield _ as AsyncIterated<Gs[number]>
      }
    }
  }

export default chain
