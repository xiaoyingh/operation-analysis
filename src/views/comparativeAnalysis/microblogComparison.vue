<template>
  <div class="boxWarp">
    <leftColumn
      v-if="flag"
      :sidebar="leftColumn"
      :drop-conf="dropConf"
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
  mblogFansContrast,
  newInteractionTrend,
  selectManagementAnalysis,
  getContrastHotArticleexport
} from '@/api/comparativeAnalysis'
import { getNowFormatDateHMS } from '@/time' // 获取当前时间
import { accountRank, getTraditionDispatchHotWord } from '@/api/accountAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'

export default {
  name: 'MicroblogComparison',
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
      leftColumn: {},
      layout: [],
      module: 7, // 微博对比模块
      accountListRequestList: [],
      dropConf: dropConfig.MBlogC,
      dialogVisiblemore: false,
      chardata: []
    }
  },
  mounted() {
    this.getSelectAccountDataList()
  },
  methods: {
    commonChartData() {
      this.loadAccountRank() // 微博对比分析-榜单列表
      this.loadTraditionManuscriptTrend() // 微博对比分析-发文
      this.loadWechatDispatchHotWord() // 微博发文热词
      this.loadSearchWenHaiHotArticle() // 微博热文top10
      this.loadNewFansTrend() // 微博新增粉丝量对比
      this.loadInteractionTrend() // 互动量
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

    // 微博-榜单列表
    // 获取机构下账号各渠道榜单
    loadAccountRank(type = 5) {
      const params = {
        channelTypes: [type], // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        dataType: 1, // 数据分类 1:发文量(日均发文) 2：粉丝量 3：阅读量 4：总互动量 5：分享量 6：评论量 7:点赞量 8：在看量
        tenantId: 5,
        accountListRequestList: this.accountListRequestList,
        start_time: this.startTime,
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
    // 微博-发文变化趋势
    loadTraditionManuscriptTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newTraditionManuscriptTrend(params)
        .then(res => {
          if (res.success) {
            if (JSON.stringify(res.data[0]) === '{}') {
              this.dropConf.FWLDB.noData = true
            } else {
              this.dropConf.FWLDB.noData = false
            }
            this.dropConf.FWLDB.data = res.data[0]
            this.dropConf.FWLDB.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微博-发文热词
    loadWechatDispatchHotWord() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
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
    // 热文TOP10
    loadSearchWenHaiHotArticle() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        channelType: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5
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
    // 微博-互动量变化
    loadInteractionTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newInteractionTrend(params)
        .then(res => {
          if (res.success) {
            if (res.data[0].time && res.data[0].time.length === 0) {
              this.dropConf.HDLDB.noData = true
            } else {
              this.dropConf.HDLDB.noData = false
            }
            this.dropConf.HDLDB.data = res.data[0]
            this.dropConf.HDLDB.loading = false
          } else {
            this.dropConf.HDLDB.loading = false
            this.dropConf.HDLDB.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 新增粉丝量
    loadNewFansTrend() {
      const params = {
        uids: [70, 71],
        startTime: this.startTime,
        endTime: getNowFormatDateHMS(),
        timeType: this.timeType
      }
      mblogFansContrast(params)
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
    // 对比分析-获取不同渠道加入对比的账号列表
    async getSelectAccountDataList() {
      this.accountListRequestList = []
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 20,
        channelType: 5,
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
    // 获取弹窗里面的账号列表
    getselectManagementDataList() {
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 100,
        channelType: 5
      }
      selectManagementAnalysis(obj).then(res => {
        if (res && res.data && res.data[0]) {
          // this.leftColumn.arr = res.data[0].data
          // this.leftColumn.search = true
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
        obj.channelType = 5
        obj.accountName = childValue[i]
        this.accountListRequestList.push(obj)
      }
      debugger
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

