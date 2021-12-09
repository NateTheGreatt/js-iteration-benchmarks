import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import Numbers from 'human-readable-numbers'
import chroma from 'chroma-js'
import { sizes } from './config.js'
import fs from 'fs'

const results = JSON.parse(fs.readFileSync('./results.json', { encoding: 'utf-8' }))

const names = Object.keys(results)
const benchHz = names.map(name => results[name].map(({hz})=>hz))
const benchMs = names.map(name => results[name].map(({ms})=>ms))

// console.log(benchHz)

const zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
const hzZipped = zip([names, benchHz])
const msZipped = zip([names, benchMs])

const scale = chroma.scale('Accent')
  .domain([0, hzZipped.length])
  .padding(1)

let min = Number.MAX_SAFE_INTEGER
let max = 0

const msDatasets = msZipped.map(([label, ms], i) => {
  const color = scale(i).hex()
  ms.forEach(d => {
    if (d < min) min = d
    if (d > max) max = d
  })
  return {
    label,
    data: ms,
    fill: false, 
    pointRadius: 1, 
    borderColor: color, 
    backgroundColor: color, 
    borderWidth: 1
  }
})

const hzDatasets = hzZipped.map(([label, hz], i) => {
  const color = scale(i).hex()
  hz.forEach(d => {
    if (d < min) min = d
    if (d > max) max = d
  })
  return {
    label,
    data: hz,
    fill: false, 
    pointRadius: 1,
    borderColor: color, 
    backgroundColor: color, 
    borderWidth: 1
  }
})

min = (Math.floor(min * 10000) / 10000)
max = (Math.ceil(max * 10000) / 10000)

const backgroundColor = '#1A202C'
const textColor = '#ffffffeb'
const gridColor = '#2D3748'

const chartJSNodeCanvas = new ChartJSNodeCanvas({ 
  type: 'png', 
  backgroundColour: backgroundColor,
  width: 800, 
  height: 300 
})

const msChart = await chartJSNodeCanvas.renderToBuffer({
  type: 'line',
  data: {
    labels: sizes,
    datasets: msDatasets
  },
  options: {
    color: textColor,
    plugins: {
      title: {
        display: true,
        text: 'Data Iteration Performance',
        color: textColor
      },
    },
    scales: {
      xAxes: {
        title: {
          display: true,
          text: 'Size',
          color: textColor
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return Numbers.toHumanString(this.getLabelForValue(value))
          }
        },
        grid: {
          color: gridColor,
          borderColor: gridColor,
          tickColor: gridColor,
          borderWidth: 1
        }
      },
      yAxes: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Time',
          color: textColor
        },
        // min,
        // max,
        grid: {
          color: gridColor,
          borderColor: gridColor,
          tickColor: gridColor,
          borderWidth: 1
        },
        ticks: {
          color: textColor,
          includeBounds: true,
          callback: value => `${value.toFixed(2)}s`
        }
      }
    }
  }
})

fs.writeFileSync('chart-ms.png', msChart)


const hzChart = await chartJSNodeCanvas.renderToBuffer({
  type: 'bar',
  data: {
    labels: sizes,
    datasets: hzDatasets
  },
  options: {
    color: textColor,
    plugins: {
      title: {
        display: true,
        text: 'Data Iteration Performance',
        color: textColor
      },
    },
    scales: {
      xAxes: {
        title: {
          display: true,
          text: 'Size',
          color: textColor
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return Numbers.toHumanString(this.getLabelForValue(value))
          }
        },
        grid: {
          color: gridColor,
          borderColor: gridColor,
          tickColor: gridColor,
          borderWidth: 1
        }
      },
      yAxes: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Ops/s',
          color: textColor
        },
        // min,
        // max,
        grid: {
          color: gridColor,
          borderColor: gridColor,
          tickColor: gridColor,
          borderWidth: 1
        },
        ticks: {
          color: textColor,
          includeBounds: true,
          // callback: value => `${value.toFixed(2)}`
        }
      }
    }
  }
})

fs.writeFileSync('chart-hz.png', hzChart)