import * as G from './index.js'

test('assign', async () => {
  const values: { id: number, nextId: number, index: number }[] = await G.pipe(
    G.ofIterable([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]),
    G.assign((value, index) => ({ nextId: value.id + 1, index })),
    G.array
  )
  expect(values).toEqual([
    { id: 1, nextId: 2, index: 0 },
    { id: 2, nextId: 3, index: 1 },
    { id: 3, nextId: 4, index: 2 }
  ])
})

test('assign async', async () => {
  const values: { id: number, nextId: number, index: number }[] = await G.pipe(
    G.ofIterable([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]),
    G.assign(async (value, index) => ({ nextId: value.id + 1, index })),
    G.array
  )
  expect(values).toEqual([
    { id: 1, nextId: 2, index: 0 },
    { id: 2, nextId: 3, index: 1 },
    { id: 3, nextId: 4, index: 2 }
  ])
})
