import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'

/** @returns transformer that buffers values using provided capacity. */
export function buffered<T>(cap: number): Transformer<T> {
  return async function* (values) {
    yield* Ch.ofAsyncIterable(values, cap)
  }
}
