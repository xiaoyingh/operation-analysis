<template>
  <div class="hot-box">
    <div v-for="(item,index) in chartData" :key="index" :style="{width: calcWidth, height: '100%'}">
      <p class="hotBoxTitle">账户A</p>
      <div ref="hotRef" style="width: 100%; height: calc(100% - 32px)" />
    </div>
  </div>
</template>

<script>
import 'echarts-wordcloud'

export default {
  name: 'HotModelMore',
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    calcWidth() {
      return parseInt(100 / this.chartData.length) + '%'
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart(maxNum = 100) {
      this.chartData.forEach((el, ind) => {
        this.createChart(el, this.$refs.hotRef[ind])
      })
    },
    createChart(params, dom) {
      const myChartChina = this.$echarts.init(dom)
      const option = {
        tooltip: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          containLabel: true
        },
        series: [{
          type: 'wordCloud',
          // 网格大小，各项之间间距
          gridSize: 30,
          // 形状 circle 圆，cardioid  心， diamond 菱形，
          // triangle-forward 、triangle 三角，star五角星
          shape: 'circle',
          // 字体大小范围
          sizeRange: [16, 30],
          // 文字旋转角度范围
          rotationRange: [0, 10],
          // 旋转步值
          rotationStep: 90,
          // 自定义图形
          // maskImage: maskImage,
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          // 画布宽
          width: '90%',
          // 画布高
          height: '80%',
          // 是否渲染超出画布的文字
          drawOutOfBound: false,
          textStyle: {
            normal: {
              color: function() {
                var colorList = ['#FF8066', '#FF8066', '#FFBB33', '#7266FF', '#6D93FE', '#52CCA3', '#A1E6CE', '#FFBFB3']
                const num = Math.floor(Math.random() * (8))
                return colorList[num]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#2ac'
            }
          },
          data: params
        }]
      }
      myChartChina.setOption(option)
      myChartChina.resize()
      window.onresize = function() {
        myChartChina.resize()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hot-box {
  background: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  .hotBoxTitle{
    width: calc(100% - 16px);
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    background: #F8F9FB;
    margin-bottom: 0;
  }
  .hotBoxTitle:last-child{
    width: 100%;
  }
}
</style>
