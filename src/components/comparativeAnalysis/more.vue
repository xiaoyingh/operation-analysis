<template>
  <div>
    <div style="height: 100%;" class="hot-article">
      <el-tabs v-model="activeName" style="height: 100%;" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item,index) in chartData[0].tabList"
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
  </div>
</template>
<script>
import { getContrastHotArticleexport } from '@/api/comparativeAnalysis'
export default {
  name: 'AnalysisIndex',
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loadingInstance: true,
      hottoal: 0,
      pageNo: 1,
      hotindex: '',
      RMTOPData: [],
      hotsort: true,
      notCount: false,
      activeName: '',
      tabList: [],
      accountListRequestList: []
    }
  },
  watch: {
    chartData(val, newval) {
      if (val) {
        this.loadmoreDragdata(1, 0)
      }
    }
  },
  created() {
    this.accountListRequestList = this.chartData[1].accountListRequestList
    this.activeName = this.chartData[0].tabList[0].name
    this.hotindex = 0
    this.loadmoreDragdata(1, 0)
  },
  methods: {
    // 热门更多的分页
    changetotalhot(val) {
      this.loadingInstance = true
      if (val !== 1) {
        this.hotsort = false
      } else {
        this.hotsort = true
      }
      this.loadmoreDragdata(val, this.hotindex)
    },
    handleClick(tab) {
      // 切换开启loading
      this.pageNo = 1
      this.hottoal = 0
      this.loadingInstance = true
      this.hotindex = tab.index
      this.hotsort = true
      this.loadmoreDragdata(1, tab.index)
    },

    // 获取发文标题
    getTitleName(row) {
      return (row.video_name ? row.video_name : row.title ? row.title
        : row.weibo_name ? row.weibo_name : row.wechat_name)
    },

    loadmoreDragdata(pageNo, number) {
      const params = {
        accountListRequestList: [{ channelType: this.accountListRequestList[number].channelType, accountName: this.accountListRequestList[number].accountName }],
        startTime: this.chartData[2].startTime,
        endTime: this.chartData[3].endTime,
        tenantId: 5,
        timeType: this.chartData[4].timeType,
        pageNo: pageNo,
        pageSize: 10
      }
      getContrastHotArticleexport(params)
        .then(res => {
          if (res.success) {
            if (res.data.length === 0) {
              this.notCount = true
              this.RMTOPData = []
              this.hottoal = 0
            } else {
              res.data[0].name = ''
              this.notCount = false
              this.hottoal = res.data.length > 0 ? res.data[0].total : 0
              this.RMTOPData = res.data[0].value
              console.log(res.data[0].value)
            }
          }
          this.loadingInstance = false
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    }
  }
}
</script>
<style scoped lang="scss">
/deep/.el-tabs__content {
    height: 500px !important;
    overflow-y: auto;
}
</style>
