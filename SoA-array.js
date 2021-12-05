import path from 'path'
import fs from 'fs'
import { size, sizes, ticks } from './config.js'
import { Timer } from './Timer.js'

const PositionArrays = {
	x: Array(sizes.at(-1)).fill(0),
	y: Array(sizes.at(-1)).fill(0),
	z: Array(sizes.at(-1)).fill(0)
}

const timer = Timer()
const results = []

for (let j = 0; j < sizes.length; j++) {
  const size = sizes[j]
  for (let k = 0; k < ticks; k++) {
    for (let i = 0, l = size; i < l; i++) {
      PositionArrays.x[i] += 1.23
      PositionArrays.y[i] += 1.23
      PositionArrays.z[i] += 1.23
    }
    timer.tick()
  }
  results.push({ size, time: timer.avg() })
}

const resultsFile = path.join('results',process.argv[1].split('/').at(-1).replace('.js', '.bench.json'))
fs.writeFileSync(resultsFile, JSON.stringify(results,null,2))