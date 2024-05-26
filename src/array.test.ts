import * as G from './index.js'

test('array', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.array
  )).resolves.toEqual([ 1, 2, 3, 4, 5 ])
})
