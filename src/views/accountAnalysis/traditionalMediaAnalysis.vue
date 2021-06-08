<template>
  <div class="boxWarp">
    <leftColumn :sidebar="leftColumn" @childLeftID="childLeftID" />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <Numberpapers :papers="papers" />
      <div class="buttongruop">
        <Buttongruop />
      </div>
      <EChartGrid :layout="layout" />
      <!--      <vip-line />-->
      <!--      <EChartGrid :layout="vipLayout" />-->
    </div>
  </div>
</template>

<script>
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import uploadcanvas from '@/utils/uploadcanvas.js'
import Numberpapers from '@/components/viewEcharts/numberpapers'
import Buttongruop from '@/components/viewEcharts/buttongruop'
import EChartGrid from '@/components/echartGrid'
import VipLine from '@/components/vipLine' // 下载canvas

export default {
  name: 'TraditionalMediaAnalysis',
  components: {
    VipLine,
    EChartGrid,
    leftColumn,
    Buttongruop,
    Numberpapers
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
        name: '播放量',
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
      }],
      layout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '0', chart: 'papers',
          data: {
            name: '发文情况',
            id: 'paperName',
            datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
            datay: [13, 10, 3, 12, 15, 30, 15]
          },
          leftHint: { name: '发文情况' },
          rightHint: { name: '总发文量', count: '5640', haveLoad: true, more: false }
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
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '3', chart: 'hotdocumentable',
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
      childValue: '',
      leftColumn: {
        arr: [{ isShow: true, title: '新华网', id: 0 }, { title: '央视网', id: 1 }, {
          isShow: false,
          title: '中国新闻网',
          id: 2
        }],
        search: false
      }
    }
  },
  methods: {
    childLeftID(childValue) {
      this.childValue = childValue
      console.log(this.childValue)
    },

    downloadCode(id, title) {
      uploadcanvas(id, title)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

