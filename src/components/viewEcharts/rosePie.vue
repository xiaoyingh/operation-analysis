<template>
  <div id="rosePie" ref="statusPapers" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'rosePie',
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
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
      const that = this
      const myChartContainer = this.$refs.statusPapers
      const myChartChina = this.$echarts.init(myChartContainer)
      const color = ['#FF8066', '#FFBB33', '#4D7CFF', '#A1E6CE', '#52CCA3', '#FFBFB3', '#7266FF']
      const optionMap = {
        color: color,
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
            fontSize: 12
          },
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          radius: [20, 120],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: that.chartData,
          label: {
            normal: {
              formatter: function(params) {
                if (params.value !== 0) {
                  return params.name + ' : ' + params.value
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
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              borderRadius: 5,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.1)'
            }
          }
        }]
      }
      myChartChina.setOption(optionMap)
      myChartChina.on("click", function(param) {
          that.$emit('handlePieClick',param)
      });
      myChartChina.resize()
    }
  }
}
</script>
