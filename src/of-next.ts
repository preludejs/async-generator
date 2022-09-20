/** @yields values based on provided next function. */
export const ofNext =
  async function* <T>(next: (index: number) => Promise<IteratorResult<T>>): AsyncGenerator<T> {
    let index = 0
    while (true) {
      const { value, done } = await next(index++)
      if (done) {
        break
      }
      yield value
    }
  }
