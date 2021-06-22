<template>
  <div class="buttongroup_time">
    <div class="group-left">
      <div class="totaltable_left_button">
        <el-radio-group v-model="startTime" class="Workinghours_top_btn">
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
          v-model="dateTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="daterangechange()"
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
import moment from 'moment'

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
      dateTime: '',
      startTime: 'one',
      time: '',
      timeType: 3
    }
  },
  watch: {
    startTime(val, newval) {
      switch (val) {
        case 'one':
          this.time = getBeforeDay(getNowFormatDateHMS()) // 近24小时
          this.timeType = 3
          break
        case 'two':
          this.time = getBeforeWeek(getNowFormatDateHMS()) // 前七天
          this.timeType = 1
          break
        case 'there':
          this.time = getBeforeMonth(getNowFormatDateHMS()) // 近30日
          this.timeType = 1
          break
        case 'four':
          this.time = getPreMonthDay(getNowFormatDateHMS(), 3) // 前3个月
          this.timeType = 2
          break
        case 'five':
          this.time = getPreMonthDay(getNowFormatDateHMS(), 6) // 前半年
          this.timeType = 2
          break
        case 'six':
          this.time = getBeforeYear(getNowFormatDateHMS()) // 前一年
          this.timeType = 2
          break
      }
      this.$store.commit('accountAnalysis/startTimeAction', this.time)
      this.$store.commit('accountAnalysis/timeTypeAction', this.timeType)
    },
    dateTime(val) {
      if (val) {
        const startT = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        const endT = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
        const days = this.getDaysBetween(startT, endT)
        // 1:以天为单位 2：以月为单位 3:以小时为单位
        if (days < 7) {
          this.timeType = 3
        } else if (days <= 90) {
          this.timeType = 1
        } else {
          this.timeType = 2
        }
        this.$store.commit('accountAnalysis/timeTypeAction', this.timeType)
        this.$store.commit('accountAnalysis/startTimeAction', startT)
        this.$store.commit('accountAnalysis/endTimeAction', endT)
      }
    }
  },
  created() {
    this.$store.commit('accountAnalysis/startTimeAction', getBeforeDay(getNowFormatDateHMS()))
    this.$store.commit('accountAnalysis/endTimeAction', moment().format('YYYY-MM-DD HH:mm:ss'))
    this.$store.commit('accountAnalysis/timeTypeAction', this.timeType)
    // console.log(this.$store.getters.startTime, this.$store.getters.endTime, this.$store.getters.timeType)
  },
  methods: {
    /**
     * 计算两个日期之间的天数
     * @param dateString1  开始日期 yyyy-MM-dd
     * @param dateString2  结束日期 yyyy-MM-dd
     * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
     */
    getDaysBetween(dateString1, dateString2) {
      const startDate = Date.parse(dateString1)
      const endDate = Date.parse(dateString2)
      if (startDate > endDate) {
        return 0
      }
      if (startDate === endDate) {
        return 1
      }
      return (endDate - startDate) / (24 * 60 * 60 * 1000)
    },
    daterangechange(date){
      console.log(date)
    }
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
  .el-radio-button__inner {
    background: transparent;
  }
}
/deep/ .Workinghours_top_btn {
  .is-active .el-radio-button__inner {
    background: transparent;
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
