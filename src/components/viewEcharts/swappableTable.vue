<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :label="item.name"
        :name="item.id"
      />
      <common-table :chart-data="chartData" />
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from '@/components/viewEcharts/commonTable'

export default {
  name: 'SwappableTable',
  components: { CommonTable },
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeName: '0',
      tabList: [
        { name: '微信榜单', id: '0' },
        { name: '微博榜单', id: '1' },
        { name: '短视频榜单', id: '2' },
        { name: '网站/电子报纸榜单', id: '3' }
      ],
      tableHeard: [
        {
          type: 'index',
          label: '排名',
          width: '50'
        },
        {
          prop: 'date',
          label: '账号',
          width: '180',
          sortable: true
        },
        {
          prop: 'address',
          label: '发文总量',
          width: '180'
        },
        {
          prop: 'name',
          label: '日均发文',
          width: ''
        },
        {
          prop: 'name',
          label: '粉丝量',
          width: ''
        },
        {
          prop: 'name',
          label: '阅读量',
          width: ''
        },
        {
          prop: 'name',
          label: '总互动量',
          width: ''
        },
        {
          prop: 'name',
          label: '分享量',
          width: ''
        },
        {
          prop: 'name',
          label: '评论量',
          width: ''
        },
        {
          prop: 'name',
          label: '点赞量',
          width: ''
        },
        {
          prop: 'name',
          label: '在看量',
          width: ''
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
///deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
//  background: $tableStripe;
//}
///deep/ .el-table thead tr th {
//  background: $tableStripe;
//}
///deep/ .el-table tr td {
//  padding: 2px 0;
//}
///deep/ .el-table tr {
//  height: 38px;
//}
///deep/ .el-table th, .el-table td {
//  padding: 7px 0;
//}
</style>
