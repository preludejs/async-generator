import * as G from './index.js'

test('take without return', async () => {
  const g = G.of([ 1, 2, 3, 4, 5, 6, 7 ])
  await expect(G.array(G.take(3, g, { return: false }))).resolves.toEqual([ 1, 2, 3 ])
  await expect(G.array(G.take(2, g, { return: false }))).resolves.toEqual([ 4, 5 ])
  await expect(G.array(G.take(3, g, { return: false }))).resolves.toEqual([ 6, 7 ])
  await expect(G.array(G.take(3, g, { return: false }))).resolves.toEqual([])
})

test('take with default return', async () => {
  const g = G.of([ 1, 2, 3, 4, 5, 6, 7 ])
  await expect(G.array(G.take(3, g))).resolves.toEqual([ 1, 2, 3 ])
  await expect(G.array(G.take(2, g))).resolves.toEqual([])
})
