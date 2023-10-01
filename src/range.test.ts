import * as G from './index.js'

test('range', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.array,
  )).resolves.toEqual([1, 2, 3, 4, 5])
  await expect(G.pipe(
    G.range(0, 0),
    G.array,
  )).resolves.toEqual([0])
  await expect(G.pipe(
    G.range(0, 10, 2),
    G.array,
  )).resolves.toEqual([0, 2, 4, 6, 8, 10])
})
