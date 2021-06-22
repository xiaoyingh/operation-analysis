<template>
  <div style="height: 100%;">
    <el-tabs v-model="activeName" style="height: 100%;" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :label="item.name"
        :name="item.id"
      />
      <div class="channel-main" style="height: calc(100% - 44px)">
        <div v-if="chartData.tableData.length === 0" class="notCount">
          <div class="nodata">
            <img src="@/assets/images/nodata.png" alt="">
            <p>暂无统计数据</p>
          </div>
        </div>
        <common-table :chart-data="chartData" style="height: 100%;" />
      </div>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from '@/components/viewEcharts/commonTable'

export default {
  name: 'SwappableTable',
  components: { CommonTable },
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeName: '5',
      tabList: [ // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        { name: '微信榜单', id: '5' },
        { name: '微博榜单', id: '6' },
        { name: '抖音', id: '7' },
        { name: '快手', id: '8' },
        { name: '网站', id: '1' },
        { name: '电子报纸榜单', id: '2' }
      ],
      tableData: [],
      loadingInstance: ''
    }
  },
  watch: {
    chartData: {
      handler: function(n) {
        // 拿到数据后关闭loading
        this.loadingInstance.close()
      },
      deep: true
    }
  },
  inject: ['app'],
  methods: {
    handleClick(tab) {
      // 切换开启loading
      this.loadingInstance = this.$loading({
        fullscreen: true,
        target: document.querySelector('.channel-main'),
        background: 'rgba(255, 255, 255, 0.9)'
      })
      this.app.loadAccountRank(Number(tab.name))
    }
  }
}
</script>

<style scoped lang="scss">
.notCount {
  text-align: center;
  color: #A0A2B2;
  position: relative;
  .nodata {
    height: 100%;
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
