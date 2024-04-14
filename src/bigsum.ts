/** Calculates sum of bigint values. */
export async function bigsum(values: AsyncIterable<bigint>) {
  let result = 0n
  for await (const value of values) {
    result += value
  }
  return result
}

export default bigsum
