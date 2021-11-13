const ofPromise =
  async function *<T>(g: Promise<Iterable<T>>): AsyncGenerator<T> {
    for (const value of await g) {
      yield value
    }
  }

export default ofPromise
