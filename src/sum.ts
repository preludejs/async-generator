
/** Sums all numeric values. */
export async function sum(values: AsyncIterable<number>) {
  let result = 0
  for await (const value of values) {
    result += value
  }
  return result
}

export default sum
