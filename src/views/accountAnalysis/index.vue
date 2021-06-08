<template>
  <!--    账号总览-->
  <div class="boxWarp">
    <div class="boxRightWarp">
      <Numberpapers :papers="papers" />
      <div class="button_group">
        <Buttongruop>
          <el-button
            class="dialogBtn"
            plain
            size="small"
            @click="dialogVisible = true"
          >
            数据来源
          </el-button>
        </Buttongruop>
      </div>
      <EChartGrid :layout="layout" />
    </div>
    <!--  账号总览   -->
    <el-dialog
      title="管理数据来源"
      :visible.sync="dialogVisible"
      width="1096px"
    >
      <AccountOverview >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </AccountOverview>
    </el-dialog>
  </div>
</template>

<script>
import Numberpapers from '@/components/viewEcharts/numberpapers'
import Buttongruop from '@/components/viewEcharts/buttongruop'
import EChartGrid from '@/components/echartGrid'
import AccountOverview from '@/components/accountNumber/accountOverview'

export default {
  name: 'AccountAnalysis',
  components: { EChartGrid, Buttongruop, Numberpapers, AccountOverview },
  data() {
    return {
      papers: [{
        name: '总发文量',
        number: '580,886'
      }, {
        name: '粉丝量',
        number: '235,110'
      }, {
        name: '总阅读/播放量',
        number: '5,886'
      }, {
        name: '总转发/分享量',
        number: '580,886'
      }, {
        name: '总评论量',
        number: '468'
      }, {
        name: '总点赞量',
        number: '180,881'
      }],
      show: false,
      dialogVisible: false,
      layout: [
        {
          'x': 0, 'y': 0, 'w': 3, 'h': 3, 'i': '0', chart: 'papers',
          data: {
            name: '新增粉丝量',
            id: 'paperName',
            datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
            datay: [13, 10, 3, 12, 15, 30, 15]
          },
          leftHint: { name: '新增粉丝量' },
          rightHint: { name: null, count: null, haveLoad: true, more: false }
        },
        {
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '1', chart: 'Reading',
          data: {
            arr: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
            id: 'Read'
          },
          leftHint: { name: '发文量' },
          rightHint: { name: '总发文量', count: '8000', haveLoad: true, more: false }
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
          'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': '3', chart: 'papers',
          data: {
            name: '阅读量',
            id: 'paperName2',
            datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
            datay: [13, 10, 20, 22, 15, 30, 90]
          },
          leftHint: { name: '阅读量' },
          rightHint: { name: '总阅读量', count: '5000', haveLoad: true, more: false }
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
            id: 'hot',
            Sort: true // 未超过5名 前三名有样式区分
          },
          leftHint: { name: '热门TOP10' },
          rightHint: { name: null, count: null, haveLoad: true, more: true }
        },
        {
          'x': 0, 'y': 0, 'w': 6, 'h': 3, 'i': '6', chart: 'swappableTable',
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
                address: 1213423,
                rijun: 323213,
                fans: 2432,
                read: 24163,
                hudong: 4514,
                share: 5456,
                com: 3412,
                dianzan: 56353,
                look: 426565
              }
            ]
          },
          leftHint: { name: '渠道榜单' },
          rightHint: { name: null, count: null, haveLoad: false, more: false }
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.dialogBtn {
  width: 80px;
  height: 30px;
  padding: 0;
}
</style>
