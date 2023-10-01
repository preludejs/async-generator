import * as G from './index.js'

test('every', async () => {
  await expect(G.pipe(
    G.range(1, 10),
    G.every(_ => _ % 2 === 0)
  )).resolves.toEqual(false)
  await expect(G.pipe(
    G.range(1, 10),
    G.every(_ => _ < 11)
  )).resolves.toEqual(true)
})
