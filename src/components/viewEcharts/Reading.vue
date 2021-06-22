<template>
  <div id="reading" ref="reading" style="width: 100%; height: 100%" />
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
      const that = this
      // const myChartContainer = document.getElementById('Reading')
      const myChartContainer = that.$refs.reading
      const myChartChina = that.$echarts.init(myChartContainer)
      const xAxis = that.chartData.dataX

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
            fontSize: 12
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
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: 'bar',
            showBackground: false,
            barWidth: 20,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              color: '#6699FF',
              barBorderRadius: 10
            },
            data: that.chartData.dataY
          }
        ]
      }
      myChartChina.setOption(optionMap)
      myChartChina.resize()
      myChartChina.on("click", function(param) {
          that.$emit('handleProductClick',param)
      });
      window.onresize = () => {
        myChartChina.resize()
      }
    }
  }
}
</script>
