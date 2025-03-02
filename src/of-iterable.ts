/**
 * Creates an async generator from a synchronous iterable.
 *
 * @description
 * This function converts any synchronous iterable (like arrays, sets, or maps) into
 * an async generator. It can handle both direct iterables and promises that resolve to
 * iterables. This is useful as an entry point to begin an async generator pipeline.
 *
 * The function ensures proper asynchronous behavior by yielding each value after a
 * microtask delay, allowing other promises in the event loop to be processed between
 * yielded values.
 *
 * @template T - The type of values in the iterable
 * @param values - The synchronous iterable or promise of an iterable to convert
 * @returns An async generator that yields the values from the input iterable
 *
 * @example
 * ```ts
 * // Convert an array to an async generator
 * const generator = await G.pipe(
 *   G.ofIterable([1, 2, 3]),
 *   G.map(x => x * 2),
 *   G.array
 * ); // [2, 4, 6]
 *
 * // Handle a promise that resolves to an iterable
 * const fetchData = async () => {
 *   const response = await fetch('https://api.example.com/data');
 *   return await response.json(); // Returns an array
 * };
 *
 * const processedData = await G.pipe(
 *   G.ofIterable(fetchData()),
 *   G.filter(item => item.isValid),
 *   G.map(item => transformItem(item)),
 *   G.array
 * );
 * ```
 */
export async function* ofIterable<T>(values: Iterable<T> | Promise<Iterable<T>>) {
  for (const value of await Promise.resolve(values)) {
    yield await Promise.resolve(undefined).then(() => value)
  }
}
