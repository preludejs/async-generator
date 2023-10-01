/** @yields numbers from `start` to `end` inclusive. */
export const range =
  async function* (start: number, end: number, step?: number): AsyncGenerator<number> {
    const step_ = step ?? (end >= start ? 1 : -1)
    for (let value = start; step_ >= 0 ? value <= end : value >= end; value += step_) {
      yield value
    }
  }

export default range
