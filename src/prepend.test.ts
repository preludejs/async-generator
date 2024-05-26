import * as G from './index.js'

test('prepend', async () => {
  await expect(G.pipe(
    G.range(5, 10),
    G.prepend([ 2, 3, 4 ]),
    G.array
  )).resolves.toEqual([ 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
})
