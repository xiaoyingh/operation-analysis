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
      @moved="movedEvent"
    >
      <div class="item-content">
        <div class="titleBox">
          <div class="topTitle">
            <span class="left border_left">{{ item.leftHint.name }}</span>
            <div class="right-tit">
              <span v-if="dropConf[item.id].rightHint.name" class="fansNum">
                {{ dropConf[item.id].rightHint.name }}:{{ dropConf[item.id].rightHint.count }}
              </span>
              <span v-if="dropConf[item.id].rightHint.more" class="right-more" @click="loadmoreDrag(dropConf,dropConf[item.id])">更多</span>
            </div>
          </div>
          <div v-if="loaded" class="chart-slot">
            <!--      接口里将loading值改为false，并判断是否有数据      -->
            <div v-if="dropConf[item.id].loading" class="loading-style">
              <i class="el-icon-loading" />
            </div>
            <div v-else>
              <div v-if="dropConf[item.id].noData" class="notcount">
                <div class="nodata">
                  <img src="@/assets/images/nodata.png" alt="">
                  <p>暂无统计数据</p>
                </div>
              </div>
              <div v-else>
                <component
                  :is="item.chart"
                  :ref="item.i"
                  :chart-data="dropConf[item.id].data"
                />
              </div>
            </div>
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
    },
    dropConf: {
      type: Object,
      default: () => ({})
    },
    isVip: {
      type: Number,
      default: 0
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
    resizedEvent(i) {
      // 在元素拖拽完成后重绘图表(如果不是图表则没有初始化方法就不用调取)
      this.$nextTick(() => {
        this.$refs[i][0].initChart()
      })
      // 触发layout变化后的自定义事件
      this.$emit('change-layout', this.layout, this.isVip)
    },
    // 移动grid后的hook
    movedEvent() {
      // 触发layout变化后的自定义事件
      this.$emit('change-layout', this.layout, this.isVip)
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
    },

    // 更多的弹框
    loadmoreDrag(dropConf, ids) {
      this.$emit('click-moredropConf', ids)
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
      &:before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #3471FF;
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    .right-tit {
      user-select: none;
    }
    .fansNum {
      display: inline-block;
      background: rgba(52, 113, 255, 0.1);
      font-size: 12px;
      color: $functionButtonColor;
      height: 24px;
      line-height: 24px;
      margin: 0;
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
    div {
      height: 100%;
    }
  }
}
.vue-grid-layout {
  max-width: 100%;
}
/deep/ .vue-grid-placeholder {
  background: $functionButtonColor;
}
.loading-style {
  text-align: center;
  color: #ccc;
  .el-icon-loading {
    position: relative;
    top: calc(50% - 40px);
    font-size: 40px;
  }
}
.notcount {
  text-align: center;
  color: #A0A2B2;
  position: relative;
  .nodata {
    height: 136px !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 206px;
    height: 112px;
  }
  p {
    margin-top: -10px;
  }
}
</style>
