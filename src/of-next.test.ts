import * as G from './index.js'

test('ofNext', async () => {
  await expect(G.pipe(
    G.ofNext(async i => ({ done: false, value: i ** 2 })),
    G.take(5),
    G.array,
  )).resolves.toEqual([ 0, 1, 4, 9, 16 ])
})
