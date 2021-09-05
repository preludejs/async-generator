const interval =
  (milliseconds: number): AsyncIterable<{ iteration: number, skipped: number }> => {
    return {
      [Symbol.asyncIterator]() {
        let iteration = 0
        let skipped = 0
        let resolve: undefined | ((result: IteratorYieldResult<{ iteration: number, skipped: number }>) => void)
        const id = setInterval(() => {
          iteration++
          if (resolve) {
            resolve({ value: { iteration, skipped } })
            resolve = undefined
          } else {
            skipped++
          }
        }, milliseconds)
        return {
          async next() {
            return new Promise(_ => {
              resolve = _
            })
          },
          async return() {
            clearInterval(id)
            return Promise.resolve({ value: undefined, done: true })
          },
          async throw(err: unknown) {
            clearInterval(id)
            throw err
          }
        }
      }
    }
  }

export default interval
