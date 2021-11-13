const of =
  async function *<T>(g: Iterable<T>): AsyncGenerator<T> {
    for (const value of g) {
      yield value
    }
  }

export default of
