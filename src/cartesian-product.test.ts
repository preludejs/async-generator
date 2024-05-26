import * as G from './index.js'

test('cartesianProduct', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3 ]),
    G.cartesianProduct(G.ofIterable([ 4, 5, 6 ])),
    G.array
  )).resolves.toEqual([
    [ 1, 4 ],
    [ 1, 5 ],
    [ 1, 6 ],
    [ 2, 4 ],
    [ 2, 5 ],
    [ 2, 6 ],
    [ 3, 4 ],
    [ 3, 5 ],
    [ 3, 6 ]
  ])
})
