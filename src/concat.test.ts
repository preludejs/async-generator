import * as G from './index.js'

test('concat', async () => {
  await expect(G.pipe(
    G.concat(
      G.ofIterable([ 1, 2, 3 ]),
      G.ofIterable([ 4, 5, 6 ]),
      G.ofIterable([ 7 ])
    ),
    G.array
  )).resolves.toEqual([ 1, 2, 3, 4, 5, 6, 7 ])
})
