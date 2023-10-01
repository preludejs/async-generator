import * as G from './index.js'

test('filter', async () => {
  await expect(G.pipe(
    G.range(1, 10),
    G.filter(_ => _ % 2 === 0),
    G.array,
  )).resolves.toEqual([2, 4, 6, 8, 10])
})
