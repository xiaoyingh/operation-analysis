<template>
  <div>
    <div style="height: 100%;" class="hot-article">
      <div ref="articlemain" v-loading="loadingInstance" class="article-main" style="height: calc(100% - 44px)">
        <div v-if="notCount" class="notCount">
          <div class="nodata">
            <img src="@/assets/images/nodata.png" alt="">
            <p>暂无统计数据</p>
          </div>
        </div>
        <el-table
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
import { searchWenHaiHotArticle } from '@/api/accountAnalysis'
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
      RMTOPData: [],
      notCount: false,
      pageNo: 1,
      hotsort: true
    }
  },
  watch: {
    chartData(val, newval) {
      if (val) {
        this.loadmoreDragdata(this.chartData[0].pageNo)
      }
    }
  },
  created() {
    this.loadmoreDragdata(this.chartData[0].pageNo)
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
      this.loadmoreDragdata(val)
    },

    // 获取发文标题
    getTitleName(row) {
      return (row.video_name ? row.video_name : row.title ? row.title
        : row.weibo_name ? row.weibo_name : row.wechat_name)
    },

    loadmoreDragdata(pageNo) {
      const params = {
        channelType: this.chartData[0].channelType,
        accountName: this.chartData[1].accountName,
        startTime: this.chartData[2].startTime,
        endTime: this.chartData[3].endTime,
        tenantId: 5,
        pageNo: pageNo,
        pageSize: 10
      }
      searchWenHaiHotArticle(params)
        .then(res => {
          if (res.data.length === 0) {
            this.notCount = true
            this.RMTOPData = []
            this.hottoal = 0
          } else {
            this.notCount = false
            this.hottoal = res.data.length > 0 ? res.data[0].total : 0
            this.RMTOPData = res.data[0].articles
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
