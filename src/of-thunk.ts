const ofThunk =
  <T>(f: (index: number) => Promise<IteratorResult<T>>): AsyncGenerator<T> => {
    let index = 0
    let result: undefined | IteratorResult<T>
    const g: AsyncGenerator<T> = {
      async next() {
        if (result?.done) {
          return result
        }
        result = await f(index++)
        return result
      },
      async return(value?: unknown) {
        if (result?.done) {
          return result
        }
        result = { done: true, value }
        return result
      },
      async throw(_err: unknown) {
        return this.return(_err)
      },
      [Symbol.asyncIterator]() {
        return g
      }
    }
    return g
  }

export default ofThunk
