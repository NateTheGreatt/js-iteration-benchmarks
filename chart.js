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

// const line_chart = ChartJSImage().chart({
//   'type': 'line',
//   'data': {
//     'labels': sizes,
//     'datasets': [
//       {
//         'label': 'My First dataset',
//         'borderColor': 'rgb(255,+99,+132)',
//         'backgroundColor': 'rgba(255,+99,+132,+.5)',
//         'data': [
//           57,
//           90,
//           11,
//           -15,
//           37,
//           -37,
//           -27
//         ]
//       },
//       {
//         'label': 'My Second dataset',
//         'borderColor': 'rgb(54,+162,+235)',
//         'backgroundColor': 'rgba(54,+162,+235,+.5)',
//         'data': [
//           71,
//           -36,
//           -94,
//           78,
//           98,
//           65,
//           -61
//         ]
//       },
//       {
//         'label': 'My Third dataset',
//         'borderColor': 'rgb(75,+192,+192)',
//         'backgroundColor': 'rgba(75,+192,+192,+.5)',
//         'data': [
//           48,
//           -64,
//           -61,
//           98,
//           0,
//           -39,
//           -70
//         ]
//       },
//       {
//         'label': 'My Fourth dataset',
//         'borderColor': 'rgb(255,+205,+86)',
//         'backgroundColor': 'rgba(255,+205,+86,+.5)',
//         'data': [
//           -58,
//           88,
//           29,
//           44,
//           3,
//           78,
//           -9
//         ]
//       }
//     ]
//   },
//   'options': {
//     'title': {
//       'display': true,
//       'text': 'Chart.js Line Chart'
//     },
//     'scales': {
//       'xAxes': [
//         {
//           'scaleLabel': {
//             'display': true,
//             'labelString': 'Month'
//           }
//         }
//       ],
//       'yAxes': [
//         {
//           'stacked': true,
//           'scaleLabel': {
//             'display': true,
//             'labelString': 'Value'
//           }
//         }
//       ]
//     }
//   }
// }) // Line chart
// .backgroundColor('white')
// .width(500) // 500px
// .height(300) // 300px

// line_chart.toFile('chart.png')