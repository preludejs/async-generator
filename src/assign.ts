import { map } from './map.js'
import type { Transformer } from './prelude.js'

/** @returns transformer mutating values by assigning result of function. */
export function assign<T extends object, U>(f: (value: T, index: number) => U): Transformer<T, T & Awaited<U>> {
  return map(async function (value, index) {
    return Object.assign(value, await Promise.resolve(f(value, index)))
  })
}
