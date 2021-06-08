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
      const myChartContainer = this.$refs.areatus
      const myChartChina = this.$echarts.init(myChartContainer)
      const color = ['#6D93FE', '#FFBB33', '#FF8066', '#52CCA3']

      const optionMap = {
        color,
        dataset: {
          source: this.chartData.arr
        },
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
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
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
