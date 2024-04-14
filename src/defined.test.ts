import * as G from './index.js'

test('defined', async () => {
  await expect(G.pipe(
    G.ofIterable([1, undefined, 3, undefined, 5]),
    G.defined,
    G.array
  )).resolves.toEqual([1, 3, 5])
})
