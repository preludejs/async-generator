import * as G from './index.js'
import sleep from './sleep.js'

test('map', async () => {
  await expect(G.pipe(
    G.ofIterable([ 1, 2, 3 ]),
    G.map(x => String(x * 2)),
    G.array
  )).resolves.toEqual(expect.arrayContaining([ '2', '4', '6' ]))
})

test('concurrent map', async () => {
  const before = Date.now()
  await expect(G.pipe(
    G.range(1, 9),
    G.map(async value => {
      await sleep(100)
      return String(value * 2)
    }, { concurrency: 3 }),
    G.array
  )).resolves.toEqual([ '2', '4', '6', '8', '10', '12', '14', '16', '18' ])
  const duration = Date.now() - before
  const expectedDuration = 300
  const tolerance = 50
  expect(Math.abs(duration - expectedDuration)).toBeLessThan(tolerance)
})
