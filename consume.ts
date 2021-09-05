const consume =
  async <T>(g: AsyncIterable<T>, f?: (value: T) => Promise<unknown>): Promise<void> => {
    for await (const _ of g) {
      if (f) {
        await f(_)
      }
    }
  }

export default consume
