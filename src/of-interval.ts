import * as Ch from '@prelude/channel'

/** @yields values periodically every milliseconds interval. */
export const ofInterval =
  async function* (milliseconds: number) {
    const ch = Ch.of<Date>(Infinity)
    const intervalId = setInterval(() => {
      if (ch.done) {
        clearInterval(intervalId)
        return
      }
      Ch.write(ch, new Date())
    }, milliseconds)
    let index = 0
    for await (const generatedAt of ch) {
      yield { generatedAt, yieldedAt: new Date, index: index++ }
    }
  }
