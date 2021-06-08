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
      <Numberpapers :papers="papers" />
      <div class="buttongruop">
        <Buttongruop />
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
import Numberpapers from '@/components/viewEcharts/numberpapers'
import Buttongruop from '@/components/viewEcharts/buttongruop'
import EChartGrid from '@/components/echartGrid'
import MoreTable from '@/components/accountAnalysis/more'
import {
  getTotalData,
  getTraditionDispatchHabit, getTraditionDispatchHotWord,
  searchWenHaiHotArticle
} from '@/api/accountAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import { getAccount } from '@/api/accountManagement'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'
import { newTraditionManuscriptTrend } from '@/api/comparativeAnalysis'

export default {
  name: 'TraditionalMediaAnalysis',
  components: {
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
      layout: [],
      module: 5, // 传统媒体
      dropConf: dropConfig.traditional,
      childValue: '',
      leftColumn: {
        arr: [], search: false
      },
      dialogVisiblemore: false,
      chardata: []
    }
  },
  async mounted() {
    await this.queryDataList()
    this.getDropTemplate()
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
    },
    commonChartData() {
      this.loadTraditionManuscriptTrend() // 发文情况
      this.loadTraditionDispatchHabit() // 发文习惯
      this.loadWechatDispatchHotWord() // 发文热词
      this.loadSearchWenHaiHotArticle() // 热文TOP10
      this.loadWechatTotalData() // 宏观数据
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
    // 发文习惯
    loadTraditionDispatchHabit() {
      const _that = this
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
            _that.dropConf.FWXG.loading = false
            _that.dropConf.FWXG.data.arr = res.data[0].data
          } else {
            _that.dropConf.FWXG.loading = false
            _that.dropConf.FWXG.noData = true
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
            this.dropConf.RMTOP.data.arr = res.data
            this.dropConf.RMTOP.loading = false
          } else {
            this.dropConf.RMTOP.loading = false
            this.dropConf.FWXG.noData = true
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 发文热词
    loadWechatDispatchHotWord() {
      const _that = this
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
            _that.dropConf.FWRC.loading = false
            _that.dropConf.FWRC.data.arr = res.data[0].value
          } else {
            _that.dropConf.FWRC.loading = false
            _that.dropConf.FWRC.noData = true
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
        channelTypes: [1, 2],
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

