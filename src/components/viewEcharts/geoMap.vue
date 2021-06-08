<template>
  <div style="display: flex;width: 100%; height: 100%">
    <div id="geomap" ref="geomap" style="width: 70%; height: 100%"></div>
    <div class="geoTable">
      <div v-for="(item,index) in dataList" :key="index" class="geoList">
        <div class="imgTxt" :class="index+1 ? 'order'+index:''">{{ index+1 }}</div>
        <div>{{ item.name }}</div>
        <div class="geoRight">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<!-- 中国地图 -->
<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts 主题
import china from 'echarts/map/json/china.json'

echarts.registerMap('china', china)
export default {
  name: 'GeoMap',
  props: {
    chartData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      chart: null,
      dataList: ''
    }
  },
  mounted() {
    this.dataList = this.chartData.arr
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
      const that = this
      // const myChartContainer = document.getElementById('geomap')
      const myChartContainer = this.$refs.geomap
      const myChartChina = this.$echarts.init(myChartContainer)
      // 绘制图表
      const optionMap = {
        tooltip: {
          backgroundColor: '#fff',
          padding: 10,
          textStyle: {
            color: '#000',
            fontSize: 12
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['']
        },
        grid: {
          top: '32px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          containLabel: true
        },
        visualMap: {
          min: 0,
          left: '5%',
          top: 'bottom',
          text: ['多', '少'],
          calculable: true,
          color: ['#0237fe', '#edf1fe']
        },
        series: [
          {
            name: '分布',
            type: 'map',
            left: '20%',
            mapType: 'china',
            selectedMode: true, // single 表示单选;multiple表示多选 默认flase不选
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                color: '#000',
                areaStyle: { color: '#000' },
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 1,
                      color: 'rgba(230,235,255,1)'
                    }
                  ]
                }
              },
              emphasis: {
                label: {
                  show: true// 选中状态是否显示省份名称
                },
                areaColor: '#EBF2FF', // 选中状态的地图板块颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(16,66,254, 0.3)'
              }
            },
            showLegendSymbol: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: that.dataList
          }
        ]
      }
      myChartChina.setOption(optionMap)
      myChartChina.resize()
    }
  }
}
</script>
<style scoped lang="scss">
  .geoTable{
    width: 25%;
    height: 150px;
    position: absolute;
    bottom: 16px;
    right: 20%;
    .geoList{
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
      background: #FFFFFF;
      border-radius: 0px 0px 4px 4px;
      opacity: 0.95;
      border: 1px solid #E3E3E3;
      font-size: 12px;
      color: #909090;
      padding: 0 14px 0 12px;
      margin-top: -1px;
      .order0{
        background: url(../../assets/images/hotbig1.png) no-repeat;
      }
      .order1{
        background: url(../../assets/images/hotbig2.png) no-repeat;
      }
      .order2{
        background: url(../../assets/images/hotbig3.png) no-repeat;
      }
      .imgTxt{
        width: 24px;
        height: 20px;
        background-size: 100%;
        background-position: 0px -3px;
        font-size: 12px;
        margin-top: 5px;
        color: #D50E0B;
        text-align: center;
        line-height: normal;
        padding-top: 3px;
      }
      .order0,.order1,.order2{
        color: #fff;
      }
    }
  }
</style>
