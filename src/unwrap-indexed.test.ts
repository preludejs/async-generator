import * as G from './index.js'

test('ordered', async () => {
  await expect(G.pipe(
    G.ofIterable([
      { index: 2, value: 'a' },
      { index: 0, value: 'b' },
      { index: 1, value: 'c' }
    ]),
    G.unwrapIndexed,
    G.array
  )).resolves.toEqual([
    'b',
    'c',
    'a'
  ])
})

test('ordered with invalid 0-based indices', async () => {
  await expect(G.pipe(
    G.ofIterable([
      { index: 1, value: 'a' },
      { index: 2, value: 'b' },
      { index: 3, value: 'c' }
    ]),
    G.unwrapIndexed,
    G.array
  )).rejects.toThrow('Invalid 0-based indices, didn\'t see index 0.')

  await expect(G.pipe(
    G.ofIterable([
      { index: 0, value: 'a' },
      { index: 1, value: 'b' },
      { index: 3, value: 'c' }
    ]),
    G.unwrapIndexed,
    G.array
  )).rejects.toThrow('Invalid 0-based indices, didn\'t see index 2.')
})
