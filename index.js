import { exec, execSync, spawn, spawnSync } from 'child_process'

const files = [
  'SoA-array.js',
  'SoA-typed.js',
  'objects.js',
  'buffer-backed-typedarrays.js',
  'typedarray-objects.js',
  'proxies.js',
  'flyweight.js',
]

files.forEach(file => {
  spawn('node', [file], { stdio: 'inherit' })
})

