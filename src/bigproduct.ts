/** Calculates product of bigint values. */
export async function bigproduct(values: AsyncIterable<bigint>) {
  let result = 1n
  for await (const value of values) {
    result *= value
  }
  return result
}

export default bigproduct
