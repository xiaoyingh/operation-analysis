<template>
  <!--    账号总览-->
  <div class="boxWarp">
    <div class="boxRightWarp">
      <Numberpapers :papers="papers" />
      <div class="button_group">
        <Buttongruop>
          <el-button
            class="dialogBtn"
            plain
            size="small"
            @click="dialogVisible = true"
          >
            数据来源
          </el-button>
        </Buttongruop>
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
    <!--  账号总览   -->
    <el-dialog
      title="管理数据来源"
      :visible.sync="dialogVisible"
      width="1096px"
    >
      <AccountOverview @parentFun="getChildData">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </AccountOverview>
    </el-dialog>

    <!--  热文top10更多   -->
    <el-dialog
      title="热文top10"
      :visible.sync="dialogVisiblemore"
      width="1096px"
    >
      <div style="height: 100%;" class="hot-article">
        <el-tabs v-model="activeName" style="height: 100%;" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item,index) in tabList"
            :key="index"
            :label="item.name"
            :name="item.id"
          />
          <div ref="articlemain" class="article-main" style="height: calc(100% - 44px)">
            <el-table
              v-loading="loadingInstance"
              :data="RMTOPData"
              style="padding: 0 0 0 16px;"
              stripe
            >
              <el-table-column
                type="index"
                label="排名"
                width="60"
              >
                <template slot-scope="scope">
                  <div v-if="scope.$index==0 && hotsort" class="indexone">
                    {{ scope.$index + 1 }}
                  </div>
                  <div v-else-if="scope.$index==1 && hotsort" class="indextwo">
                    {{ scope.$index + 1 }}
                  </div>
                  <div v-else-if="scope.$index==2 && hotsort" class="indexthere">
                    {{ scope.$index + 1 }}
                  </div>
                  <div v-else class="middle">
                    {{ scope.$index + 1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="title"
                label="发文标题"
              >
                <template slot-scope="scope">
                  <div v-if="scope.$index==0 && hotsort" class="titleone">
                    {{ getTitleName(scope.row) }}
                  </div>
                  <div v-else-if="scope.$index==1 && hotsort" class="titletwo">
                    {{ getTitleName(scope.row) }}
                  </div>
                  <div v-else-if="scope.$index==2 && hotsort" class="titlethere">
                    {{ getTitleName(scope.row) }}
                  </div>
                  <div v-else>
                    {{ getTitleName(scope.row) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="pubtime"
                label="发文时间"
              />
              <el-table-column
                prop="trans_num"
                label="热度值"
              >
                <template slot-scope="scope">
                  <div v-if="scope.$index==0 && hotsort" class="titleone">
                    {{ scope.row.trans_num }}
                  </div>
                  <div v-else-if="scope.$index==1 && hotsort" class="titletwo">
                    {{ scope.row.trans_num }}
                  </div>
                  <div v-else-if="scope.$index==2 && hotsort" class="titlethere">
                    {{ scope.row.trans_num }}
                  </div>
                  <div v-else>
                    {{ scope.row.trans_num }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tabs>
      </div>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="hottoal"
        @current-change="changetotalhot"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddendrag()">取 消</el-button>
        <el-button type="primary" @click="hiddendrag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Numberpapers from '@/components/viewEcharts/numberpapers'
import Buttongruop from '@/components/viewEcharts/buttongruop'
import EChartGrid from '@/components/echartGrid'
import AccountOverview from '@/components/accountNumber/accountOverview'
import {
  accountRank, getAnalysisOverviewHotArticle,
  getDispatchHotWord, getInteractionTrend, getManuscriptTrend, getNewFansTrend,
  getWechatReadTrend, totalData
} from '@/api/accountAnalysis'
import { getAccountAnalysisyi, selectManagementAnalysis, updateAccountAnalysis } from '@/api/comparativeAnalysis'
import getTimeMixin from '@/utils/getTimeMixin'
import dropConfig from '@/utils/drop.config.json'
import layoutMixin from '@/utils/layoutMixin'

export default {
  name: 'AccountAnalysis',
  components: { EChartGrid, Buttongruop, Numberpapers, AccountOverview },
  mixins: [getTimeMixin, layoutMixin],
  data() {
    return {
      addArr: [],
      papers: [
        {
          name: '总发文量',
          prop: 'articlesCount',
          number: ''
        }, {
          name: '粉丝量',
          prop: 'fansCount',
          number: ''
        }, {
          name: '总阅读/播放量',
          prop: 'readCount',
          number: ''
        }, {
          name: '总转发/分享量',
          prop: 'rttCount',
          number: ''
        }, {
          name: '总评论量',
          prop: 'cmtCount',
          number: ''
        }, {
          name: '总点赞量',
          prop: 'zaikanCount',
          number: ''
        }
      ],
      tabList: [ // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        { name: '微信榜单', id: '5' },
        { name: '微博榜单', id: '6' },
        { name: '抖音', id: '7' },
        { name: '快手', id: '8' },
        { name: '网站', id: '1' },
        { name: '电子报纸榜单', id: '2' }
      ],
      activeName: '5',
      loadingInstance: '',
      show: false,
      dialogVisible: false,
      dialogVisiblemore: false,
      dropConf: dropConfig.index,
      layout: [],
      module: 1, // 账号总览模块
      accountListRequestList: [],
      pageNo: 1,
      hottoal: 0,
      hotindex: '',
      RMTOPData: [],
      hotsort: true,
      notCount: false
    }
  },
  provide() {
    return {
      'app': this
    }
  },
  async mounted() {
    await this.getMyAssign()
    this.getDropTemplate()
  },
  methods: {

    // 更多的弹框开始 ================================================================
    loadmoreDrag() {
      this.dialogVisiblemore = true
      this.activeName = '5'
      this.hotsort = true
      this.loadingInstance = true
      this.loadmoreDragdata(2) // 热文TOP10
    },

    // 热门更多的分页
    changetotalhot(val) {
      this.pageNo = val
      if (val !== 1) {
        this.hotsort = false
      } else {
        this.hotsort = true
      }
      this.loadingInstance = true
      this.loadmoreDragdata(2)
    },

    hiddendrag() {
      this.pageNo = 1
      this.dialogVisiblemore = false
      this.loadmoreDragdata(2)
    },

    handleClick(tab) {
      // 切换开启loading
      this.loadingInstance = true
      this.pageNo = 1
      this.hotsort = true
      this.hotindex = Number(tab.name)
      this.loadmoreDragdata(Number(tab.name))
    },

    // 获取发文标题
    getTitleName(row) {
      return (row.video_name ? row.video_name : row.title ? row.title
        : row.weibo_name ? row.weibo_name : row.wechat_name)
    },

    loadmoreDragdata(number) {
      const params = {
        // channelType: this.accountListRequestList.map(item => item.channelType),
        channelType: 2,
        accountListRequestList: this.accountListRequestList.filter(item => item.channelType === number),
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        pageNo: this.pageNo,
        pageSize: 10
      }
      getAnalysisOverviewHotArticle(params)
        .then(res => {
          if (res.success) {
            if (res.data.length === 0) {
              this.notCount = true
              this.RMTOPData = []
              this.hottoal = 0
            } else {
              this.notCount = false
              this.hottoal = res.data.length > 0 ? res.data[0].total : 0
              this.RMTOPData = res.data[0].value
            }
          } else {
            this.hottoal = 0
            this.RMTOPData = []
          }
          this.loadingInstance = false
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 更多的弹框结束 ====================================================================

    // 获取已选则的账号-顶部
    async getMyAssign() {
      const obj = {
        tenantId: 5,
        moduleType: 1
      }
      const res = await getAccountAnalysisyi(obj)
      if (res && res.data) {
        let selected = res.data
        // 如果初始时没有选择 则选中全部
        if (selected.length === 0) {
          selected = await this.selectManagementAnalysis()
        }
        this.getNewAccountListRequestList(selected)
      }
    },
    // 获取所有账号
    selectManagementAnalysis() {
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 100,
        channelType: null,
        organizationName: '',
        accountType: '',
        accountName: ''
      }
      return new Promise((resolve, reject) => {
        selectManagementAnalysis(obj).then(res => {
          if (res && res.data) {
            const cardLists = res.data
            const arr = []
            for (let i = 0; i < cardLists.length; i++) {
              for (let j = 0; j < cardLists[i].data.length; j++) {
                arr.push(cardLists[i].data[j])
                resolve(arr)
              }
            }
          }
        }).catch(res => {
          reject(res)
        })
      })
    },
    addAccount() {
      console.log(this.addArr, 'this.addArr')
      if (this.addArr.length <= 0) {
        this.$message({
          message: '请选择要分析的账号',
          type: 'warning'
        })
        return
      }
      updateAccountAnalysis(this.addArr).then((res) => {
        if (res && res.data && res.success) {
          this.$message.success('添加成功！')
          this.dialogVisible = false
          // 获取普通账号数据
          this.getNewAccountListRequestList(this.addArr)
          for (const item in this.dropConf) {
            // 不要从目标对象访问 Object 原型方法
            if (Object.prototype.hasOwnProperty.call(this.dropConf, item)) {
              this.dropConf[item].loading = true
            }
          }
          this.commonChartData()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取接口请求所需参数
    getNewAccountListRequestList(arr) {
      this.accountListRequestList = []
      arr.forEach(item => {
        this.accountListRequestList.push({
          channelType: item.channelType,
          accountName: item.mediaName
        })
      })
    },
    // 子組件觸發父組件的方法
    getChildData(data) {
      this.addArr = data
    },
    commonChartData() {
      this.loadTotalData() // 获取宏观数据
      this.loadDispatchHotWord() // 发文热词
      this.loadSearchWenHaiHotArticle(2) // 热文TOP10
      this.loadInteraction() // 互动量变化趋势
      this.loadNewFansTrend() // 新增粉丝量
      this.loadAccountRank() // 获取机构下账号各渠道榜单
      this.loadManuscriptTrend() // 发文情况
      this.loadReadTrend() // 阅读情况
    },
    // 发文情况
    loadManuscriptTrend() {
      const ManuscriptParam = {
        tenantId: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        accountListRequestList: this.accountListRequestList,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      getManuscriptTrend(ManuscriptParam).then((res) => {
        if (res.success) {
          const datas = res.data[0]
          const ids = this.dropConf.FWL
          ids.loading = false
          ids.data.dataX = datas.time
          datas.data.length > 0 && (ids.data.dataY = datas.data[0].data)
          datas.data.length === 0 ? ids.noData = true : ids.noData = false
          ids.rightHint.count = datas.total
        }
      })
    },
    // 阅读量
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
          const datas = res.data[0]
          const ids = this.dropConf.YDL
          ids.data.dataX = datas.time
          datas.data.length > 0 && (ids.data.dataY = datas.data[0].data)
          datas.data.length === 0 ? ids.noData = true : ids.noData = false
          ids.loading = false
          ids.rightHint.count = datas.total
        }
      })
    },
    // 互动情况
    loadInteraction() {
      const param = {
        accountListRequestList: this.accountListRequestList,
        tenantId: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        timeType: this.timeType // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      getInteractionTrend(param).then((res) => {
        if (res.success) {
          const datas = res.data[0]
          this.dropConf.HDQK.data.arr = datas.data
          this.dropConf.HDQK.data.dataX = datas.time
          this.dropConf.HDQK.loading = false
          this.dropConf.HDQK.rightHint.count = datas.total
          datas.time.length === 0 ? this.dropConf.HDQK.noData = true : this.dropConf.HDQK.noData = false
        }
      })
    },
    // 发文热词
    loadDispatchHotWord() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5
      }
      getDispatchHotWord(params)
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
    // 热文TOP10
    loadSearchWenHaiHotArticle(id) {
      const params = {
        // channelType: this.accountListRequestList.map(item => item.channelType),
        channelType: id,
        accountListRequestList: this.accountListRequestList.filter(item => item.channelType === id),
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        pageNo: this.pageNo,
        pageSize: 10
      }
      getAnalysisOverviewHotArticle(params)
        .then(res => {
          if (res.success) {
            this.hottoal = res.data.length > 0 ? res.data[0].total : 0
            this.dropConf.RMTOP.loading = false
            this.dropConf.RMTOP.data.arr = res.data
          } else {
            this.hottoal = 0
            this.dropConf.RMTOP.loading = false
            this.dropConf.RMTOP.noData = true
          }
          this.loadingInstance = false
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 新增粉丝量趋势图
    loadNewFansTrend() {
      const params = {
        accountListRequestList: this.accountListRequestList,
        startTime: this.startTime,
        endTime: this.endTime,
        tenantId: 5,
        timeType: this.timeType
      }
      getNewFansTrend(params)
        .then(res => {
          if (res.success) {
            const datas = res.data[0]
            const ids = this.dropConf.XZFSL
            ids.loading = false
            ids.data.dataX = datas.time
            datas.data.length > 0 && (ids.data.dataY = datas.data[0].data)
            datas.data.length === 0 ? ids.noData = true : ids.noData = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 获取机构下账号各渠道榜单
    loadAccountRank(type = 5) {
      const params = {
        channelTypes: [type], // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手(RequestList中的类型集合)
        dataType: 1, // 数据分类 1:发文量(日均发文) 2：粉丝量 3：阅读量 4：总互动量 5：分享量 6：评论量 7:点赞量 8：在看量
        tenantId: 5,
        accountListRequestList: this.accountListRequestList.filter(item => item.channelType === type),
        start_time: this.startTime,
        end_time: this.endTime,
        timeType: this.timeType,
        order: 1 // 排序 0:从低到高 1:从高到底
      }
      accountRank(params)
        .then(res => {
          if (res.success) {
            res.data.length === 0 ? this.dropConf.QDBD.noData = true : this.dropConf.QDBD.noData = false
            this.dropConf.QDBD.data.tableData = res.data
            this.dropConf.QDBD.loading = false
          }
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 账号总览宏观数据
    loadTotalData(type = 5) {
      const params = {
        tenantId: 5,
        accountListRequestList: this.accountListRequestList
      }
      totalData(params)
        .then(res => {
          if (res.success) {
            const numObj = res.data[0]
            this.papers.forEach((item) => {
              item.number = numObj[item.prop]
            })
          }
        })
        .catch(err => {
          console.log(err, 'totalData')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.dialogBtn {
  width: 80px;
  height: 30px;
  padding: 0;
}

/deep/ .el-tabs__content {
  height: 500px;
  overflow-y: auto;
}

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

.titleone, .middle {
  color: #D50E0B;
  width: 26px;
  height: 26px;
}
.titletwo {
  color: #FF8D00;
}
.titlethere {
  color: #00A98B;
}
.indexone {
  text-align: center;
  color: #fff;
  background: url(../../assets/images/hotbig1.png) no-repeat;
  background-size: 100%;
  width: 26px;
  height: 26px;
  background-position: 0px -4px;
  font-size: 12px;
}
.indextwo {
  text-align: center;
  color: #fff;
  background: url(../../assets/images/hotbig2.png) no-repeat center;
  background-size: 100%;
  background-position: 0px -4px;
  width: 26px;
  height: 26px;
  font-size: 12px;
}
.indexthere {
  text-align: center;
  color: #fff;
  background: url(../../assets/images/hotbig3.png) no-repeat center;
  background-size: 100%;
  background-position: 0px -4px;
  width: 26px;
  height: 26px;
  font-size: 12px;
}
</style>
