<template>
  <div class="totaltable">
    <div v-if="chartData.Sort" style="width:100%">
      <el-table
        :data="chartData.arr"
        style="width: 100%"
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
              {{ scope.row.title }}
            </div>
            <div v-else-if="scope.$index==1" class="titletwo">
              {{ scope.row.title }}
            </div>
            <div v-else-if="scope.$index==2" class="titlethere">
              {{ scope.row.title }}
            </div>
            <div v-else class="title-four">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="发文时间"
        />
        <el-table-column
          prop="hot"
          label="热度值"
        >
          <template slot-scope="scope">
            <div v-if="scope.$index==0" class="titleone">
              {{ scope.row.hot }}
            </div>
            <div v-else-if="scope.$index==1" class="titletwo">
              {{ scope.row.hot }}
            </div>
            <div v-else-if="scope.$index==2" class="titlethere">
              {{ scope.row.hot }}
            </div>
            <div v-else>
              {{ scope.row.hot }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else style="width:100%">
      <el-table
        :data="chartData.arr"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="排名"
          width="150"
        >
          <template slot-scope="scope">
            <div>{{ scope.$index + 6 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="发文标题"
        />

        <el-table-column
          prop="date"
          label="发文时间"
        />
        <el-table-column
          prop="hot"
          label="热度值"
        />
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
  }

}
</script>

<style scoped lang="scss">
.totaltable {
  width: calc(100% - 32px);
  margin: 13px 16px;
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
/deep/ .el-table tr {
  height: 38px;
}
/deep/ .el-table th {
  padding: 0;
}
.middle {
  text-align: center;
}
.middle {
  color: #D50E0B;
  width: 26px;
  height: 26px;
}
.titleone {
  color: #D50E0B;
}
.titletwo {
  color: #FF8D00;
}
.titlethere {
  color: #00A98B;
}
.titleone, .middle, .titletwo, .titlethere,.title-four {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
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
