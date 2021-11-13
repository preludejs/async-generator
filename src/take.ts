const take =
  async function *<T>(n: number, g: AsyncIterable<T>): AsyncGenerator<T> {
    if (n <= 0) {
      return
    }
    const g_ = g[Symbol.asyncIterator]()
    let next
    for (let i = 0, next = await g_.next(); i < n && !next.done; i++, next = await g_.next()) {
      yield next.value
    }
    return next.done ?
      next.value :
      await g_.return?.(undefined)
  }

export default take
