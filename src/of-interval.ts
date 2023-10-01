import * as Ch from '@prelude/channel'

/** @yields values periodically every milliseconds interval. */
export async function* ofInterval(milliseconds: number): AsyncGenerator<{ generatedAt: Date, yieldedAt: Date, index: number }> {
  const ch = Ch.of<Date>(Infinity)
  const intervalId =
    setInterval(() => {
      if (ch.done) {
        clearInterval(intervalId)
        return
      }
      ch.writeIgnore(new Date())
    }, milliseconds)
  let index = 0
  try {
    for await (const generatedAt of ch) {
      yield { generatedAt, yieldedAt: new Date, index: index++ }
    }
  } finally {
    clearInterval(intervalId)
    ch.close()
  }
}
