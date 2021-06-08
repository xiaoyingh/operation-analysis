<template>
  <div id="roundRing" ref="roundRing" style="width: 100%; height: 100%" />
<!--  <div id="roundRing" :style="{width: '100%', height: '400px'}" />-->
</template>
<!-- 圆形饼图 -->
<script>
export default {
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // const myChartContainer = document.getElementById('roundRing')
      const myChartContainer = this.$refs.roundRing
      const myChartChina = this.$echarts.init(myChartContainer)
      // let dataArr = this.chartData
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
          formatter: `{c}%\n男`,
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
          formatter: '{c}%\n女',
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
          text: '男性 722600',
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
          text: '女性 192600',
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
        series: [{
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
            value: 100,
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
            value: 35,
            itemStyle: {
              normal: {
                color: '#F67F67'
              }
            },
            label: dataStyleMan
          }, {
            value: 35,
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
            value: 100,
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
            value: 30,
            itemStyle: {
              normal: {
                color: '#6699FF'
              }
            },
            label: dataStyleWo
          }, {
            value: 55,
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
