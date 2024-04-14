import * as G from './index.js'

test('bigsum', async () => {
  await expect(G.pipe(
    G.ofIterable([1n, 3n, 5n]),
    G.bigsum
  )).resolves.toBe(9n)
})
