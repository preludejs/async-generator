import * as G from './index.js'

test('sum', async () => {
  await expect(G.sum(G.ofIterable([1, 2, 3]))).resolves.toBe(6)
})
