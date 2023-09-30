import * as G from './index.js'

test('areUnique', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3 ]),
    G.areUnique()
  )).resolves.toBe(true)
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 2, 3 ]),
    G.areUnique()
  )).resolves.toBe(false)
})
