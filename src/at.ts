export function at<T>(index: number) {
  if (index < 0) {
    throw new Error(`expected non-negative index, got ${index}`)
  }
  if (!Number.isSafeInteger(index)) {
    throw new Error(`expected safe integer index, got ${index}`)
  }
  return async function (values: AsyncIterable<T>) {
    let i = 0
    for await (const value of values) {
      if (i++ === index) {
        return value
      }
    }
    throw new Error(`index ${index} out of bounds`)
  }
}

export default at
