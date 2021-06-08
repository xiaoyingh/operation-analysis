<template>
  <div id="fansdata" ref="fansdata" style="width: 100%; height: 100%" />
</template>
<script>
export default {
  name: 'FansChanges',
  props: {
    chartData: { // 列表数组，必传
      type: Object,
      default: () => {
      }
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
      // const myChartContainer = document.getElementById(this.id)
      const myChartContainer = this.$refs.fansdata
      const myChartChina = this.$echarts.init(myChartContainer)
      const seriesData = []
      const lineColor = ['#6D93FE', '#7266FF', '#52CCA3', '#FFBB33', '#FF8066', '#7D8FB3']
      if (mapData) {
        for (let i = 0; i < mapData.length; i++) {
          seriesData.push({
            name: mapData[i].name,
            type: 'line',
            symbol: 'circle',
            symbolSize: 9,
            showAllSymbol: false,
            lineStyle: {
              normal: {
                width: 2,
                color: lineColor[i]
              }
            },
            itemStyle: {
              color: lineColor[i],
              borderColor: '#fff',
              borderWidth: 2
            },
            data: mapData[i].data
          })
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
          grid: {
            top: '32px',
            left: '32px',
            right: '32px',
            bottom: '16px',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#DCDEE3', // 左边线的颜色
                width: '1' // 坐标线的宽度
              }
            },
            axisLabel: {
              interval: this.chartData.time.length > 20 ? 10 : 0,
              textStyle: {
                color: '#999' // 坐标值得具体的颜色
              }
            },
            data: this.chartData.time
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
                type: 'dotted'
              }
            }
          },
          series: seriesData
        }
        myChartChina.setOption(option)
        myChartChina.resize()
        window.onresize = function() {
          myChartChina.resize()
        }
      }
    }
  }
}
</script>
