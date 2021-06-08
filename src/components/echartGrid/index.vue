<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="6"
    :row-height="100"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[8, 8]"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :min-w="2"
      :min-h="2"
      drag-ignore-from=".right-tit,.chart-slot"
      @resized="resizedEvent"
    >
      <div class="item-content">
        <div class="titleBox">
          <div class="topTitle">
            <span class="left border_left">{{ item.leftHint.name }}</span>
            <div class="right-tit">
              <span v-if="item.rightHint.name" class="fansNum">
                {{ item.rightHint.name }}:{{ item.rightHint.count }}
              </span>
              <span v-if="item.rightHint.more" class="right-more">更多</span>
              <!-- <span v-if="item.rightHint.haveLoad" class="el-download">-->
              <!-- <img src="../../assets/upload.png" alt="">-->
              <!-- </span>-->
            </div>
          </div>
          <div v-if="loaded" class="chart-slot">
            <component
              :is="item.chart"
              ref="child"
              :chart-data="item.data"
            />
          </div>
        </div>

      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import Vue from 'vue'

export default {
  name: 'EChartGrid',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    layout: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Object,
      default: () => ({
        tableHeard: [],
        tableData: []
      })
    }
  },
  data() {
    return {
      loaded: false,
      show: false
    }
  },
  async mounted() {
    await this.loadComponents()
    // 动态加载完所需组件后再进行渲染
    this.loaded = true
  },
  methods: {
    resizedEvent: function(i) {
      // 在元素拖拽完成后重绘图表(如果不是图表则没有初始化方法就不用调取)
      this.$nextTick(() => {
        this.$refs.child[i * 1].initChart && this.$refs.child[i * 1].initChart()
      })
    },
    // 动态加载所需组件
    loadComponents() {
      return new Promise(resolve => {
        for (let i = 0; i < this.layout.length; i++) {
          const tlp = this.layout[i].chart
          Vue.component(
            tlp,
            resolve => require([`../viewEcharts/${tlp}.vue`], resolve)
          )
          if (i === this.layout.length - 1) {
            resolve()
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.item-content {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: $radious6px;
}
.vue-grid-item {
  touch-action: none
}
.titleBox {
  @include background-color('tab-nav-bg');
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: $radious6px;
  .topTitle {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #E3E3E3;
    margin: 0;
    width: 100%;
    padding: 0 16px;
    .left {
      display: flex;
      align-items: center;
      padding-left: 4px;
      font-size: 14px;
      @include color('tab-item-color');
      flex: 1;
      &:before{
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #3471FF;
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    .right-tit{
      user-select: none;
    }
    .fansNum {
      display: inline-block;
      background: rgba(52, 113, 255, 0.1);
      font-size: 12px;
      color: $functionButtonColor;
      height: 24px;
      line-height: 24px;
      margin:0;
      padding-left: 8px;
      padding-right: 8px;
    }
    .right-more {
      color: $functionButtonColor;
      margin-left: 8px;
      cursor: pointer;
			font-size: 14px;
    }
    .el-download {
      margin-right: 16px;
      line-height: 40px;
      cursor: pointer;
      position: relative;
      img: {
            position: absolute;
            top: 2px;
      };
    }
  }
  .chart-slot {
    width: 100%;
    height: calc(100% - 40px);
    padding: 0;
  }

}
.vue-grid-layout{
  max-width: 100%;
}

/deep/.vue-grid-placeholder {
  background: $functionButtonColor;
}
</style>
