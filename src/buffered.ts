import * as Ch from '@prelude/channel'

/** Buffers values. */
export function buffered<T>(cap: number) {
  return async function* (values: AsyncIterable<T>) {
    yield* Ch.ofAsyncIterable(values, cap)
  }
}
