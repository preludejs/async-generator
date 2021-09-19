const compact =
  async function *<T>(g: AsyncIterable<T>): AsyncGenerator<NonNullable<T>> {
    for await (const _ of g) {
      if (_ != null) {
        yield _ as NonNullable<T>
      }
    }
  }

export default compact
