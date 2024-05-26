import * as G from './index.js'

test('step', async () => {
  await expect(G.pipe(
    G.range(1, 5),
    G.step(2),
    G.array
  )).resolves.toEqual([ 1, 3, 5 ])
  expect(() => G.step(0)).toThrow('Expected step to be greater than zero, got 0.')
  expect(() => G.step(1.5)).toThrow('Expected step to be a safe integer, got 1.5.')
})
