import * as G from './index.js'

test('some', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.some(_ => _ > 3)
  )).resolves.toBe(true)
  await expect(G.pipe(
    G.range(1, 5),
    G.some(_ => _ > 5)
  )).resolves.toBe(false)
})
