export const Timer = () => {
  const time = {
    then: performance.now(),
    now: performance.now(),
    delta: 0,
    elapsed: 0,
    ticks: 0,
    start: () => {
      time.then = performance.now()
      time.now = performance.now()
    },
    tick: () => {
      time.now = performance.now()
      time.delta = time.now - time.then
      time.elapsed += time.delta
      time.then = time.now
      time.ticks++
    },
    end: () => time.elapsed / time.ticks
  }

  return time
}
