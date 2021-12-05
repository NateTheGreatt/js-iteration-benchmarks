import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import Numbers from 'human-readable-numbers'
import chroma from 'chroma-js'
import { sizes } from './config.js'
import fs from 'fs'

const directoryPath = process.argv[1].split('/').slice(0, -1).join('/') + '/results'
console.log(directoryPath)

const benchFiles = fs
  .readdirSync(directoryPath)
  .filter(file => file.includes('.json'))

const benchTimes = benchFiles
  .map(file => `results/${file}`)
  .map(filePath => JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' })))
  .map(results => results.map(r => r.time))

const names = benchFiles.map(file => file.replace('.bench.json', ''))

const zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
const zipped = zip([names, benchTimes])

const scale = chroma.scale('Accent')
  .domain([0, zipped.length])
  .padding(1)

let min = Number.MAX_SAFE_INTEGER
let max = 0

const datasets = zipped.map(([label, data], i) => {
  const color = scale(i).hex()
  data.forEach(d => {
    if (d < min) min = d
    if (d > max) max = d
  })
  return {
    label,
    data,
    fill: false, 
    pointRadius: 2, 
    borderColor: color, 
    backgroundColor: color, 
    borderWidth: 2
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

const lineChart = await chartJSNodeCanvas.renderToBuffer({
  type: 'line',
  data: {
    labels: sizes,
    datasets
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
        min,
        max,
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

fs.writeFileSync('chart.png', lineChart)