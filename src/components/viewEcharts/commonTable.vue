<template>
  <!-- 普通表格 -->
  <div>
    <el-table
      :data="chartData.tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="(item,index) in chartData.tableHeard"
        :key="index"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable || false"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    chartData: {
      type: Object,
      default: () => ({
        tableHeard: [],
        tableData: []
      })
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: $tableStripe;
}
/deep/ .el-table thead tr th {
  background: $tableStripe;
}
/deep/ .el-table tr td {
  padding: 2px 0;
}
/deep/ .el-table tr {
  height: 38px;
}
/deep/ .el-table th, .el-table td {
  padding: 7px 0;
}
</style>
