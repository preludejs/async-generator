/**
 * Creates a transformer that filters out null and undefined values.
 *
 * @description
 * This function creates a transformer that removes all nullish values (null and undefined)
 * from an async iterable. It's a convenient way to clean data streams of empty values
 * without having to write a full filter predicate.
 *
 * The function performs a loose equality check using `value == null`, which catches
 * both `null` and `undefined`. The TypeScript return type is automatically narrowed
 * to exclude null and undefined using the `NonNullable<T>` utility type.
 *
 * @template T - The type of values in the async iterable
 * @param values - The async iterable to filter nullish values from
 * @returns An async generator that yields only non-null, non-undefined values
 *
 * @example
 * ```ts
 * // Remove nullish values from an array
 * const cleanedData = await G.pipe(
 *   G.ofIterable([1, null, 2, undefined, 3, null, 4]),
 *   G.compact,
 *   G.array
 * ); // [1, 2, 3, 4]
 *
 * // Clean data from an API response that might contain nulls
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string | null; // Optional email
 * }
 *
 * const validEmails = await G.pipe(
 *   G.ofIterable(users),
 *   G.map(user => user.email),
 *   G.compact, // Removes null emails
 *   G.array
 * ); // Only contains non-null email strings
 * ```
 */
export async function* compact<T>(values: AsyncIterable<T>): AsyncGenerator<NonNullable<T>> {
  for await (const value of values) {
    if (value == null) {
      continue
    }
    yield value as unknown as NonNullable<T>
  }
}
