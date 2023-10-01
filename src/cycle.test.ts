import * as G from './index.js'

test('cycle', async () => {
  await expect(G.pipe(
    G.range(1, 2),
    G.cycle(3),
    G.array
  )).resolves.toEqual([
    1, 2, 1, 2, 1, 2
  ])
})

test('cycle 0 times', async () => {
  await expect(G.pipe(
    G.range(1, 2),
    G.cycle(0),
    G.array
  )).resolves.toEqual([])
})

test('cycle on no values', async () => {
  await expect(G.pipe(
    G.ofIterable([]),
    G.cycle(3),
    G.array
  )).resolves.toEqual([])
})
