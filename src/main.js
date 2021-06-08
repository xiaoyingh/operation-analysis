import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-ui.scss' // element css
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import '@/icons/iconfont/iconfont.css'

import '@/permission' // permission control
import '@/utils/directive'
// bus
import VueBus from 'vue-bus'
Vue.use(VueBus)

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'echarts-liquidfill'
// 引入全局css变量
import themes_style from '@/styles/themes.scss'
Vue.prototype.$themes_style = themes_style

// 时间格式转换
import moment from 'moment/moment'
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString) // 这是时间戳转时间
})
Vue.prototype.$moment = moment

// 全局过滤器
import * as custom from '@/utils/filters'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
