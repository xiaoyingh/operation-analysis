<template>
  <div :id="waterdata.id" :style="{width: waterdata.width, height: waterdata.height}" />
</template>
<!-- 圆形饼图 -->
<script>
export default {
  props: {
    waterdata: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      ids: ''
    }
  },
  mounted() {
    this.ids = this.waterdata.id
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
      const myChartContainer = document.getElementById(this.ids)
      const myChartChina = this.$echarts.init(myChartContainer)
      const data = this.waterdata.arr
      const option = {
        // x轴
        xAxis: {
          show: false // 不显示
        },
        // y轴
        yAxis: {
          show: false // 不显示
        },
        grid: {
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          containLabel: true
        },
        series: [{
          type: 'liquidFill',
          radius: '70%', // 半径大小
          center: ['50%', '50%'], // 布局位置
          data: data, // 水球波纹值
          label: {
            normal: {
              color: '#fff',
              textStyle: {
                fontSize: 12
              },
              formatter: (params) => { // console.log(params)
                const newValue = params.value * 100
                return newValue.toFixed(2) + '%'
              }
            }
          },
          outline: { // 轮廓设置
            show: true,
            borderDistance: 2, // 轮廓间距
            itemStyle: {
              borderColor: '#294D99', // 轮廓颜色
              borderWidth: 4, // 轮廓大小
              shadowBlur: 'none' // 轮廓阴影
            }
          }
        }]
      }
      myChartChina.setOption(option)
    }
  }
}
</script>
