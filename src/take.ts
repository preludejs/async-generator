const take =
  async function *<T>(
    n: number,
    g: AsyncIterable<T>,
    { return: return_ = true }: { return?: boolean } = {}
  ): AsyncGenerator<T> {
    const g_ = g[Symbol.asyncIterator]()
    let _: undefined | IteratorResult<T>
    const maybeReturn =
      async () => {
        if (return_ && !_?.done) {
          await g_.return?.()
        }
      }
    for (let i = 0; i < n; i++) {
      _ = await g_.next()
      if (_.done) {
        break
      }
      try {
        yield _.value
      } catch (err: unknown) {
        await maybeReturn()
        throw err
      }
    }
    await maybeReturn()
  }

export default take
