import path from 'path'
import fs from 'fs'
import { size, sizes, ticks } from './config.js'
import { Timer } from './Timer.js'

class Vec3 extends Float32Array {
  constructor(x=0,y=0,z=0) {
    super(3)
    this[0] = x
    this[1] = y
    this[2] = z
  }
}

const f32objects = Array(sizes.at(-1)).fill(0).map(()=>new Vec3())

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
  results.push({ size, time: timer.end() })
}

const resultsFile = path.join('results',process.argv[1].split('/').at(-1).replace('.js', '.bench.json'))

fs.writeFileSync(resultsFile, JSON.stringify(results,null,2))