import path from 'path'
import fs from 'fs'
import { size, ticks, sizes } from './config.js'
import { Timer } from './Timer.js'

class PositionClass {
  constructor(x=0,y=0,z=0) {
  	this.x = x
    this.y = y
    this.z = z
  }
}

const objects = Array(sizes.at(-1)).fill(0).map(()=>new PositionClass())

const timer = Timer()
const results = []

for (let j = 0; j < sizes.length; j++) {
  const size = sizes[j]
  for (let k = 0; k < ticks; k++) {
    for (let i = 0, l = size; i < l; i++) {
      const pos = objects[i]
      pos.x += 1.23
      pos.y += 1.23
      pos.z += 1.23
    }
    timer.tick()
  }
  results.push({ size, time: timer.end() })
}

const resultsFile = path.join('results',process.argv[1].split('/').at(-1).replace('.js', '.bench.json'))
fs.writeFileSync(resultsFile, JSON.stringify(results,null,2))