import * as G from './index.js'
import sleep from './sleep.js'

test('cargo', async () => {
  const interval = 100
  const ops: { op: '<-' | '->', indices: number[] }[] = []
  await G.pipe(
    G.ofInterval(interval),
    G.tap(({ index }) => void ops.push({ op: '<-', indices: [ index ] })),
    G.take(10),
    G.cargo(),
    G.consume(async values => {
      ops.push({ op: '->', indices: values.map(_ => _.index) })
      await sleep(210)
    })
  )
  expect(ops).toEqual([
    { op: '<-', indices: [ 0 ] },
    { op: '->', indices: [ 0 ] },
    { op: '<-', indices: [ 1 ] },
    { op: '<-', indices: [ 2 ] },
    { op: '->', indices: [ 1, 2 ] },
    { op: '<-', indices: [ 3 ] },
    { op: '<-', indices: [ 4 ] },
    { op: '->', indices: [ 3, 4 ] },
    { op: '<-', indices: [ 5 ] },
    { op: '<-', indices: [ 6 ] },
    { op: '->', indices: [ 5, 6 ] },
    { op: '<-', indices: [ 7 ] },
    { op: '<-', indices: [ 8 ] },
    { op: '->', indices: [ 7, 8 ] },
    { op: '<-', indices: [ 9 ] },
    { op: '->', indices: [ 9 ] }
  ])
})
