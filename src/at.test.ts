import * as G from './index.js'

test('at', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3 ]),
    G.at(1)
  )).resolves.toBe(2)
})
