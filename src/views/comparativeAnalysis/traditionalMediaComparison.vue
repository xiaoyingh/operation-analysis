<template>
  <div class="boxWarp">
    <leftColumn :sidebar="leftColumn" />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <div class="buttongruop">
        <buttonGruop />
      </div>
      <EChartGrid :layout="layout" />
    </div>
  </div>
</template>

<script>
import buttonGruop from '@/components/viewEcharts/buttongruop' // 累计总量 时间
import EChartGrid from '@/components/echartGrid'
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import { selectAccountAnalysis } from '@/api/comparativeAnalysis'
export default {
  name: 'TraditionalMediaComparison',
  components: {
    leftColumn,
    buttonGruop,
    EChartGrid
  },
  data() {
    return {
      flag: false,
      leftColumn: {
        arr: [{ isShow: true, title: '新华网', id: 0 }, { title: '央视网', id: 1 }, {
          isShow: false,
          title: '中国新闻网',
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
          leftHint: { name: '发文量对比' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 4, 'i': '2', chart: 'hotModelMore',
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
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '3', chart: 'hotdocumentable',
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
        }
      ]
    }
  },
  mounted() {
    // this.getSelectAccountDataList()
  },
  methods: {
    // 对比分析-获取不同渠道加入对比的账号列表
    async getSelectAccountDataList() {
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 20,
        channelType: '1,2',
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
