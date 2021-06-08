<template>
  <div id="nightingale" ref="nightingale" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  name: 'Nightingale',
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const myChartContainer = this.$refs.nightingale
      const myChartChina = this.$echarts.init(myChartContainer)
      const color = ['#FFBFB3', '#52CCA3', '#A4E4CD', '#4D7CFF', '#7D8FB3', '#FFBB33', '#FF8066', '#7266FF']
      const optionMap = {
        color,
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            // radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            labelLine: {
              normal: {
                length: 2
              }
            },
            data: this.chartData
          }
        ]
      }
      myChartChina.setOption(optionMap)
      myChartChina.resize()
    }
  }
}
</script>

<style scoped>

</style>
