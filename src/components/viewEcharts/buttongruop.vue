<template>
  <div class="buttongroup_time">
    <div class="group-left">
      <div class="totaltable_left_button">
        <el-radio-group v-model="buttontime" class="Workinghours_top_btn">
          <el-radio-button label="one">近24小时</el-radio-button>
          <el-radio-button label="two">近7日</el-radio-button>
          <el-radio-button label="there">近30日</el-radio-button>
          <el-radio-button label="four">近3个月</el-radio-button>
          <el-radio-button label="five">近半年</el-radio-button>
          <el-radio-button label="six">近1年</el-radio-button>
        </el-radio-group>
      </div>
      <div class="totaltable_right_data">
        <el-date-picker
          v-model="datetime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
    </div>
    <div class="group-right">
      <slot />
    </div>
  </div>
</template>

<script>
import { getBeforeDay, getNowFormatDateHMS, getPreMonthDay, getBeforeWeek, getBeforeMonth, getBeforeYear } from '@/time'

export default {
  name: 'Buttongruop',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      datetime: '',
      buttontime: 'one',
      time: '',
      timetype: 3
    }
  },
  watch: {
    buttontime(val, newval) {
      switch (val) {
        case 'one':
          this.time = getBeforeWeek(getNowFormatDateHMS()) // 近24小时
          this.timetype = 3
          break
        case 'two':
          this.time = getBeforeWeek(getNowFormatDateHMS()) // 前七天
          this.timetype = 1
          break
        case 'there':
          this.time = getBeforeMonth(getNowFormatDateHMS()) // 近30日
          this.timetype = 1
          break
        case 'four':
          this.time = getPreMonthDay(getNowFormatDateHMS(), 3) // 前3个月
          this.timetype = 2
          break
        case 'five':
          this.time = getPreMonthDay(getNowFormatDateHMS(), 6) // 前半年
          this.timetype = 2
          break
        case 'six':
          this.time = getBeforeYear(getNowFormatDateHMS()) // 前一年
          this.timetype = 2
          break
      }
      this.$store.commit('accountAnalysis/buttontimeaction', this.time)
      this.$store.commit('accountAnalysis/timetypeaction', this.timetype)
    },

    datetime(val) {
      if (val) {
        // this.$store.commit('accountAnalysis/buttontimeaction', this.time)
      }
    }

  },
  created() {
    this.$store.commit('accountAnalysis/buttontimeaction', getBeforeDay(getNowFormatDateHMS()))
    this.$store.commit('accountAnalysis/timetypeaction', this.timetype)
  }

}
</script>

<style scoped lang="scss">
/deep/ .el-radio-group {
  display: flex;
  .el-radio-button {
    width: 90px;
  }
}
/deep/ .Workinghours_top_btn .el-radio-button__inner {
  display: inline-block;
  width: 100%;
  height: 24px;
  line-height: 24px;
  border: none;
  padding: 0;
  border-right: 1px solid #ccc;
  margin-right: 16px;
  border-radius: 0;
  margin-top: 14px;
  color: #333333;
  font-size: 14px;
  @include background-color('tab-nav-bg');
  @include color('tab-item-color');
}
/deep/ .Workinghours_top_btn label:last-child .el-radio-button__inner {
  border-right: none;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  -webkit-box-shadow: none;
  box-shadow: none;
}
/deep/ .Workinghours_top_btn {
  .is-active .el-radio-button__inner {
    background: #fff;
    color: $functionButtonColor;
  }
}
/deep/ .totaltable_right_data .el-date-editor {
  height: 32px;
  margin-right: 16px;
  border-color: #ccc;
  .el-input__icon, .el-range-separator {
    line-height: 26px;
  }
}
/deep/ .totaltable_right_data .el-date-editor {
  width: calc(100% - 16px);
  margin-top: 10px;
  margin-right: $margin16px;
}
/deep/ .totaltable_right_data .el-date-editor:hover {
  border-color: $functionButtonColor;
  .el-input__icon {
    color: $functionButtonColor;
  }
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0
}

</style>
