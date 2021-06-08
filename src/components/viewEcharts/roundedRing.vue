<template>
  <div id="roundRing" ref="roundRing" style="width: 100%; height: 100%" />
</template>
<!-- 圆形饼图 -->
<script>
export default {
  props: {
    chartData: {
      type: Array,
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    aaa(q) {
      console.log(q)
    },
    initChart() {
      const myChartContainer = this.$refs.roundRing
      const myChartChina = this.$echarts.init(myChartContainer)
      const sum = this.chartData[0].value + this.chartData[1].value
      const placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0,0,0,0)',
          borderWidth: 0
        },
        emphasis: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0
        }
      }
      const dataStyleMan = {
        normal: {
          formatter: (params) => {
            return `${params.percent}%\n${this.chartData[0].name}`
          },
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            // fontWeight: 'bold',
            color: '#333'
          }
        }
      }
      const dataStyleWo = {
        normal: {
          formatter: (params) => {
            return `${params.percent}%\n${this.chartData[1].name}`
          },
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '16',
            // fontWeight: 'bold',
            color: '#333'
          }
        }
      }
      const option = {
        backgroundColor: '#fff',
        title: [{
          text: `${this.chartData[0].name}性 ${this.chartData[0].value}`,
          left: '29.8%',
          top: '75%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '14',
            color: '#0F0F0F',
            textAlign: 'center'
          }
        }, {
          text: `${this.chartData[1].name}性 ${this.chartData[1].value}`,
          left: '70%',
          top: '75%',
          textAlign: 'center',
          textStyle: {
            color: '#0F0F0F',
            fontWeight: 'normal',
            fontSize: '14',
            textAlign: 'center'
          }
        }],
        // 第一个图表
        series: [
          {
            type: 'pie',
            hoverAnimation: false, // 鼠标经过的特效
            radius: ['32%', '40%'],
            center: ['30%', '50%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: sum,
              itemStyle: {
                normal: {
                  color: '#EBEEF5'
                }
              }
            }]
          },
          // 上层环形配置
          {
            type: 'pie',
            hoverAnimation: false, // 鼠标经过的特效
            radius: ['32%', '40%'],
            center: ['30%', '50%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              },
              capType: 'round' // 圆角 || butt 平角
            },
            data: [{
              value: this.chartData[0].value / sum * 100,
              itemStyle: {
                normal: {
                  color: '#6699FF'
                }
              },
              label: dataStyleMan
            }, {
              value: 100 - this.chartData[0].value / sum * 100,
              itemStyle: placeHolderStyle
            }
            ]
          },
          // 第二个图表
          {
            type: 'pie',
            hoverAnimation: false,
            radius: ['32%', '40%'],
            center: ['70%', '50%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: sum,
              itemStyle: {
                normal: {
                  color: '#EBEEF5'
                }
              }

            }
            ]
          },
          // 上层环形配置
          {
            type: 'pie',
            hoverAnimation: false,
            radius: ['32%', '40%'],
            center: ['70%', '50%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: this.chartData[1].value / sum * 100,
              itemStyle: {
                normal: {
                  color: '#F67F67'
                }
              },
              label: dataStyleWo
            }, {
              value: 100 - this.chartData[1].value / sum * 100,
              itemStyle: placeHolderStyle
            }
            ]
          }
        ]
      }
      myChartChina.setOption(option)
      myChartChina.resize()
    }
  }
}
</script>
