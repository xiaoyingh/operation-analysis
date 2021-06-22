<template>
  <div id="Interaction" ref="inter" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'InteracTion',
  props: {
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler: function(newVal) {
        this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const mapData = this.chartData.data
      const myChartContainer = this.$refs.inter
      const myChartChina = this.$echarts.init(myChartContainer)
      // const color = ['#FFBB33', '#FF8066', '#52CCA3', '#6D93FE',]
      const color = ['#16c2af', '#ffc751', '#4162ff', '#ff6e72', '#9692ff']
      const xAxis = this.chartData.dataX
      const legend = []
      const seriesData = []

      for (let i = 0; i < mapData.length; i++) {
        seriesData.push({
          name: mapData[i].stack,
          type: 'bar',
          stack: 'product',
          barWidth: 30,
          data: mapData[i].data
        })
        legend.push(mapData[i].stack)
      }

      const optionMap = {
        color: color,
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          padding: 10,
          axisPointer: {
            type: 'line'
          },
          textStyle: {
            color: '#000',
            fontSize: 12
          }
        },
        legend: {
          data: legend,
          show: false,
          icon: 'rect',
          itemWidth: 12, // 设置宽度
          itemHeight: 3, // 设置高度
          itemGap: 30, // 设置间距
          top: 6,
          textStyle: {
            fontSize: 12,
            color: '#333333',
            fontWeight: 'bold'
          }
        },
        grid: {
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          containLabel: true
        },
        xAxis: [{
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
        }],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}',
              textStyle: {
                color: '#999'
              }
            },
            minInterval: 1,
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
          }
        ],
        series: seriesData
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
