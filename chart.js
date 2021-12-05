import ChartJSImage from 'chart.js-image'
import { sizes } from './config.js'
import path from 'path'
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

const datasets = zip([names, benchTimes])
  .map(([label, data], i) => ({ label, data, fill: false, pointRadius: 1, borderColor: `rgb(${i*15}, ${255 - i*40}, ${120+i*10})`, backgroundColor: `rgb(${i*15}, ${255 - i*40}, ${120+i*10})`, borderWidth: 1 }))


console.log(datasets)

const lineChart = ChartJSImage().chart({
  type: 'line',
  data: {
    labels: sizes,
    datasets
  },
  options: {
    title: {
      display: true,
      text: 'data iteration performance'
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'size'
          },
        }
      ],
      yAxes: [
        {
          type: 'logarithmic',
          scaleLabel: {
            display: true,
            labelString: 'time'
          },
        }
      ]
    }
  }
})

lineChart.toFile('chart.png')
