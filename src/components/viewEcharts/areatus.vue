<template>
  <!--  簇状图-->
  <div id="areatus" ref="areatus" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'Areatus',
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
      handler: function() {
        this.$nextTick(() => {
          this.initChart()
        })
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
      const myChartContainer = this.$refs.areatus
      const myChartChina = this.$echarts.init(myChartContainer)
      const seriesData = []
      const lineColor = ['#6D93FE', '#FFBB33', '#FF8066', '#52CCA3', '#FF8066', '#7D8FB3']
      for (let i = 0; i < mapData.length; i++) {
        seriesData.push({
          name: mapData[i].name,
          stack: mapData[i].stack,
          type: 'bar',
          barWidth: this.chartData.time.length > 20 ? 8 : 30, // 柱图宽度
          itemStyle: {
            color: lineColor[i]
          },
          data: mapData[i].data
        })
        // legend.push(mapData[i].name)
      }
      const option = {
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
        legend: {
          show: true,
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
        xAxis: {
          type: 'category',
          data: this.chartData.time,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#DCDEE3', // 左边线的颜色
              width: '1' // 坐标线的宽度
            }
          },
          axisLabel: {
            interval: this.chartData.time.length > 20 ? 2 : 0,
            textStyle: {
              color: '#999' // 坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          textStyle: {
            color: '#999'
          }
        },
        series: seriesData
      }

      myChartChina.setOption(option)
      myChartChina.resize()
      window.onresize = () => {
        myChartChina.resize()
      }
    }
  }
}
</script>
