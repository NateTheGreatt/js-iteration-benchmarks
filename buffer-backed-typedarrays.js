import fs from 'fs'
import path from 'path'
import { size, ticks, sizes } from './config.js'
import { Timer } from './Timer.js'

const parentArray = new Float32Array(sizes.at(-1)*3)

const f32objects = Array(sizes.at(-1)).fill(0).map((_,i)=>parentArray.subarray(i, i+3))

const timer = Timer()
const results = []

for (let j = 0; j < sizes.length; j++) {
  const size = sizes[j]
  for (let k = 0; k < ticks; k++) {
    for (let i = 0, l = size; i < l; i++) {
      const pos = f32objects[i]
      pos[0] += 1.23
      pos[1] += 1.23
      pos[2] += 1.23
    }
    timer.tick()
  }
  results.push({ size, time: timer.avg() })
}

const resultsFile = path.join('results',process.argv[1].split('/').at(-1).replace('.js', '.bench.json'))
fs.writeFileSync(resultsFile, JSON.stringify(results,null,2))