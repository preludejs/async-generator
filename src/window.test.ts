import * as G from './index.js'

test('window', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.window(2),
    G.array
  )).resolves.toEqual([
    [ 1, 2 ],
    [ 2, 3 ],
    [ 3, 4 ],
    [ 4, 5 ]
  ])
})
