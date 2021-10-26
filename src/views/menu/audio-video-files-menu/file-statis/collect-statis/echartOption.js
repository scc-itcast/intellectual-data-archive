var echarts = require('echarts')

function fontSize(res) {
  let docEl = document.documentElement,
    clientWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  let fontSize = 100 * (clientWidth / 1920)
  return res * fontSize
}

let hour_energy_timer = null
let mouth_energy_timer = null

function collect_statis_pie_option(xAxis_data, series_data, series_color) {
  series_data = series_data.map((item, index) => {
    return { value: item, name: xAxis_data[index] }
  })
  return {
    color: series_color,
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      borderColor: 'transparent',
      textStyle: {
        color: '#fff'
      },
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    series: [
      {
        type: 'pie',
        data: series_data,
        avoidLabelOverlap: false,
        // emphasis: {
        //   label: {
        //     formatter: '',
        //     show: true,
        //     fontSize: fontSize(0.4),
        //     fontWeight: 'bold'
        //   }
        // },
        itemStyle: {
          borderWidth: fontSize(0.03), //设置border的宽度有多大
          borderColor: 'transparent'
        },
      }
    ]
  }
}

function collect_statis_line_option(xAxis_data, series_data, series_color) {
  let yAxis_max = Math.max(...series_data) || 1
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      borderColor: 'transparent',
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    grid: {
      top: '25%',
      right: '5%',
      left: '4%',
      bottom: '15%'
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis_data,
        axisLine: {
          lineStyle: {
            color: '#DCDFE6'
          }
        },
        axisLabel: {
          margin: 10,
          color: '#303133',
          textStyle: {
            fontSize: fontSize(0.14)
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#DCDFE6'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        nameTextStyle: {
          color: '#909399',
          padding: [0, 0, fontSize(0.01), -fontSize(0.3)]
        },
        axisLabel: {
          color: '#909399',
          fontSize: fontSize(0.14)
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#002C59',
            opacity: 0.6
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EBEEF5'
          }
        },
        splitNumber: 4,
        max: yAxis_max,
        min: 0,
        interval: Math.ceil(yAxis_max / 4) //每次增加几个
      }
    ],
    series: [
      {
        type: 'line',
        data: series_data,
        // smooth: true, //折点是圆弧状的
        showSymbol: true,
        symbol: 'circle', //折点设定为实心点
        symbolSize: 8, //设定实心点的大小
        hoverAnimation: false,
        animation: false,
        barWidth: fontSize(0.1),
        itemStyle: {
          color: series_color,
          borderRadius: [fontSize(0.3), fontSize(0.3), 0, 0]
        }
      }
    ]
  }
}

export function collect_statis_echart(xAxis_data, series_data, series_color, echart_type = 'pie') {
  switch (echart_type) {
    case 'pie': {
      collect_statis_echart_pie(xAxis_data, series_data, series_color)
      break
    }
    case 'line': {
      collect_statis_echart_line(xAxis_data, series_data, series_color)
      break
    }
    default: {
    }
  }
}

//line
export function collect_statis_echart_line(xAxis_data, series_data, series_color) {
  var myChart = echarts.init(document.querySelector('#collect_statis_echart_line'))
  var option = collect_statis_line_option(xAxis_data, series_data, series_color)
  myChart.setOption(option)
  //让图表跟随屏幕自适应
  window.addEventListener('resize', function() {
    myChart.resize()
  })
}

//pie
export function collect_statis_echart_pie(xAxis_data, series_data, series_color) {
  var myChart = echarts.init(document.querySelector('#collect_statis_echart_pie'))
  var option = collect_statis_pie_option(xAxis_data, series_data, series_color)
  myChart.setOption(option)
  //让图表跟随屏幕自适应
  window.addEventListener('resize', function() {
    myChart.resize()
  })
}
