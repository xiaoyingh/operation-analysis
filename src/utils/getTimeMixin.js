export default {
  data() {
    return {
      throttle: false, // 节流
      startTime: '',
      endTime: '',
      timeType: '',
      firstInit: true // 是否是首次加载
    }
  },
  computed: {
    getStartTime() {
      return this.$store.getters.startTime // 监听起始时间
    },
    getEndTime() {
      return this.$store.getters.endTime // 监听结束时间
    }
  },
  watch: {
    getStartTime() {
      this.handleThrottle()
    },
    getEndTime() {
      this.handleThrottle()
    }
  },
  methods: {
    handleThrottle() {
      if (this.throttle) return
      this.throttle = true
      setTimeout(() => {
        this.throttle = false
      }, 2000)
      this.startTime = this.$store.getters.startTime
      this.endTime = this.$store.getters.endTime
      this.timeType = this.$store.getters.timeType
      // 第一次初始化需要等layout模板获取后加载图表数据
      if (this.firstInit) return
      // 获取普通账号数据
      this.commonChartData()
      for (const item in this.dropConf) {
        // 不要从目标对象访问 Object 原型方法
        if (Object.prototype.hasOwnProperty.call(this.dropConf, item)) {
          this.dropConf[item].loading = true
        }
      }
      if (this.vipChartData) {
        for (const itemVip in this.dropConfVip) {
          if (Object.prototype.hasOwnProperty.call(this.dropConfVip, itemVip)) {
            this.dropConfVip[itemVip].loading = true
          }
        }
      }
      // 有vip数据则获取vip账号数据
      this.vipChartData && this.vipChartData()
    }
  }
}
