const take =
  async function *<T>(n: number, g: AsyncIterable<T>): AsyncGenerator<T> {
    const g_ = g[Symbol.asyncIterator]()
    for (let i = 0; i < n; i++) {
      const { done, value } = await g_.next()
      if (done) {
        break
      }
      yield value
    }
  }

export default take
