<template>
  <div class="boxWarp">
    <leftColumn :sidebar="leftColumn" @childLeftID="childLeftID" />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <numberPapers :papers="papers" />
      <div class="buttongruop">
        <buttonGruop />
      </div>
      <EChartGrid :layout="layout" />
      <vip-line />
      <EChartGrid :layout="vipLayout" />
    </div>
  </div>
</template>
<script>
import numberPapers from '@/components/viewEcharts/numberpapers'
import buttonGruop from '@/components/viewEcharts/buttongruop.vue' // 累计总量 时间
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import EChartGrid from '@/components/echartGrid'
import VipLine from '@/components/vipLine'

import { getNowFormatDateHMS } from '@/time' // 获取当前时间
import {
  getWechatManuscriptTrend,
  getWechatReadTrend,
  getWechatOrMblogInteractionTrend,
  selectSexProportionList, selectProvinceList,
  selectFansChangeTrend
} from '@/api/accountAnalysis'

export default {
  name: 'AnalysisIndex',
  components: {
    VipLine,
    numberPapers,
    buttonGruop,
    leftColumn,
    EChartGrid
  },
  data() {
    return {
      papers: [{
        name: '发文数',
        number: '580,886'
      }, {
        name: '粉丝量',
        number: '235,110'
      }, {
        name: '阅读量',
        number: '5,886'
      }, {
        name: '分享量',
        number: '580,886'
      }, {
        name: '评论量',
        number: '468'
      }, {
        name: '点赞量',
        number: '180,881'
      }, {
        name: '在看量',
        number: '156'
      }],
      childValue: '',
      leftColumn: {
        arr: [{ isShow: true, title: '人民日报', id: 0 }, { title: '人民网', id: 1 }, {
          isShow: true,
          title: '新华视点',
          id: 2
        }],
        search: false
      },
      layout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '0', chart: 'papers',
          data: {
            name: '发文情况',
            id: 'paperName',
            datax: [],
            datay: []
          },
          leftHint: { name: '发文情况' },
          rightHint: { name: '总发文量', count: 89757, haveLoad: true, more: false }
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '1', chart: 'statusofpapers',
          data: {
            arr: [
              {
                value: 220,
                name: '18:01-21:00'
              },
              {
                value: 100,
                name: '18:01-21:01'
              },
              {
                value: 20,
                name: '18:01-21:02'
              },
              {
                value: 50,
                name: '18:01-21:03'
              },
              {
                value: 120,
                name: '18:01-21:04'
              },
              {
                value: 180,
                name: '18:01-21:05'
              },
              {
                value: 105,
                name: '18:01-21:06'
              },
              {
                value: 123,
                name: '18:01-21:07'
              }
            ]
          },
          leftHint: { name: '发文习惯' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '2', chart: 'hotModel',
          data: {
            arr: [
              { name: '参与', value: 30 },
              { name: '教育', value: 28 },
              { name: '创新', value: 24 },
              { name: '引导', value: 23 },
              { name: '就业', value: 22 },
              { name: '目标', value: 21 },
              { name: '读书', value: 20 },
              { name: '考试', value: 29 },
              { name: '理解', value: 28 },
              { name: '作业', value: 27 },
              { name: '实验', value: 26 },
              { name: '物理', value: 25 },
              { name: '数学', value: 24 },
              { name: '耐心', value: 30 },
              { name: '放纵', value: 18 },
              { name: '实践', value: 26 },
              { name: '生理', value: 25 },
              { name: '地理', value: 24 },
              { name: '化学', value: 30 },
              { name: '品味', value: 18 }
            ]
          },
          leftHint: { name: '发文热词' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '3', chart: 'Reading',
          data: {
            id: 'reading',
            arr: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110]
          },
          leftHint: { name: '阅读情况' },
          rightHint: { name: '总阅读量', count: 89757, haveLoad: true, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '4', chart: 'Interaction',
          data: {
            arr: [
              {
                name: '分享量',
                value: [12, 13, 12, 13, 12, 13, 13, 12, 13, 13, 12, 13]
              }, {
                name: '评论量',
                value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
              }, {
                name: '点赞量',
                value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
              }
            ],
            datax: ['01/02', '02/02', '03/02', '04/02', '05/02', '06/02', '07/02', '08/02', '09/02', '10/02', '11/02', '12/02']
          },
          leftHint: { name: '互动情况' },
          rightHint: { name: '总互动量', count: 89757, haveLoad: true, more: false }
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '5', chart: 'hotdocumentable',
          data: {
            arr: [
              {
                date: '2021-03-03',
                hot: '32983',
                title: '第八届高等学校科学研究优秀成果奖（人文社会科学）颁奖会召开'
              }, {
                date: '2021-03-02',
                hot: '24216',
                title: '创造更为公平的受教育机会 党的十八大以来，514万建档立卡贫困学生接受高等教育'
              }, {
                date: '2021-03-03',
                hot: '4378',
                title: '教育部部署做好2021年普通高校招生工作'
              }, {
                date: '2021-02-25',
                hot: '1245',
                title: '教育部启动实施新一轮审核评估 本科教育评价改革出“硬招”'
              }, {
                date: '2021-02-27',
                hot: '788',
                title: '国家中小学课程资源建设总结交流会召开'
              }
            ],
            Sort: true // 未超过5名 前三名有样式区分
          },
          leftHint: { name: '热门TOP10' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        }
      ],
      vipLayout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '0', chart: 'geoMap', data: {
            id: 'geomap',
            arr: [
              {
                name: '黑龙江',
                value: 15
              },
              {
                name: '浙江',
                value: 104
              },
              {
                name: '江西',
                value: 36
              },
              {
                name: '湖北',
                value: 1052
              },
              {
                name: '湖南',
                value: 1052
              }
            ]
          },
          leftHint: { name: '粉丝地域分布' },
          rightHint: { name: '总粉丝量', count: '89757', haveLoad: true }
        },
        {
          'x': 3,
          'y': 0,
          'w': 3,
          'h': 3,
          'i': '1',
          chart: 'roundedRing',
          data: {
            arr: [95, 70]
          },
          leftHint: { name: '粉丝性别比例' },
          rightHint: { name: null, count: null, haveLoad: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '2', chart: 'papers',
          data: {
            name: '粉丝关注变化量',
            id: 'paperName3',
            datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
            datay: [13, 10, 3, 12, 15, 30, 15]
          },
          leftHint: { name: '粉丝关注变化量' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        }
      ],
      nowtime: '',
      times: '',
      timetype: ''
    }
  },
  computed: {
    storetime() {
      return this.$store.getters.buttontime// 需要监听的数据
    }
  },
  watch: {
    storetime(val, newval) {
      if (val) {
        this.times = val
        this.timetype = this.$store.getters.timetype
        this.loadManuscriptTrend() // 发文情况
        this.loadReadTrend() // 阅读情况
        // this.loadInteraction() // 互动量变化趋势
        // this.selectSexProportionList()
        // this.selectFansChangeTrend()
        // this.selectProvinceList()
      }
    }
  },
  beforeCreate() {
    this.times = this.$store.getters.buttontime
    this.timetype = this.$store.getters.timetype
    // this.loadManuscriptTrend() // 发文情况
    // this.loadReadTrend() // 阅读情况
  },
  methods: {
    childLeftID(childValue) {
      this.childValue = childValue
    },
    loadManuscriptTrend() {
      const _that = this
      // 发文情况
      const Manuscriptparam = {
        channelType: 4, // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        accountName: '人民网', // 账号名称
        tenantId: 5,
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        timeType: this.timetype // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }

      getWechatManuscriptTrend(Manuscriptparam).then((res) => {
        if (res.success) {
          const datas = res.data[0]
          for (var i = 0; i < this.layout.length; i++) {
            if (this.layout[i].leftHint.name === '发文情况') {
              const ids = _that.layout[i].data
              ids.datax = datas.time
              ids.datay = datas.data[0].data
              this.layout[i].rightHint.count = datas.total
            }
          }
        }
      })
    },

    loadReadTrend() {
      const _that = this

      // 阅读量
      const readparam = {
        channelType: 4, // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
        accountName: '人民网', // 账号名称
        tenantId: 5,
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        timeType: this.timetype // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }

      // getWechatReadTrend(readparam).then((res) => {
      //   if (res.message === '查询成功！') {
      //     const datas = res.data[0]
      //     for (var i = 0; i < this.layout.length; i++) {
      //       if (this.layout[i].leftHint.name === '阅读情况') {
      //         const ids = _that.layout[i].data
      //         ids.datax = datas.time
      //         ids.datay = datas.data[0].data
      //         this.layout[i].rightHint.count = datas.total
      //       }
      //     }
      //   }
      // })
    },

    // loadInteraction() {
    //   // const _that = this
    //   const param = {
    //     channelType: 4, // 渠道类型 1:网站 2:电子报纸 3:APP 4:微信 5:微博 6:头条 7:抖音 8:快手
    //     accountName: '人民网', // 账号名称
    //     tenantId: 5,
    //     startTime: this.times,
    //     endTime: getNowFormatDateHMS(),
    //     timeType: this.timetype // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
    //   }
    //   getWechatOrMblogInteractionTrend(param).then((res) => {
    //     if (res.message === '查询成功！') {
    //       const datas = res.data[0]
    //       for (var i = 0; i < this.layout.length; i++) {
    //         if (this.layout[i].leftHint.name === '互动情况') {
    //           this.layout[i].data.arr = datas.data
    //           this.layout[i].data.datax = datas.time
    //           this.layout[i].rightHint.count = datas.total
    //         }
    //       }
    //     }
    //   })
    // },
    // 微信粉丝情况-地域分布接口
    selectSexProportionList() {
      const params = {
        channelType: 4,
        mediaName: '人民网', // 账号名称
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        mediaId: 5
      }
      selectSexProportionList(params)
        .then(res => {
          console.log(res, 'resselectSexProportionList')
        })
        .catch(err => {
          console.log(err, 'errselectSexProportionList')
        })
    },
    // 微信粉丝情况-性别比例接口
    selectFansChangeTrend() {
      const params = {
        channelType: 4,
        mediaName: '人民网', // 账号名称
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        mediaId: 5
      }
      selectFansChangeTrend(params)
        .then(res => {
          console.log(res, 'selectFansChangeTrend')
        })
        .catch(err => {
          console.log(err, 'selectFansChangeTrend')
        })
    },
    // 微信粉丝情况-新增粉丝量变化
    selectProvinceList() {
      const params = {
        channelType: 4,
        mediaName: '人民网', // 账号名称
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        mediaId: ''
      }
      selectProvinceList(params)
        .then(res => {
          console.log(res, 'selectProvinceList')
        })
        .catch(err => {
          console.log(err, 'selectProvinceList')
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
