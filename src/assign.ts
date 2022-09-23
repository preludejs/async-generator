import { map } from './map.js'

/** Performs `Object.assign(...)` on values. */
export function assign<T extends {}, U>(f: (value: T, index: number) => U) {
  return map<T, T & U>(async function (value, index) {
    return Object.assign(value, await Promise.resolve(f(value, index)))
  })
}
