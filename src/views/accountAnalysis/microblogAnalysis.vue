<template>
  <div class="boxWarp">
    <leftColumn
      v-if="leftColumn.arr.length > 0"
      :sidebar="leftColumn"
      :drop-conf="dropConf"
      @childLeftItem="childLeftItem"
    />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <Numberpapers :papers="papers" />
      <div class="buttongruop">
        <Buttongruop />
      </div>
      <EChartGrid
        v-if="layout.length > 0"
        :drop-conf="dropConf"
        :layout="layout"
        @click-moredropConf="loadmoreDrag"
      />
      <vip-line />
      <EChartGrid
        v-if="vipLayout.length > 0"
        :drop-conf="dropConfVip"
        :layout="vipLayout"
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
import Numberpapers from '@/components/viewEcharts/numberpapers'
import Buttongruop from '@/components/viewEcharts/buttongruop'
import EChartGrid from '@/components/echartGrid'
import VipLine from '@/components/vipLine'
import MoreTable from '@/components/accountAnalysis/more'
import { getNowFormatDateHMS, getPreMonthDay } from '@/time'
import {
  getInteractionTrend,
  getTotalData,
  getTraditionDispatchHabit,
  getTraditionDispatchHotWord,
  getWechatReadTrend, searchWenHaiHotArticle, selectFansChangeTrend, selectProvinceList, selectSexProportionList
} from '@/api/accountAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import { getAccount } from '@/api/accountManagement'
import { mblogFansContrast, newTraditionManuscriptTrend } from '@/api/comparativeAnalysis'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'

export default {
  name: 'MicroblogAnalysis',
  components: {
    VipLine,
    EChartGrid,
    leftColumn,
    Buttongruop,
    Numberpapers,
    MoreTable
  },
  mixins: [getTimeMixin, layoutMixin],
  data() {
    return {
      papers: [
        {
          name: '发文数',
          prop: 'articlesCount',
          number: '580,886'
        }, {
          name: '粉丝量',
          prop: 'fansCount',
          number: '235,110'
        }, {
          name: '转发量',
          prop: 'rttCount',
          number: '5,886'
        }, {
          name: '评论量',
          prop: 'cmtCount',
          number: '580,886'
        }, {
          name: '点赞量',
          prop: 'upCount',
          number: '468'
        }
      ],
      module: 3, // 微博模块
      layout: [],
      vipLayout: [],
      dropConf: dropConfig.MBlogA,
      dropConfVip: dropConfig.MBlogAVip,
      childValue: '',
      leftColumn: {
        arr: [],
        search: false
      },
      dialogVisiblemore: false,
      chardata: []
    }
  },
  async mounted() {
    await this.queryDataList()
    this.getDropTemplate(0)
    this.getDropTemplate(1)
  },
  methods: {
    // 热门top10开始 ================================================================
    loadmoreDrag() {
      this.dialogVisiblemore = true
      this.chardata = [
        { channelType: this.childValue.channelType },
        { accountName: this.childValue.mediaName },
        { startTime: this.startTime },
        { endTime: this.endTime }
      ]
    },

    hiddendrag() {
      this.pageNo = 1
      this.dialogVisiblemore = false
    },

    // 热门top10结束 ================================================================
    childLeftItem(childValue) {
      // 切换左侧账号后重新获取图表数据
      this.childValue = childValue
      this.commonChartData()
      this.vipChartData()
    },
    commonChartData() {
      this.loadTraditionManuscriptTrend() // 发文情况
      this.loadWechatDispatchHotWord() // 发文热词
      this.loadTraditionDispatchHabit() // 发文习惯
      this.loadReadTrend() // 阅读情况
      this.loadInteraction() // 互动量变化趋势
      this.loadSearchWenHaiHotArticle() // 热文TOP10
      this.loadWechatTotalData() // 宏观数据
    },
    vipChartData() {
      this.selectSexProportionList()
      this.selectProvinceList()
      // this.selectFansChangeTrend()
      this.loadNewFansTrend()
    },
    // 发文情况
    loadTraditionManuscriptTrend() {
      const params = {
        accountListRequestList: [
          {
            channelType: this.childValue.channelType,
            accountName: this.childValue.mediaName
          }
        ],
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newTraditionManuscriptTrend(params)
        .then(res => {
          if (res.success) {
            const datas = res.data[0]
            const ids = this.dropConf.FWQK
            ids.loading = false
            ids.data.dataX = datas.time
            ids.data.dataY = datas.time.length > 0 ? datas.data[0].data : []
            ids.noData = JSON.stringify(res.data[0]) === '{}'
            ids.rightHint.count = datas.total
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微博-发文热词
    loadWechatDispatchHotWord() {
      const params = {
        accountListRequestList: [
          {
            channelType: this.childValue.channelType,
            accountName: this.childValue.mediaName
          }
        ],
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5
      }
      getTraditionDispatchHotWord(params)
        .then(res => {
          if (res.success && res.data.length > 0) {
            this.dropConf.FWRC.data.arr = res.data[0].value
            this.dropConf.FWRC.loading = false
          } else {
            this.dropConf.FWRC.loading = false
            this.dropConf.FWRC.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微博-发文习惯
    loadTraditionDispatchHabit() {
      const params = {
        channelType: this.childValue.channelType,
        accountName: this.childValue.mediaName,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: 4 // 发文习惯固定type 4为两个小时
      }
      getTraditionDispatchHabit(params)
        .then(res => {
          const ids = this.dropConf.FWXG
          if (res.success && res.data.length > 0) {
            this.dropConf.FWXG.loading = false
            this.dropConf.FWXG.data.arr = res.data[0].data
          } else {
            this.dropConf.FWXG.loading = false
            ids.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 阅读量
    loadReadTrend() {
      const params = {
        channelType: this.childValue.channelType, // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        accountName: this.childValue.mediaName, // 账号名称
        accountListRequestList: [
          {
            channelType: this.childValue.channelType,
            accountName: this.childValue.mediaName
          }
        ],
        tenantId: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      getWechatReadTrend(params).then((res) => {
        if (res.success) {
          const datas = res.data[0]
          const ids = this.dropConf.YDQK
          ids.loading = false
          ids.data.dataX = datas.time
          datas.data.length > 0 && (ids.data.dataY = datas.data[0].data)
          datas.data.length === 0 ? ids.noData = true : ids.noData = false
          ids.rightHint.count = datas.total
        }
      })
    },
    // 互动情况
    loadInteraction() {
      const param = {
        accountListRequestList: [
          {
            channelType: this.childValue.channelType, // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
            accountName: this.childValue.mediaName // 账号名称
          }
        ],
        tenantId: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      getInteractionTrend(param).then((res) => {
        if (res.success) {
          const datas = res.data[0]
          const ids = this.dropConf.HDQK
          ids.loading = false
          ids.data.arr = datas.data
          ids.data.dataX = datas.time
          ids.rightHint.count = datas.total
          datas.time.length === 0 ? ids.noData = true : ids.noData = false
        }
      })
    },
    // 微博粉丝情况-粉丝性别比例接口
    selectSexProportionList() {
      const params = {
        channelType: this.childValue.channelType,
        accountName: this.childValue.mediaName, // 账号名称
        startTime: getPreMonthDay(getNowFormatDateHMS(), 3), // 测试默认查3个月的
        endTime: this.endTime
      }
      selectSexProportionList(params)
        .then(res => {
          if (res.success) {
            this.dropConfVip.FSXBBL.loading = false
            this.dropConfVip.FSXBBL.data = res.data
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微博粉丝情况-地域分布接口
    selectProvinceList() {
      const params = {
        channelType: this.childValue.channelType,
        accountName: this.childValue.mediaName, // 账号名称
        // startTime: this.startTime,
        startTime: getPreMonthDay(getNowFormatDateHMS(), 3), // 测试默认查3个月的
        endTime: this.endTime
      }
      selectProvinceList(params)
        .then(res => {
          const ids = this.dropConfVip.FSDYFB
          this.dropConfVip.FSDYFB.loading = false
          this.dropConfVip.FSDYFB.data.arr = res.data
          res.data.length === 0 ? ids.noData = true : ids.noData = false
        })
        .catch(err => {
          console.log(err, 'selectProvinceList')
        })
    },
    // 微博粉丝情况-新增粉丝量变化
    selectFansChangeTrend() {
      const params = {
        channelType: this.childValue.channelType,
        tenantId: 1,
        accountName: this.childValue.mediaName,
        timeType: this.timeType, // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
        // startTime: this.startTime,
        // startTime: getPreMonthDay(getNowFormatDateHMS(), 3), // 测试默认查3个月的
        // endTime: this.endTime
        startTime: '2018-01-04 17:20:54', // 测试默认查3个月的
        endTime: '2018-05-04 17:20:54'
      }
      selectFansChangeTrend(params)
        .then(res => {
          if (res.success) {
            for (let i = 0; i < this.vipLayout.length; i++) {
              if (this.vipLayout[i].leftHint.name === '粉丝关注变化量') {
                this.vipLayout[i].data.dataY = res.data[0].data
                this.vipLayout[i].data.dataX = res.data[0].time
                break
              }
            }
            this.dropConfVip.FSBHL.data.dataY = res.data[0].data
            this.dropConfVip.FSBHL.data.dataX = res.data[0].time
          }
        })
        .catch(err => {
          console.log(err, 'selectFansChangeTrend')
        })
    },
    // 微博新增粉丝量
    loadNewFansTrend() {
      const params = {
        uids: [this.childValue.uids],
        mediaName: this.childValue.mediaName,
        startTime: this.startTime, // 测试默认查3个月的
        endTime: this.endTime,
        timeType: 2
      }
      mblogFansContrast(params)
        .then(res => {
          if (res.success) {
            this.dropConfVip.FSBHL.loading = false
            this.dropConfVip.FSBHL.data.dataY = res.data[0].series[0].data
            this.dropConfVip.FSBHL.data.dataX = res.data[0].time
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 热文TOP10
    loadSearchWenHaiHotArticle() {
      const params = {
        channelType: this.childValue.channelType,
        accountName: this.childValue.mediaName,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5
      }
      searchWenHaiHotArticle(params)
        .then(res => {
          if (res.success) {
            this.dropConf.RMTOP.loading = false
            this.dropConf.RMTOP.data.arr = res.data
          } else {
            this.dropConf.RMTOP.loading = false
            this.dropConf.RMTOP.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 宏观数据
    loadWechatTotalData() {
      const params = {
        channelType: this.childValue.channelType,
        tenantId: 5,
        accountName: this.childValue.mediaName
      }
      getTotalData(params)
        .then(res => {
          if (res.success) {
            const numObj = res.data[0]
            this.papers.forEach((item) => {
              item.number = numObj[item.prop]
            })
          }
        })
        .catch(err => {
          console.log(err, 'selectFansChangeTrend')
        })
    },
    // 获取查询账号
    async queryDataList() {
      const params = {
        mediaName: '',
        channelType: 5,
        organizationName: '',
        accountType: '',
        tenantId: 5,
        pageNum: 1,
        pageSize: 50
      }
      const res = await getAccount(params)
      if (res.success && res.data.length > 0) {
        this.leftColumn.arr = res.data
        this.childValue = res.data[0]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.row_flex_box_waterPolo {
  display: flex;
  .box_waterPolo {
    flex: 1
  }
}

</style>
