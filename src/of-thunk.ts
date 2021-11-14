const ofThunk =
  <T>(f: (index: number) => Promise<IteratorResult<T>>): AsyncIterable<T> => {
    return {
      [Symbol.asyncIterator]() {
        let index = 0
        return {
          async next() {
            return f(index++)
          }
        }
      }
    }
  }

export default ofThunk
