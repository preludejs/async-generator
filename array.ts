const array =
  async <T>(g: AsyncIterable<T>): Promise<T[]> => {
    const _s: T[] = []
    for await (const _ of g) {
      _s.push(_)
    }
    return _s
  }

export default array
