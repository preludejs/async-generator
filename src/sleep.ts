/**
 * Creates a promise that resolves after a specified delay.
 *
 * @param milliseconds - The time to delay in milliseconds
 * @returns A promise that resolves after the specified delay
 *
 * @example
 * ```ts
 * // Delay execution for 1 second
 * await sleep(1000);
 * ```
 */
export default function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
