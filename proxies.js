import path from 'path'
import fs from 'fs'
import { size, ticks, sizes } from './config.js'
import { Timer } from './Timer.js'

const store = {
  x: new Float32Array(sizes.at(-1)),
  y: new Float32Array(sizes.at(-1)),
  z: new Float32Array(sizes.at(-1))
}

class Vec3Proxy {
  constructor(store,eid=0) {
    this.store = store
    this.eid = eid
  }
  get x () { return this.store.x[this.eid] }
  get y () { return this.store.y[this.eid] }
  get z () { return this.store.z[this.eid] }

  set x (v) { this.store.x[this.eid] = v }
  set y (v) { this.store.y[this.eid] = v }
  set z (v) { this.store.z[this.eid] = v }
}

const proxies = Array(sizes.at(-1)).fill(0).map(()=>new Vec3Proxy(store))

const timer = Timer()
const results = []

for (let j = 0; j < sizes.length; j++) {
  const size = sizes[j]
  for (let k = 0; k < ticks; k++) {
    for (let i = 0, l = size; i < l; i++) {
      const pos = proxies[i]
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