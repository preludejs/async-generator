import * as G from './index.js'

test('compact', async () => {
  await expect(G.pipe(
    G.ofIterable([1, null, 2, 3, null, 4, 5]),
    G.compact,
    G.array,
  )).resolves.toEqual([1, 2, 3, 4, 5])
})
