import * as G from './index.js'

test('append', async () => {
  await expect(G.pipe(
    G.ofIterable([ 3, 4 ]),
    G.append([ 5, 6 ]),
    G.array
  )).resolves.toEqual([ 3, 4, 5, 6 ])
})
