import * as G from './index.js'

test('yield', async () => {

  await expect(G.pipe(
    G.ofIterable([ 3, 5, 7 ]),
    G.reduce((r, _) => r + _, 0),
    G.yield,
    G.cycle(2),
    G.array
  )).resolves.toEqual([
    15,
    15
  ])
})
