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
export default {
  name: 'ShortVideoAnalysis',
  components: {
    VipLine,
    numberPapers,
    EChartGrid,
    buttonGruop,
    leftColumn
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
      childValue: '',
      leftColumn: {
        arr: [{ isShow: true, title: '人民日报（抖音）', id: 0 }, { title: '新华社(抖音)', id: 1 }, { isShow: true, title: '新华网(抖音)', id: 2 }],
        search: false
      },
      layout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '0', chart: 'papers',
          data: {
            name: '发视频变化量',
            id: 'paperName',
            datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
            datay: [13, 10, 3, 12, 15, 30, 15]
          },
          leftHint: { name: '发视频变化量' },
          rightHint: { name: '总发视频量', count: '5600', haveLoad: true, more: false }
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
          leftHint: { name: '发视频习惯' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '2', chart: 'Reading',
          data: {
            id: 'reading',
            arr: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110]
          },
          leftHint: { name: '阅读情况' },
          rightHint: { name: '总阅读量', count: '6000', haveLoad: true, more: false }
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '3', chart: 'Interaction',
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
          rightHint: { name: '总互动量', count: '9000', haveLoad: true, more: false }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '4', chart: 'hotdocumentable',
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
      ]
    }
  },
  methods: {
    childLeftID(childValue) {
      this.childValue = childValue
      console.log(this.childValue)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
