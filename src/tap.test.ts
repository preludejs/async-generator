import * as G from './index.js'
import sleep from './sleep.js'

test('concurrent', async () => {
  let taps = 0
  await expect(G.pipe(
    G.ofInterval(100),
    G.tap(async () => {
      await sleep(Math.random() * 10) // NOSONAR
      taps++
    }, { concurrency: 10 }),
    G.map(_ => _.index),
    G.take(20),
    G.array
  )).resolves.toEqual(Array.from({ length: 20 }, (_, i) => i))
  expect(taps).toBe(20)
})
