<template>
  <div id="statusofpapers" ref="statusPapers" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'Statusofpapers',
  props: {
    chartData: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      var contrastColor = '#fff'
      const that = this
      const myChartContainer = this.$refs.statusPapers
      const myChartChina = this.$echarts.init(myChartContainer)
      const color = ['#FF8066', '#FFBB33', '#7D8FB3', '#4D7CFF', '#A1E6CE', '#52CCA3', '#FFBFB3', '#7266FF']
      const optionMap = {
        color: color,
        backgroundColor: '#fff',
        title: {
          text: '',
          left: 'center',
          top: '50%',
          textStyle: {
            fontSize: 22,
            color: '#fff',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          padding: 10,
          axisPointer: {
            type: 'line'
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#000',
            fontSize: 12,
          }
        },
        series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['30%', '60%'],
          data: that.chartData.arr,
          label: {
            normal: {
              formatter: function(params) {
                if (params.value !== 0) {
                  return params.name + ':' + params.value
                } else {
                  return ''
                }
              },
              show: true,
              rich: {
                font: {
                  fontSize: 20,
                  padding: [5, 0],
                  color: '#fff'
                },
                hr: {
                  height: 0,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#fff'
                }
              }
            }
          },
          labelLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.1)'
            }
          }
        }]
      }
      myChartChina.setOption(optionMap)
      myChartChina.resize()
    }
  }
}
</script>
