<template>
  <div class="totaltable" style="width:100%;height:100%;display:flex">
    <div v-for="(item,index) in chartData.arr" :key="index" :style="calcWidth" class="hotText">
      <p v-if="item.name" class="hotBoxTitle">{{ item.name }}</p>
      <el-table
        :data="item.articles?item.articles:item.value"
        style="padding: 0 0 0 16px;"
        stripe
      >
        <el-table-column
          type="index"
          label="排名"
          width="60"
        >
          <template slot-scope="scope">
            <div v-if="scope.$index==0" class="indexone">
              {{ scope.$index + 1 }}
            </div>
            <div v-else-if="scope.$index==1" class="indextwo">
              {{ scope.$index + 1 }}
            </div>
            <div v-else-if="scope.$index==2" class="indexthere">
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
            <div v-if="scope.$index==0" class="titleone">
              {{ getTitleName(scope.row) }}
            </div>
            <div v-else-if="scope.$index==1" class="titletwo">
              {{ getTitleName(scope.row) }}
            </div>
            <div v-else-if="scope.$index==2" class="titlethere">
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
            <div v-if="scope.$index==0" class="titleone">
              {{ isNaN(scope.row.trans_num) ? scope.row.interaction_num : scope.row.trans_num }}
            </div>
            <div v-else-if="scope.$index==1" class="titletwo">
              {{ isNaN(scope.row.trans_num) ? scope.row.interaction_num : scope.row.trans_num }}
            </div>
            <div v-else-if="scope.$index==2" class="titlethere">
              {{ isNaN(scope.row.trans_num) ? scope.row.interaction_num : scope.row.trans_num }}
            </div>
            <div v-else>
              {{ isNaN(scope.row.trans_num) ? scope.row.interaction_num : scope.row.trans_num }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Totaltable',
  props: {
    chartData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      form: {
        datetime: ''
      }
    }
  },
  computed: {
    calcWidth() {
      if (this.chartData.arr.length === 1) {
        return { width: '100%', height: '100%' }
      } else if (this.chartData.arr.length === 2) {
        return { width: '50%', height: '100%', float: 'left' }
      } else {
        return { minWidth: parseInt(100 / this.chartData.length) + '%', maxWidth: '50%', height: '100%', float: 'left' }
      }
    }
  },
  methods: {
    // 获取发文标题
    getTitleName(row) {
      return (row.video_name ? row.video_name : row.title ? row.title
        : row.weibo_name ? row.weibo_name : row.wechat_name)
    }
  }

}
</script>

<style scoped lang="scss">
/deep/ .el-table tr {
  height: 38px;
}
/deep/ .el-table th {
  padding: 0;
}
/deep/ .hotText:first-child .el-table {
}
.hotText {
  p {
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    background: #F8F9FB;
    margin: 0 0 16px 16px;
  }
}
.totaltable {
  background: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  //padding: 13px 6px;
  overflow-y: auto;
}
.totaltable .totaltable_left_button {
  display: flex;
}
.totaltable .totaltable_left_button button {
  flex: 1;
  margin-right: 10px;
}
.line {
  text-align: center;
}
.totaltable_right_data h2 {
  color: #606266;
}
.table_left, .table_right {
  margin: 0 20px;
}
.table_left {
  margin-left: 0;
}
.table_right {
  margin-right: 0;
}
.middle {
  text-align: center;
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
