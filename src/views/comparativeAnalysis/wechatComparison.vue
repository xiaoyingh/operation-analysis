<template>
  <div class="boxWarp">
    <leftColumn
      v-if="flag"
      :sidebar="leftColumn"
      :sidebar-name="sidebarName"
      :drop-conf="dropConf"
      @childLeftItem="childLeftItem"
      @parentCheck="getChildData"
    />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <div class="buttongruop">
        <buttonGruop />
      </div>
      <EChartGrid
        v-if="layout.length > 0"
        :drop-conf="dropConf"
        :layout="layout"
        :is-vip="0"
        @change-layout="updateDropTemplate"
        @click-moredropConf="loadmoreDrag"
      />
    </div>

    <el-dialog
      title="热文top10"
      :visible.sync="dialogVisiblemore"
      width="1096px"
    >
      <MoreTable :chart-data="chardata" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddendrag()">取 消</el-button>
        <el-button type="primary" @click="hiddendrag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import buttonGruop from '@/components/viewEcharts/buttongruop' // 累计总量 时间
import EChartGrid from '@/components/echartGrid'
import MoreTable from '@/components/comparativeAnalysis/more'
import {
  selectAccountAnalysis,
  newTraditionManuscriptTrend,
  newInteractionTrend,
  newFansContrast,
  getContrastHotArticleexport
} from '@/api/comparativeAnalysis'
// import { getTemplate, updateTemplate } from '@/api/commonInterface'
import { getTraditionDispatchHotWord, accountRank, getWechatReadTrend } from '@/api/accountAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'

export default {
  name: 'WechatComparison',
  components: {
    leftColumn,
    buttonGruop,
    EChartGrid,
    MoreTable
  },
  mixins: [getTimeMixin, layoutMixin],
  data() {
    return {
      flag: false,
      columnData: [],
      accountListRequestList: [],
      sidebarName: '微信账号',
      layout: [],
      module: 6, // 微信对比模块
      dropConf: dropConfig.wxC,
      firstInit: true,
      leftColumn: {},
      dialogVisiblemore: false,
      chardata: []
    }
  },
  mounted() {
    this.getSelectAccountDataList()
  },
  methods: {
    commonChartData() {
      this.loadNewFansTrend() // 微信新增粉丝量对比
      this.loadSearchWenHaiHotArticle()// 热文TOP10
      this.loadWechatDispatchHotWord()// 发文热词
      this.loadTraditionManuscriptTrend()// 发文变化趋势
      this.loadInteractionTrend() // 互动量变化
      this.loadAccountRank() // 微信对比分析-榜单列表
      this.loadReadTrend() // 阅读变化量
    },

    // 更多的弹框开始 ================================================================
    loadmoreDrag() {
      this.dialogVisiblemore = true
      const hotdata = this.accountListRequestList
      this.tabList = []
      for (var i = 0; i < hotdata.length; i++) {
        this.tabList.push({ name: hotdata[i].accountName, id: hotdata[i].accountName })
      }
      this.activeName = hotdata[0].accountName

      this.chardata = [
        { tabList: this.tabList },
        { accountListRequestList: this.accountListRequestList },
        { startTime: this.startTime },
        { endTime: this.endTime },
        { timeType: this.timeType }
      ]
    },

    hiddendrag() {
      this.pageNo = 1
      this.dialogVisiblemore = false
    },
    // 更多的弹框结束 ================================================================

    // 微信新增粉丝量对比
    loadNewFansTrend() {
      const params = {
        uids: [70, 71],
        startTime: this.startTime, // 测试默认查3个月的
        endTime: this.endTime,
        timeType: this.timeType
      }
      newFansContrast(params)
        .then(res => {
          if (res.success) {
            const dataObj = {}
            dataObj.data = res.data[0].series
            dataObj.time = res.data[0].time
            this.dropConf.XZFSLDB.data = dataObj
            this.dropConf.XZFSLDB.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 热文TOP10
    loadSearchWenHaiHotArticle() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType
      }
      getContrastHotArticleexport(params)
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length === 0) {
              this.dropConf.RMTOP.noData = true
            } else {
              this.dropConf.RMTOP.noData = false
            }
            this.dropConf.RMTOP.data.arr = res.data
            this.dropConf.RMTOP.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 阅读变化量
    loadReadTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        tenantId: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      getWechatReadTrend(params).then((res) => {
        if (res.success) {
          if (res.data[0].time && res.data[0].time.length === 0) {
            this.dropConf.YDBHL.noData = true
          } else {
            this.dropConf.YDBHL.noData = false
          }
          this.dropConf.YDBHL.data = res.data[0]
          this.dropConf.YDBHL.loading = false
        }
      })
    },
    // 微信-互动量变化
    loadInteractionTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime, // 测试默认查3个月的
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newInteractionTrend(params)
        .then(res => {
          if (res.success) {
            if (res.data[0].time && res.data[0].time.length === 0) {
              this.dropConf.HDLBH.noData = true
            } else {
              this.dropConf.HDLBH.noData = false
            }
            this.dropConf.HDLBH.data = res.data[0]
            this.dropConf.HDLBH.loading = false
          } else {
            this.dropConf.HDLBH.loading = false
            this.dropConf.HDLBH.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信-发文变化趋势
    loadTraditionManuscriptTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime, // 测试默认查3个月的
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newTraditionManuscriptTrend(params)
        .then(res => {
          if (res.success) {
            if (JSON.stringify(res.data[0]) === '{}') {
              this.dropConf.FWL.noData = true
            } else {
              this.dropConf.FWL.noData = false
            }
            this.dropConf.FWL.data = res.data[0]
            this.dropConf.FWL.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信-发文热词
    loadWechatDispatchHotWord() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime, // 测试默认查3个月的
        endTime: this.endTime,
        tenantId: 5
      }
      getTraditionDispatchHotWord(params)
        .then(res => {
          if (res.success) {
            if (res.data.length === 0) {
              this.dropConf.FWRCDB.noData = true
            } else {
              this.dropConf.FWRCDB.noData = false
            }
            this.dropConf.FWRCDB.data = res.data
            this.dropConf.FWRCDB.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信-榜单列表
    // 获取机构下账号各渠道榜单
    loadAccountRank() {
      const params = {
        channelTypes: [4], // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        dataType: 1, // 数据分类 1:发文量(日均发文) 2：粉丝量 3：阅读量 4：总互动量 5：分享量 6：评论量 7:点赞量 8：在看量
        tenantId: 5,
        accountListRequestList: this.accountListRequestList,
        start_time: this.startTime, // 测试默认查3个月的
        end_time: this.endTime,
        timeType: this.timeType,
        order: 1 // 排序 0:从低到高 1:从高到底
      }
      accountRank(params)
        .then(res => {
          if (res.success) {
            this.dropConf.ZHLB.data.tableData = res.data
            this.dropConf.ZHLB.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 对比分析-获取不同渠道加入对比的账号列表
    async getSelectAccountDataList() {
      this.accountListRequestList = []
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 20,
        channelType: 4,
        moduleType: 2
      }
      await selectAccountAnalysis(obj).then(res => {
        if (res && res.data) {
          for (const item in res.data) {
            this.accountListRequestList.push({ channelType: 4, accountName: res.data[item].mediaName })
          }
          this.getDropTemplate()
          this.$set(this.leftColumn, 'arr', res.data)
          this.leftColumn.search = true
          this.flag = true
        }
      }).catch(res => {
        console.log('上传失败')
      })
    },
    childLeftItem(childValue) {
      this.childValue = childValue
    },
    getChildData(childValue) {
      this.accountListRequestList = []
      for (let i = 0; i < childValue.length; i++) {
        const obj = {}
        obj.channelType = 4
        obj.accountName = childValue[i]
        this.accountListRequestList.push(obj)
      }
      this.commonChartData()
    }
  }
}
</script>
<style scoped lang="scss">
.buttongruop {
  margin-top: 0;
  margin-left: 8px;
  margin-right: 8px;
}

</style>
