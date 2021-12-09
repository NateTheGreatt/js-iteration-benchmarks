import fs from 'fs'
import { sizes } from './config.js'
import { Worker } from 'worker_threads'

const files = fs.readdirSync('./cases')

const results = {}
let count = 0

files.forEach(file => {
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]
    const filePath = `./cases/${file}`
    const name = file.replace('.js','')

    const worker = new Worker('./worker.js', { workerData: { filePath, size } })
    
    worker.on('message', ({hz,ms}) => {
      if (!results[name]) results[name] = []
      results[name].push({ size, hz, ms })
      count += sizes.length
      if (count >= files.length * sizes.length) {
        results[name].sort((a,b) => a.size - b.size)
        fs.writeFileSync('./results.json', JSON.stringify(results,null,2))
      }
    })
  }
})
