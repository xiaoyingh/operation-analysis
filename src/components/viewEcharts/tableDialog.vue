<template>
  <div>
    <el-dialog
      title="标题"
      :visible.sync="visible"
      :show="show"
      @close="$emit('update:show', false)"
    >
      <el-table :data="tableData">
        <el-table-column property="date" label="日期" width="150" />
        <el-table-column property="name" label="姓名" width="200" />
        <el-table-column property="address" label="地址" />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="20"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  }
}
</script>
