import * as G from './index.js'

test('batch', async () => {
  const groupSize = 3
  const interval = 100
  const results: { consumedAt: Date, values: { generatedAt: Date, yieldedAt: Date, index: number }[] }[] = []
  await G.pipe(
    G.ofInterval(interval),
    G.take(10),
    G.batch(groupSize),
    G.consume(values => results.push({ consumedAt: new Date, values }))
  )
  const tolerance = 50
  for (let i = 1; i < results.length; i++) {
    const previousResult = results[i - 1]
    const result = results[i]
    const difference = result.consumedAt.getTime() - previousResult.consumedAt.getTime()
    const expectedDifference = interval * result.values.length
    expect(Math.abs(difference - expectedDifference)).toBeLessThan(tolerance)
  }
})
