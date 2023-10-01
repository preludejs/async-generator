/** @yields values at index where modulo is zero. */
export function step<T>(step_: number) {
  if (step_ < 1) {
    throw new RangeError(`Expected step to be greater than zero, got ${step_}.`)
  }
  if (!Number.isSafeInteger(step_)) {
    throw new RangeError(`Expected step to be a safe integer, got ${step_}.`)
  }
  return async function* (values: AsyncIterable<T>): AsyncGenerator<T> {
    let i = 0
    for await (const value of values) {
      if (i === 0) {
        yield value
      }
      if (++i === step_) {
        i = 0
      }
    }
  }
}
