const map =
  async function *<T, R>(g: AsyncIterable<T>, f: (value: T, index: number) => Promise<R>): AsyncGenerator<R> {
    let i = 0
    for await (const _ of g) {
      yield await f(_, i++)
    }
  }

export default map
