import * as G from './index.js'

test('count', async () => {
  await expect(G.pipe(
    G.range(1, 10),
    G.count(_ => _ % 2 === 0)
  )).resolves.toEqual(5)
})
