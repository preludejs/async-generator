import * as G from './index.js'

test('bigproduct', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1n, 3n, 5n ]),
    G.bigproduct
  )).resolves.toBe(15n)
})
