import * as Ch from '@prelude/channel'
import type { Transformer } from './prelude.js'
import unwrapIndexed from './unwrap-indexed.js'
import withIndex from './with-index.js'

type F<T, U> = (value: T, index: number, worker: number) => U | Promise<U>

function serial<T, U>(f: F<T, U>) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    for await (const value of values) {
      yield await Promise.resolve(f(value, index++, 0))
    }
  }
}

function unordered<T, U>(f: F<T, U>, concurrency: number) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable(values)
    const output = Ch.of<U>()
    Promise
      .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of input) {
          await output.write(await Promise.resolve(f(value, index++, worker)))
        }
      }))
      .finally(() => {
        output.closeWriting()
      })
    yield* output
  }
}

function ordered<T, U>(f: F<T, U>, concurrency: number) {
  return async function* (values: AsyncIterable<T>) {
    let index = 0
    const input = Ch.ofAsyncIterable(withIndex(values))
    const output = Ch.of<{ index: number, value: U }>()
    Promise
      .allSettled(Array.from({ length: concurrency }, async (_, worker) => {
        for await (const value of input) {
          await output.write({
            index: value.index,
            value: await Promise.resolve(f(value.value, index++, worker))
          })
        }
      }))
      .finally(() => {
        output.closeWriting()
      })
    yield* unwrapIndexed(output)
  }
}

export function map<T, U>(f: F<T, U>, { concurrency = 1, preserveOrder = true }: {
  concurrency?: number,
  preserveOrder?: boolean
} = {}): Transformer<T, U> {
  if (concurrency === 1) {
    return serial(f)
  }
  if (!preserveOrder) {
    return unordered(f, concurrency)
  }
  return ordered(f, concurrency)
}
