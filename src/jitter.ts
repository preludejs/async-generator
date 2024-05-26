import type { Transformer } from './prelude.js'
import sleep from './sleep.js'

/** Jitters values in time. */
export function jitter<T>(jitter_: number, delay = 0): Transformer<T> {
  return async function* (values) {
    for await (const value of values) {
      yield value
      await sleep(delay + (Math.random() * jitter_))
    }
  }
}
