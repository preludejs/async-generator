import * as G from './index.js'

test('withIndex', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.withIndex,
    G.array,
  )).resolves.toEqual([
    { index: 0, value: 1 },
    { index: 1, value: 2 },
    { index: 2, value: 3 },
    { index: 3, value: 4 },
    { index: 4, value: 5 }
  ])
})
