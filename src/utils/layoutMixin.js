import { getTemplate } from '@/api/commonInterface'

export default {
  methods: {
    getDropTemplate(isVip = 0) {
      const params = {
        userId: 1,
        tenantId: 5,
        module: this.module,
        isVip: isVip // 是否是vip 0:不是，1:不是
      }
      getTemplate(params)
        .then(res => {
          if (isVip === 0) {
            this.layout = JSON.parse(res.data[0].template)
            this.commonChartData() // 获取普通账号数据
          } else {
            this.vipLayout = JSON.parse(res.data[0].template)
            this.vipChartData() // 获取vip账号数据
          }
          this.firstInit = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateDropTemplate(layout, isVip) {
      const params = {
        userId: 1,
        tenantId: 5,
        module: this.module,
        template: JSON.stringify(layout),
        isVip: isVip // 是否是vip 0:不是，1:不是
      }
      this.$store.dispatch('accountAnalysis/updateLayoutAction', params)
    }
  }
}
