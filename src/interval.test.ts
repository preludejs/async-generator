import * as G from './index.js'

test('interval', async () => {
  const r: [string, number][] = []
  const g = G.interval(1000)
  const f =
    async (name: string) => {
      let i = 0
      for await (const _ of g) {
        r.push([name, i])
        if (++i === 3) {
          return
        }
      }
    }
  f('a')
  f('b')
  f('c')
  await new Promise(resolve => setTimeout(resolve, 3500))
  expect(r.filter(_ => _[0] === 'a')).toEqual([['a', 0], ['a', 1], ['a', 2]])
  expect(r.filter(_ => _[0] === 'b')).toEqual([['b', 0], ['b', 1], ['b', 2]])
  expect(r.filter(_ => _[0] === 'c')).toEqual([['c', 0], ['c', 1], ['c', 2]])
  expect(r.length).toEqual(3 * 3)
})
