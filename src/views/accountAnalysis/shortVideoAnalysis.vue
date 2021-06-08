<template>
  <div class="boxWarp">
    <leftColumn
      v-if="leftColumn.arr.length > 0"
      :sidebar="leftColumn"
      :drop-conf="dropConf"
      @childLeftItem="childLeftItem"
    />
    <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <numberPapers :papers="papers" />
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
      <vip-line />
      <EChartGrid
        v-if="vipLayout.length > 0"
        :drop-conf="dropConfVip"
        :layout="vipLayout"
        :is-vip="1"
        @change-layout="updateDropTemplate"
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
import numberPapers from '@/components/viewEcharts/numberpapers'
import buttonGruop from '@/components/viewEcharts/buttongruop.vue' // 累计总量 时间
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import EChartGrid from '@/components/echartGrid'
import VipLine from '@/components/vipLine'
import MoreTable from '@/components/accountAnalysis/more'
import {
  getInteractionTrend, getTotalData,
  getTraditionDispatchHabit,
  getWechatReadTrend,
  searchWenHaiHotArticle,
  selectFansProvince, selectFansSex, selectFansTrend
} from '@/api/accountAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import { getAccount } from '@/api/accountManagement'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'
import { newTraditionManuscriptTrend } from '@/api/comparativeAnalysis'

export default {
  name: 'ShortVideoAnalysis',
  components: {
    VipLine,
    numberPapers,
    EChartGrid,
    buttonGruop,
    leftColumn,
    MoreTable
  },
  mixins: [getTimeMixin, layoutMixin],
  data() {
    return {
      papers: [
        {
          name: '发文数',
          prop: 'articlesCount',
          number: ''
        }, {
          name: '粉丝量',
          prop: 'fansCount',
          number: ''
        }, {
          name: '播放量',
          prop: 'readCount',
          number: ''
        }, {
          name: '分享量',
          prop: 'rttCount',
          number: ''
        }, {
          name: '评论量',
          prop: 'cmtCount',
          number: ''
        }, {
          name: '点赞量',
          prop: 'upCount',
          number: ''
        }
      ],
      childValue: '',
      leftColumn: {
        arr: [], search: false
      },
      module: 4, // 短视频模块
      dropConf: dropConfig.shortVideoA,
      dropConfVip: dropConfig.shortVideoAVip,
      layout: [],
      vipLayout: [],
      dialogVisiblemore: false,
      chardata: []
    }
  },
  async mounted() {
    await this.queryDataList()
    this.getDropTemplate(0) // 加载普通模板
    this.getDropTemplate(1) // 加载VIP模板
  },
  methods: {
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
    childLeftItem(childValue) {
      // 切换左侧账号后重新获取图表数据
      this.childValue = childValue
      this.commonChartData()
      this.vipChartData()
    },
    commonChartData() {
      this.loadTraditionManuscriptTrend() // 发视频变化量
      this.loadTraditionDispatchHabit() // 发视频习惯
      this.loadInteraction() // 互动情况
      this.loadReadTrend() // 阅读情况
      this.loadSearchWenHaiHotArticle() // 热文TOP10
      this.loadWechatTotalData() // 宏观数据
    },
    vipChartData() {
      this.selectSexProportionList()
      this.selectProvinceList()
      this.selectFansChangeTrend()
    },
    // 发视频变化量
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
            const ids = this.dropConf.FSPBHL
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
    // 发视频习惯
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
          if (res.success && res.data.length > 0) {
            const ids = this.dropConf.FSPXG
            ids.loading = false
            this.dropConf.FSPXG.data.arr = res.data[0].data
          } else {
            const ids = this.dropConf.FSPXG
            ids.loading = false
            ids.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 互动情况
    loadInteraction() {
      const param = {
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
    // 阅读情况
    loadReadTrend() {
      const params = {
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
            const ids = this.dropConf.RMTOP
            this.dropConf.RMTOP.data.arr = res.data
            ids.loading = false
          } else {
            this.dropConf.RMTOP.loading = false
            this.dropConf.RMTOP.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信粉丝情况-粉丝性别比例接口
    selectSexProportionList() {
      const params = {
        channelType: this.childValue.channelType,
        mediaName: this.childValue.mediaName, // 账号名称
        startTime: this.endTime,
        endTime: this.endTime
      }
      selectFansSex(params)
        .then(res => {
          if (res.success && res.data.length > 0) {
            this.dropConfVip.FSXBBL.loading = false
            this.dropConfVip.FSXBBL.data = res.data
          } else {
            this.dropConfVip.FSXBBL.loading = false
            this.dropConfVip.FSXBBL.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信粉丝情况-地域分布接口
    selectProvinceList() {
      const params = {
        channelType: this.childValue.channelType,
        mediaName: this.childValue.mediaName, // 账号名称
        startTime: this.startTime,
        endTime: this.endTime
      }
      selectFansProvince(params)
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
    // 微信粉丝情况-新增粉丝量变化
    selectFansChangeTrend() {
      const params = {
        channelType: this.childValue.channelType,
        openId: 5,
        mediaName: this.childValue.mediaName,
        timeType: this.timeType, // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
        startTime: this.startTime,
        endTime: this.endTime
      }
      selectFansTrend(params)
        .then(res => {
          if (res.success && res.data.length > 0) {
            this.dropConfVip.FSBHL.loading = false
            this.dropConfVip.FSBHL.data.dataY = res.data[0].data
            this.dropConfVip.FSBHL.data.dataX = res.data[0].time
          } else {
            this.dropConfVip.FSBHL.loading = false
            this.dropConfVip.FSBHL.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'selectFansChangeTrend')
        })
    },
    // 宏观数据
    loadWechatTotalData() {
      const params = {
        channelType: this.childValue.channelType,
        tenantId: 5,
        accountName: this.childValue.mediaName,
        startTime: this.startTime,
        endTime: this.endTime
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
        // channelType: this.childValue.channelType,
        channelTypes: [7, 8],
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

</style>
