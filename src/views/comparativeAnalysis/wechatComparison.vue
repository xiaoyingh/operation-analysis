<template>
  <div class="boxWarp">
    <leftColumn
      :sidebar="leftColumn"
      :cloumn-data="columnData"
      :sidebar-name="sidebarName"
    />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <div class="buttongruop">
        <buttonGruop />
      </div>
      <EChartGrid :layout="layout" />
    </div>
  </div>
</template>
<script>
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import buttonGruop from '@/components/viewEcharts/buttongruop' // 累计总量 时间
import EChartGrid from '@/components/echartGrid'
import { mapGetters } from 'vuex'
import { selectAccountAnalysis, newFansContrast } from '@/api/comparativeAnalysis'
import { getNowFormatDateHMS } from '@/time' // 获取当前时间
export default {
  name: 'WechatComparison',
  components: {
    leftColumn,
    buttonGruop,
    EChartGrid
  },
  data() {
    return {
      flag: false,
      columnData: [],
      sidebarName: '微信账号',
      leftColumn: {
        arr: [{ isShow: true, title: '人民日报', id: 0 }, { title: '人民网', id: 1 }, {
          isShow: true,
          title: '新华视点',
          id: 2
        }],
        search: true
      },
      layout: [
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '0', chart: 'commonTable',
          data: {
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
                prop: 'rijun',
                label: '日均发文',
                width: ''
              },
              {
                prop: 'fans',
                label: '粉丝量',
                width: ''
              },
              {
                prop: 'read',
                label: '阅读量',
                width: ''
              },
              {
                prop: 'hudong',
                label: '总互动量',
                width: ''
              },
              {
                prop: 'share',
                label: '分享量',
                width: ''
              },
              {
                prop: 'com',
                label: '评论量',
                width: ''
              },
              {
                prop: 'dianzan',
                label: '点赞量',
                width: ''
              },
              {
                prop: 'look',
                label: '在看量',
                width: ''
              }
            ],
            tableData: [
              {
                date: '人民日报',
                address: 98987,
                rijun: 121,
                fans: 656,
                read: 5355,
                hudong: 422,
                share: 3323,
                com: 3412,
                dianzan: 434,
                look: 1223
              },
              {
                date: '新华网',
                address: 98242,
                rijun: 3432,
                fans: 11121,
                read: 353,
                hudong: 543,
                share: 23323,
                com: 5454,
                dianzan: 122,
                look: 775
              },
              {
                date: '新华视点',
                address: 121334,
                rijun: 35435,
                fans: 65,
                read: 878,
                hudong: 21231,
                share: 122,
                com: 434,
                dianzan: 54554,
                look: 57657
              },
              {
                date: '人民网',
                address: 87121,
                rijun: 31312,
                fans: 34234,
                read: 3545,
                hudong: 6565,
                share: 12222,
                com: 35335,
                dianzan: 3456,
                look: 757456
              },
              {
                date: '央视新闻',
                address: 13423,
                rijun: 323213,
                fans: 2432,
                read: 24163,
                hudong: 4514,
                share: 5456,
                com: 3412,
                dianzan: 5653,
                look: 42565
              },
              {
                date: '中国新闻网',
                address: 3423,
                rijun: 3213,
                fans: 2432,
                read: 24163,
                hudong: 4514,
                share: 5456,
                com: 3412,
                dianzan: 5353,
                look: 6565
              },
              {
                date: '新华社',
                address: 2423,
                rijun: 323213,
                fans: 2432,
                read: 24163,
                hudong: 4514,
                share: 5456,
                com: 3412,
                dianzan: 56353,
                look: 4265
              }
            ]
          },
          leftHint: { name: '账号列表' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '2', chart: 'fansChanges',
          data: {
            arr: [
              {
                name: '账户A',
                value: [5, 10, 41, 35, 51, 49, 62]
              }, {
                name: '账户B',
                value: [50, 20, 35, 20, 75, 30, 60]
              }, {
                name: '账户C',
                value: [15, 30, 15, 40, 55, 20, 40]
              }, {
                name: '账户D',
                value: [35, 10, 25, 20, 15, 40, 20]
              }
            ],
            arrX: ['2020.09.12', '2020.09.13', '2020.09.14', '2020.09.15', '2020.09.16', '2020.09.17', '2020.09.18']
          },
          leftHint: { name: '发文量' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '3', chart: 'hotModelMore',
          data: [
            [
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
            ],
            [
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
          ],
          leftHint: { name: '发文热词对比' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '4', chart: 'fansChanges',
          data: {
            arr: [
              {
                name: '账户A',
                value: [5, 10, 41, 35, 51, 49, 62]
              }, {
                name: '账户B',
                value: [50, 20, 35, 20, 75, 30, 60]
              }, {
                name: '账户C',
                value: [15, 30, 15, 40, 55, 20, 40]
              }, {
                name: '账户D',
                value: [35, 10, 25, 20, 15, 40, 20]
              }
            ],
            arrX: ['2020.09.12', '2020.09.13', '2020.09.14', '2020.09.15', '2020.09.16', '2020.09.17', '2020.09.18']
          },
          leftHint: { name: '阅读变化量' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '5', chart: 'areatus',
          data: {
            arr: [
              ['product', '账户A', '账户B', '账户C'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1],
              ['Walnut', 72.4, 53.9, 35.1],
              ['Brownie', 76.4, 23.9, 49.1]
            ]
          },
          leftHint: { name: '互动量变化' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '6', chart: 'hotdocumentable',
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
          rightHint: { name: null, count: null, haveLoad: false, more: true }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '1', chart: 'fansChanges',
          data: {
            arr: [
              {
                name: '账户A',
                value: [5, 10, 41, 35, 51, 49, 62]
              }, {
                name: '账户B',
                value: [50, 20, 35, 20, 75, 30, 60]
              }, {
                name: '账户C',
                value: [15, 30, 15, 40, 55, 20, 40]
              }, {
                name: '账户D',
                value: [35, 10, 25, 20, 15, 40, 20]
              }
            ],
            arrX: ['2020.09.12', '2020.09.13', '2020.09.14', '2020.09.15', '2020.09.16', '2020.09.17', '2020.09.18']
          },
          leftHint: { name: '新增粉丝量对比' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
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
    },
    ...mapGetters(['tenantId'])
  },
  watch: {
    storetime(val, newval) {
      if (val) {
        this.times = val
        this.timetype = this.$store.getters.timetype
        this.loadInteraction() // 微信粉丝变化量
      }
    }
  },
  mounted() {
    // this.getSelectAccountDataList()
  },
  beforeCreate() {
    this.times = this.$store.getters.buttontime
    this.timetype = this.$store.getters.timetype
  },
  methods: {
    // 微信新增粉丝量对比
    loadInteraction() {
      const param = {
        uids: '70',
        startTime: this.times,
        endTime: getNowFormatDateHMS(),
        timeType: this.timetype // 时间类型 1:以天为单位 2：以月为单位 3:以小时为单位
      }
      newFansContrast(param).then((res) => {
        if (res.message === '查询成功！') {
          const datas = res.data[0]
          for (var i = 0; i < this.layout.length; i++) {
            if (this.layout[i].leftHint.name === '新增粉丝量对比') {
              console.log(datas)
              // this.layout[i].data.arr = datas.data
              // this.layout[i].data.datax = datas.time
              // this.layout[i].rightHint.count = datas.total
            }
          }
        }
      })
    },
    // 对比分析-获取不同渠道加入对比的账号列表
    async getSelectAccountDataList() {
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 20,
        channelType: 4,
        moduleType: 2
      }
      await selectAccountAnalysis(obj).then(res => {
        if (res && res.data) {
          this.leftColumn.arr = res.data
          this.leftColumn.search = true
          this.flag = true
        }
      }).catch(res => {
        console.log('上传失败')
      })
    },

    childLeftID(childValue) {
      this.childValue = childValue
    }
  }
}
</script>
<style scoped>
.buttongruop {
  margin-top: 0;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
