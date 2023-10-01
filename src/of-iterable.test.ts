import * as G from './index.js'

test('ofIterable', async () => {
  await expect(G.pipe(
    G.ofIterable([1, 2, 3]),
    G.array,
  )).resolves.toEqual([1, 2, 3])
})
