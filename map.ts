const map =
  async function *<T, R>(f: (value: T, index: number) => Promise<R>, g: AsyncIterable<T>): AsyncGenerator<R> {
    let i = 0
    for await (const _ of g) {
      yield await f(_, i++)
    }
  }

export default map
