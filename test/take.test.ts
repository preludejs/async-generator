import * as G from '../cjs/index.js'

test('take', async () => {
  const g = G.of([ 1, 2, 3, 4, 5, 6, 7 ])
  await expect(G.array(G.take(3, g))).resolves.toEqual([ 1, 2, 3 ])
  await expect(G.array(G.take(2, g))).resolves.toEqual([ 4, 5 ])
  await expect(G.array(G.take(3, g))).resolves.toEqual([ 6, 7 ])
  await expect(G.array(G.take(3, g))).resolves.toEqual([])
})
