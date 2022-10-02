import * as G from './index.js'

test('cycle', async () => {
  await expect(G.pipe(
    G.yield(42),
    G.cycle(3),
    G.array
  )).resolves.toEqual([
    42, 42, 42
  ])
})
