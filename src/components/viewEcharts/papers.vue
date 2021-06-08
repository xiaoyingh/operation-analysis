<template>
  <div id="hotzheg" ref="paper" style="width: 100%; height: 100%" />
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'Papers',
  props: {
    chartData: { // 列表数组，必传
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      flag: false,
      myChartChina: ''
    }
  },
  watch: {
    chartData: {
      handler: function(newVal) {
        this.initChart()
        this.myChartChina.hideLoading()
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      const myChartContainer = this.$refs.paper
      this.myChartChina = this.$echarts.init(myChartContainer)

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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData.datax,
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
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          }
        }],
        series: [{
          name: this.seriesname,
          type: 'line',
          data: this.chartData.datay,
          symbolSize: 6,
          symbol: 'circle',
          smooth: true,
          lineStyle: {
            color: '#3471FF'
          },
          itemStyle: {
            normal: {
              color: '#3471FF',
              borderColor: '#3471FF'
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [
                {
                  offset: 0,
                  color: '#3471FF'
                },
                {
                  offset: 1,
                  color: '#feffff'
                }
              ])
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3471FF'
                  },
                  {
                    offset: 0.4,
                    color: '#3471FF'
                  },
                  {
                    offset: 0.5,
                    color: '#ffffff'
                  }, {
                    offset: 0.7,
                    color: '#ffffff'
                  }, {
                    offset: 0.8,
                    color: '#ffffff'
                  }, {
                    offset: 1,
                    color: '#ffffff'
                  }
                ]
              },
              borderColor: '#3471FF',
              borderWidth: 2
            }
          }
        }
        ]
      }
      this.myChartChina.setOption(option)
      this.myChartChina.resize()
      window.onresize = () => {
        this.myChartChina.resize()
      }
    }
  }
}
</script>
