<template>
  <div :id="chartData.id" ref="reading" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'Reading',
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const that = this
      // const myChartContainer = document.getElementById('Reading')
      const myChartContainer = that.$refs.reading
      const myChartChina = that.$echarts.init(myChartContainer)
      const xAxis = that.chartData.datax
      const optionMap = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          padding: 10,
          axisPointer: {
            type: 'line'
          },
          textStyle: {
            color: '#000',
            fontSize: 12,
          }
        },
        grid: {
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#DCDEE3', // 左边线的颜色
              width: '1' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999' // 坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [{
          data: that.chartData.arr,
          type: 'bar',
          showBackground: true,
          barWidth: 10,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          barBorderRadius: [10, 10, 10, 10],
          itemStyle: {
            color: '#6699FF',
            emphasis: {
              barBorderRadius: 30
            }
          }

        }]
      }
      myChartChina.setOption(optionMap)
      myChartChina.resize()
      window.onresize = () => {
        myChartChina.resize()
      }
    }
  }
}
</script>
