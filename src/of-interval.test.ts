import * as G from './index.js'

test('interval', async () => {
  const r: [string, number][] = []
  const g = G.ofInterval(100)
  const f =
    async (name: string) => {
      for await (const { index } of g) {
        if (index >= 3) {
          break
        }
        r.push([ name, index ])
      }
    }
  f('a').catch(() => {
    // noop
  })
  f('b').catch(() => {
    // noop
  })
  f('c').catch(() => {
    // noop
  })
  await new Promise(resolve => setTimeout(resolve, 500))
  expect(r.length).toEqual(3)
})
