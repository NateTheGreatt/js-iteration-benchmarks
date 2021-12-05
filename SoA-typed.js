import path from 'path'
import fs from 'fs'
import { size, ticks, sizes } from './config.js'
import { Timer } from './Timer.js'

const Position = {
	x: new Float32Array(sizes.at(-1)),
	y: new Float32Array(sizes.at(-1)),
	z: new Float32Array(sizes.at(-1))
}

const timer = Timer()
const results = []

for (let j = 0; j < sizes.length; j++) {
  const size = sizes[j]
  for (let k = 0; k < ticks; k++) {
    for (let i = 0, l = size; i < l; i++) {
      Position.x[i] += 1.23
      Position.y[i] += 1.23
      Position.z[i] += 1.23
    }
    timer.tick()
  }
  results.push({ size, time: timer.end() })
}

const resultsFile = path.join('results',process.argv[1].split('/').at(-1).replace('.js', '.bench.json'))
fs.writeFileSync(resultsFile, JSON.stringify(results,null,2))