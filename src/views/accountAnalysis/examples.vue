<template>
  <div class="boxWarp">
    <leftColumn :sidebar="leftColumn" @childLeftID="childLeftID" />  <!-- 左侧导航栏列表 -->
    <div class="boxRightWarp">
      <numberPapers :papers="papers" />
      <div class="buttongruop">
        <buttonGruop />
      </div>
      <!--  发文情况 发文习惯  -->
      <div class="row_flex_box">
        <div class="left_flex_box titleBox">
          <p class="topTitle">
            <span class="left">发文情况</span>
            <span class="fansNum">发文总量：12564</span>
            <span class="el-icon-download" /></p>
          <div>
            <papers :chart-data="papersdata" />
          </div>
        </div>

        <div class="right_flex_box titleBox">
          <p class="topTitle"><span class="left">发文习惯</span><span class="el-icon-download" /></p>
          <div>
            <statusofPapers :statusofpaperslist="statusofpaperslist" />
          </div>
        </div>
      </div>

      <!--  热文top10 发文热词  -->
      <div class="row_flex_box">
        <div class="left_flex_box titleBox">
          <p class="topTitle">
            <span class="left">热文TOP10</span>
            <span class="fansNum">发文总量：12564</span>
            <span class="el-icon-download" />
          </p>
          <div class="tables">
            <hotDocumentable :chart-data="hotDocumentdata" />
          </div>
        </div>

        <div class="right_flex_box titleBox">
          <p class="topTitle">
            <span class="left">发文热词</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <hotModel :chart-data="hotmodallist" />
          </div>
        </div>
      </div>

      <!--  阅读量变化  -->
      <div class="row_flex_box">
        <div class="left_flex_box titleBox">
          <p class="topTitle"><span class="left border_left">阅读量变化</span>
            <span class="fansNum">发文总量：12564</span><span class="el-icon-download" /></p>

          <div class="tables">
            <reaDing :chart-data="readingList" />
          </div>
        </div>

        <div class="right_flex_box titleBox">
          <p class="topTitle">
            <span class="left border_left">互动情况</span>
            <span class="fansNum">发文总量：12564</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <interacTion :chart-data="interactionList" />
          </div>
        </div>
      </div>

      <!--  粉丝地域分布  性别对比-->
      <div class="row_flex_box">
        <div class="left_flex_box hot_document titleBox">
          <p class="topTitle">
            <span class="left border_left">粉丝地域分布</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <geoMap :chart-data="geoMap" />
          </div>
        </div>

        <div class="right_flex_box titleBox">
          <p class="topTitle">
            <span class="left border_left">粉丝性别占比</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <roundedRing :chart-data="roundedArr" />  <!-- 圆角环形 -->
          </div>
        </div>
      </div>
      <!-- 水球图 -->
      <div class="row_box">
        <div class="titleBox">
          <p class="topTitle">
            <span class="left border_left">水球图</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <waterPolo :waterdata="waterData" />
          </div>
        </div>
      </div>

      <!-- 水球图 -->
      <div class="row_box">
        <div class="titleBox">
          <p class="topTitle">
            <span class="left border_left">水球图</span>
            <span class="el-icon-download" />
          </p>
          <div>
            <interacTion :chart-data="interactionList2" />
          </div>
        </div>
      </div>
    </div>
    <tableDialog :show.sync="show" :table-data="tableData" />
    <el-button style="margin: 7px;" @click="open">click-table</el-button>
  </div>
</template>
<script>
import tableDialog from '@/components/viewEcharts/tableDialog' // table弹窗
import numberPapers from '@/components/viewEcharts/numberpapers'
import hotDocumentable from '@/components/viewEcharts/hotdocumentable'
import geoMap from '@/components/viewEcharts/geoMap' // 世界地图（粉丝情况）
import roundedRing from '@/components/viewEcharts/roundedRing' // 圆角环形（粉丝情况）
import waterPolo from '@/components/viewEcharts/waterPolo' // 水球（粉丝情况）
import buttonGruop from '@/components/viewEcharts/buttongruop.vue' // 累计总量 时间
import leftColumn from '@/components/viewEcharts/leftColumn' // 左侧栏列表
import statusofPapers from '@/components/viewEcharts/statusofpapers' // 发文热词
import hotModel from '@/components/viewEcharts/hotModel' // 发文热词
import interacTion from '@/components/viewEcharts/Interaction' // 互动情况
import reaDing from '@/components/viewEcharts/Reading' // 互动情况
import papers from '@/components/viewEcharts/papers' // 发文情况

export default {
  name: 'AnalysisIndex',
  components: {
    numberPapers,
    hotDocumentable,
    geoMap,
    roundedRing,
    waterPolo,
    buttonGruop,
    leftColumn,
    statusofPapers,
    hotModel,
    interacTion,
    reaDing,
    papers,
    tableDialog
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
      show: false,
      waterData: {
        width: '100%',
        height: '350px',
        arr: [0.6]
      },
      childValue: '',
      leftColumn: {
        arr: [{ isShow: true, title: '米勒抖音号', id: 0 }, { title: '哈哈哈哈哈', id: 1 }, { isShow: true, title: '嘎嘎嘎哈哈', id: 2 }],
        search: true
      },
      roundedArr: [95, 70],
      hotDocumentdata: {
        arr: [
          {
            date: '2016-05-02',
            hot: '888888',
            title: '第八届高等学校科学研究优秀成果奖（人文社会科学）颁奖会召开'
          }, {
            date: '2016-05-04',
            hot: '99999',
            title: '创造更为公平的受教育机会 党的十八大以来，514万建档立卡贫困学生接受高等教育'
          }, {
            date: '2016-05-01',
            hot: '7777',
            title: '教育部部署做好2021年普通高校招生工作'
          }, {
            date: '2016-05-03',
            hot: '6666',
            title: '教育部启动实施新一轮审核评估 本科教育评价改革出“硬招”'
          }, {
            date: '2016-05-03',
            hot: '785',
            title: '教育部启动实施新一轮审核评估 本科教育评价改革出“硬招”'
          }
        ],
        Sort: true // 未超过5名 前三名有样式区分
      },
      statusofpaperslist: {
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
          }],
        height: '400px', // 发文习惯的宽
        width: '100%' // 发文习惯的高
      },
      hotmodallist: {
        width: '100%',
        height: '400px',
        arr: [
          { name: '雨伞', value: 30 },
          { name: '晴天', value: 28 },
          { name: '电话', value: 24 },
          { name: '手机', value: 23 },
          { name: '下雨', value: 22 },
          { name: '暴雨', value: 21 },
          { name: '多云', value: 20 },
          { name: '雨衣', value: 29 },
          { name: '屋檐', value: 28 },
          { name: '大风', value: 27 },
          { name: '台风', value: 26 },
          { name: '下雪', value: 25 },
          { name: '打雷', value: 24 },
          { name: '小雨', value: 30 },
          { name: '中雨', value: 18 },
          { name: '大雨', value: 14 },
          { name: '雷阵雨', value: 13 },
          { name: '下雪', value: 12 },
          { name: '小雪', value: 11 },
          { name: '中雪', value: 10 },
          { name: '大雪', value: 9 },
          { name: '暴雪', value: 8 },
          { name: '东风', value: 7 },
          { name: '南风', value: 6 },
          { name: '西北风', value: 5 },
          { name: '北风', value: 4 },
          { name: '闪电', value: 3 }
        ]
      },
      interactionList: {
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
        height: '400px', // 发文习惯的宽
        width: '100%' // 发文习惯的高
      },
      interactionList2: {
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
          },
          {
            name: '分享量2',
            value: [12, 13, 12, 13, 12, 13, 13, 12, 13, 13, 12, 13]
          }, {
            name: '评论量2',
            value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
          }, {
            name: '点赞量2',
            value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
          },
          {
            name: '分享量3',
            value: [12, 13, 12, 13, 12, 13, 13, 12, 13, 13, 12, 13]
          }, {
            name: '评论量3',
            value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
          }, {
            name: '点赞量3',
            value: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
          }
        ],
        height: '400px', // 发文习惯的宽
        width: '100%' // 发文习惯的高
      },
      readingList: {
        arr: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
        height: '400px', // 发文习惯的宽
        width: '100%' // 发文习惯的高
      },
      papersdata: {
        name: '发文情况',
        id: 'paperName',
        height: '350px',
        width: '100%',
        datax: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
        datay: [13, 10, 3, 12, 15, 30]
      },
      geoMap: {
        id: 'geomap',
        height: '350px',
        width: '100%',
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
      tableData: [{
        num: '1',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '2',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '3',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '4',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '5',
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '6',
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '7',
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '7',
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '7',
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    childLeftID(childValue) {
      this.childValue = childValue
    },
    // table弹窗
    open() {
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
