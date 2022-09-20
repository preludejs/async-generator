import * as G from './index.js'

test('take without return', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3, 4 ]),
    G.take(2),
    G.array
  )).resolves.toEqual([
    1, 2
  ])
})
