import type { Transformer } from './prelude.js'

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Jitters values in time.
 *
 * @param jitter_ The jitter in milliseconds.
 *
 * */
export function jitter<T>(jitter_: number, delay = 0): Transformer<T> {
  return async function* (values) {
    for await (const value of values) {
      await sleep(delay + Math.random() * jitter_)
      yield value
    }
  }
}
