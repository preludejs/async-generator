import * as Ch from '@prelude/channel'

/** Buffers values. */
export const buffered =
  <T>(cap: number) =>
    async function* (values: AsyncIterable<T>) {
      yield* Ch.ofAsyncIterable(values, cap)
    }
