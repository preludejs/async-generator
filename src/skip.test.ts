import * as G from './index.js'

test('skip', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.skip(2),
    G.array,
  )).resolves.toEqual([3, 4, 5])
})
