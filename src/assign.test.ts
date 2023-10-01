import * as G from './index.js'

test('assign', async () => {
  await expect(G.pipe(
    G.ofIterable([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]),
    G.assign((value, index) => ({ nextId: value.id + 1, index })),
    G.array
  )).resolves.toEqual([
    { id: 1, nextId: 2, index: 0 },
    { id: 2, nextId: 3, index: 1 },
    { id: 3, nextId: 4, index: 2 }
  ])
})
