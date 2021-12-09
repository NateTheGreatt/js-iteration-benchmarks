// adaptation of https://github.com/noctjs/ecs-benchmark/blob/master/src/bench_worker.js

import { performance } from "perf_hooks"
import { parentPort, workerData } from "worker_threads"
import { pathToFileURL } from "url"

const { now } = performance

const benchmark = (fn, count) => {
  const then = now()
  for (let i = 0; i < count; i++) fn()
  return now() - then
}

const filePath = workerData.filePath

const init = await import(pathToFileURL(filePath)).then(m=>m.default)

const fn = init(workerData.size)

let n = 1
let ms = 0
let totalElapsed = 0

const t = 5000

while (totalElapsed < t) {
  const elapsed = benchmark(fn, n)
  ms = elapsed / n
  n *= 2
  totalElapsed += elapsed
}

const target = t / ms
const total = benchmark(fn, target)

parentPort.postMessage({
  hz: ((target / total) * 1000).toFixed(2), // ops/sec
  ms: total / target, // ms/op
})
