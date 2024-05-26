import * as G from './index.js'

test('sum', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3 ]),
    G.sum
  )).resolves.toBe(6)
})
