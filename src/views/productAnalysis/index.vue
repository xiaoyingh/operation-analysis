<template>
  <div class="boxWarp">
    <div class="buttongruop">
      <buttonGruop />
    </div>
    <div class="boxRightWarp">
      <el-row>
        <el-col :span="12" style="padding-right: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">产品分析 </span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <!--      接口里将loading值改为false，并判断是否有数据      -->
                <div v-if="loadingPie" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataPie" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <statusofpapers :chartData="chartDataPie" :radius="radius" @handlePieClick="handlePieClick" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">热词</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingWords" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataWords" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <hotModel :chartData="chartDataWords" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">产品分析</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingZt" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataZt" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <Reading :chartData="chartDataZt" @handleProductClick="handleProductClick" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">体验分析</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingWg" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataWg" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <InteracTion :chartData="chartDataWg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">渠道分析</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingLine" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataLine" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <Papers :chartData="chartDataLine" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 10px;margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">热文</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <span class="right-more" @click="loadmoreDrag()">更多</span>
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingTable" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataTable" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <hotdocumentable :chartData="chartDataTable" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="产品分析"
      :visible.sync="dialogVisibleProduct"
      width="1096px"
    >
      <hotdocumentable :chartData="chartDataTable" />
      <el-pagination
        class="paginationWrap"
        background
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddendrag()">取 消</el-button>
        <el-button type="primary" @click="hiddendrag()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="热文"
      :visible.sync="dialogVisiblemore"
      width="1096px"
    >
      <hotdocumentable :chartData="chartDataTable" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddendrag()">取 消</el-button>
        <el-button type="primary" @click="hiddendrag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buttonGruop from '@/components/viewEcharts/buttongruop.vue' // 累计总量 时间
import Papers from '@/components/viewEcharts/papers'
import statusofpapers from '@/components/viewEcharts/statusofpapers'
import InteracTion from '@/components/viewEcharts/Interaction'
import hotModel from '@/components/viewEcharts/hotModel'
import Reading from '@/components/viewEcharts/Reading'
import hotdocumentable from '@/components/viewEcharts/hotdocumentable'
import getTimeMixin from '@/utils/getTimeMixin'
export default {
  name: 'productAnalysis',
  components: {
    buttonGruop,
    Papers,
    statusofpapers,
    InteracTion,
    hotModel,
    Reading,
    hotdocumentable
  },
  mixins: [getTimeMixin],
  data() {
    return {
      loadingLine: false,
      noDataLine: false,
      chartDataLine: {},
      loadingPie: false,
      noDataPie: false,
      chartDataPie: [],
      radius: ['50%', '80%'],
      loadingWords: false,
      noDataWords: false,
      chartDataWords: [],
      loadingZt: false,
      noDataZt: false,
      chartDataZt: {},
      dialogVisibleProduct: false,
      loadingWg: false,
      noDataWg: false,
      chartDataWg: {
        data: [],
        dataX: []
      },
      loadingTable: false,
      noDataTable: false,
      chartDataTable: {},
      currentPage: 1,
      pageSize: 5,
      total: 50,
      dialogVisiblemore: false,
      nowTime: '',
      timeType: '',
      startTime: '',
      endTime: '',
    }
  },
  mounted () {
    this.startTime = this.$store.getters.startTime
    this.endTime = this.$store.getters.endTime
    this.timeType = this.$store.getters.timeType
  },
  methods: {
    commonChartData(){
      this.loadTraditionPie()
      this.loadTraditionZt(1)
      this.loadTraditionWg(1)
      this.loadTraditionWords(1)
      this.loadTraditionLine(1)
      this.loadTraditionTable(1)
    },
    // 情感分析 饼图
    loadTraditionPie() {
      this.loadingPie = true
      setTimeout(() => {
        this.loadingPie = false
        this.chartDataPie = [{
            value: 42,
            name: '满意'
          }, {
            value: 39,
            name: '一般'
          }, {
            value: 28,
            name: '不满意'
          }, {
            value: 24,
            name: '很不满意'
          }]
      }, 1000);
    },
    handlePieClick(param){
      console.log(param)
      if (param.name == '满意') {
        this.loadTraditionZt(1)
        this.loadTraditionWg()
        this.loadTraditionLine(1)
        this.loadTraditionWords(1)
        this.loadTraditionTable(1)
      } else if (param.name == '一般') {
        this.loadTraditionZt(2)
        this.loadTraditionWg()
        this.loadTraditionLine(2)
        this.loadTraditionWords(2)
        this.loadTraditionTable(2)
      } else {
        this.loadTraditionZt(3)
        this.loadTraditionWg()
        this.loadTraditionLine(3)
        this.loadTraditionWords(3)
        this.loadTraditionTable(3)
      }
    },
    handleCurrentChange(val){
      this.currentPage = val
    },
    // 产品分析 柱状图
    loadTraditionZt(type) {
      this.loadingZt = true
      setTimeout(() => {
        this.loadingZt = false
        if (type == 1) { 
          this.chartDataZt = {
            dataX: ['厨电', '制冷', '洗涤', '空调', '热水器', '彩电', '其他'],
            dataY: [42, 32, 22, 18, 15, 14, 12, 10]
          }
        } else if (type == 2){
          this.chartDataZt = {
            dataX: ['空调', '制冷', '洗涤', '厨电', '热水器', '彩电', '日日顺乐农', '其他'],
            dataY: [48, 35, 30, 27, 20, 14, 12, 10]
          }
        } else {
          this.chartDataZt = {
            dataX: ['厨电', '热水器', '彩电', '空调', '制冷', '洗涤', '其他'],
            dataY: [40, 38, 28, 20, 15, 13, 12, 11]
          }
        }
      }, 1000);
    },
    handleProductClick(param){
      console.log(param)
      this.dialogVisibleProduct = true
    },
    // 体验分析 柱状图
    loadTraditionWg() {
      this.loadingWg = true
      setTimeout(() => {
        this.loadingWg = false
        // 设计、节能、操作、环保、智能、价格、安全、寿命
        this.chartDataWg = {
          data: [
            {
              stack: '体验',
              data: [42, 40, 35, 24, 20, 18, 15, 10]
            },
            // {
            //   stack: '产品B',
            //   data: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
            // },
            // {
            //   stack: '产品C',
            //   data: [18, 22, 18, 22, 22, 18, 20, 20, 18, 22, 20, 18]
            // }
          ],
          dataX: ['设计', '节能', '操作', '环保', '智能', '价格', '安全', '寿命']
        }
      }, 1000);
    },
    //热词
    loadTraditionWords(type) {
      this.loadingWords = true
      setTimeout(() => {
        this.loadingWords = false
        if (type == 1) {
          this.chartDataWords = [{
              name: '容量空间大',
              value: 140
            }, {
              name: '噪音低',
              value: 120
            }, {
              name: '存储方便',
              value: 110
            }, {
              name: '性价比高',
              value: 100
            }, {
              name: '便宜',
              value: 80
            }, {
              name: '颜色百搭',
              value: 70
            }, {
              name: '颜色好看',
              value: 60
            }, 
            {
              name: '操作简单',
              value: 50
            }, {
              name: '外观材质很好',
              value: 40
            }, {
              name: '大气又实用',
              value: 30
            }, {
              name: '质感很高',
              value: 10
            }, 
            // {
            //   name: '物理',
            //   value: 25
            // }
            ]
        } else if (type == 2) {
          this.chartDataWords = [{
              name: '价廉物不美',
              value: 120
            }, {
              name: '破损',
              value: 100
            }, {
              name: '缝太大',
              value: 90
            }, {
              name: '不协调',
              value: 80
            }, {
              name: '变形',
              value: 70
            }, {
              name: '延长保修期',
              value: 60
            }, {
              name: '机型质量一般',
              value: 50
            }, {
              name: '冷冻速度还可以',
              value: 40
            }, {
              name: '机器工艺一般',
              value: 30
            }, {
              name: '整体还行',
              value: 20
            }, {
              name: '没有儿童锁',
              value: 10
            }, 
            // {
            //   name: '优先配送',
            //   value: 1
            // }, {
            //   name: '还可以',
            //   value: 1
            // }, {
            //   name: '不痛快',
            //   value: 1
            // }, {
            //   name: '凑合',
            //   value: 1
            // }, {
            //   name: '打脸',
            //   value: 1
            // }, {
            //   name: '醉了',
            //   value: 1
            // }, {
            //   name: '怀疑',
            //   value: 1
            // }, {
            //   name: '下单三思',
            //   value: 1
            // }, {
            //   name: '踏实',
            //   value: 1
            // }
            ]
        } else {
          this.chartDataWords = [{
              name: '色差大',
              value: 140
            }, {
              name: '质量堪忧',
              value: 110
            }, {
              name: '品控差',
              value: 100
            }, {
              name: '毁国产',
              value: 90
            }, {
              name: '不密封',
              value: 80
            }, {
              name: '污渍',
              value: 70
            }, {
              name: '粗糙',
              value: 60
            }, {
              name: '降价',
              value: 50
            }, {
              name: '门扇不齐',
              value: 40
            }, {
              name: '无环保标识',
              value: 40
            }, {
              name: '显示屏破碎',
              value: 30
            }, {
              name: '瑕疵家电',
              value: 30
            }, {
              name: '不制冷',
              value: 30
            }, {
              name: '价格相差大',
              value: 20
            }, {
              name: '底板变形',
              value: 20
            }, {
              name: '不牢',
              value: 20
            }, {
              name: '角不平',
              value: 20
            }, {
              name: '反复启动',
              value: 10
            }, {
              name: '瑕疵品',
              value: 10
            }, {
              name: '质量堪忧',
              value: 10
            }, {
              name: '没有美感',
              value: 10
            }, {
              name: '塑料条开裂',
              value: 10
            }
            ]
        }
      }, 1000);
    },
    // 渠道分析 折线图
    loadTraditionLine(type) {
      this.loadingLine = true
      setTimeout(() => {
        this.loadingLine = false
        // 门户网站、论坛、微博、微信、问答社区、头条、抖音、快手、小红书、B站、电商、应用商店
        if (type == 1) {
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ['微博', '微信', '头条', '抖音', '电商', '论坛'],
            dataY: [40, 34, 16, 12, 6, 2]
          }
        } else if (type == 2){
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ['微博', '微信', '头条', '抖音', '电商', '论坛'],
            dataY: [45, 22, 14, 10, 6, 8]
          }
        } else {
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ["微博",'威腾网','前端头条','贴吧'],
            dataY: [45, 21, 21, 10]
          }
        }
      }, 1000);
    },
    // 热文 
    loadTraditionTable(type) {
      this.loadingTable = true
      setTimeout(() => {
        this.loadingTable = false
        if (type == 1) {
          this.chartDataTable = {
            arr: [{
              pubtime: '2021/6/5 23:39:15',
              trans_num: '32983',
              title: '​真的，卡萨帝油烟机吸力太强大了！！[太开心] ​​​​​',
              url: 'http://weibo.com/6031139327/KiPmij3wW'
            }, {
              pubtime: '2021/6/5 23:42:03',
              trans_num: '24216',
              title: '​​卡萨帝油烟机再战10年也没问题啊！[给你小心心]',
              url: 'http://weibo.com/6041026476/KiPnqqsf1'
            }, {
              pubtime: '2021/6/5 23:38:39',
              trans_num: '4378',
              title: '​​卡萨帝抽油烟机确实很好用，看来抽烟机也不能少[可爱]',
              url: 'http://weibo.com/6804380928/KiPm2FrKY'
            }, {
              pubtime: '2021/6/8 15:49:13',
              trans_num: '1245',
              title: '​​海尔热水器真的特别好用呀',
              url: 'http://weibo.com/7584223756/Kjez03Myx'
            }, {
              pubtime: '2021/6/8 16:21:36',
              trans_num: '788',
              title: '​​帅哥的第二颜值-卡萨帝双子洗衣机 ',
              url: 'http://weibo.com/5038238510/KjeM8nZvN'
            }],
            Sort: true // 未超过5名 前三名有样式区分
          }
        } else if (type == 2){
          this.chartDataTable = {
            arr: [{
              pubtime: '2021/6/9 20:06:43',
              trans_num: '32983',
              title: '​打算到时候入手一台海尔洗衣机跟空调',
              url: 'http://weibo.com/6512563298/KjpG15ouu'
            }, {
              pubtime: '2021/6/7 16:17:15',
              trans_num: '24216',
              title: '​​海尔统帅考完可以在家吹空调了',
              url: 'http://weibo.com/3674879191/Kj5jSdaBa'
            }, {
              pubtime: '2021/6/8 12:28:02',
              trans_num: '4378',
              title: '咱家热水器安装完就是两条电线露在外面？',
              url: 'http://weibo.com/1777701867/KjdfkvAvc'
            }, {
              pubtime: '2021/6/10 08:50:38',
              trans_num: '1245',
              title: '​卡萨帝燃电混动新物种银河CT7入户安装效果#海尔##卡萨帝热水器# ',
              url: 'http://weibo.com/7610066765/KjuG5dLsw'
            }, {
              pubtime: '2021/6/10 13:33:35',
              trans_num: '788',
              title: '​​我是。江苏省盐城市东台市头灶村宝丰居委会。。我要投诉我们当地的海尔售后。我是在。6月8号买的，一台海尔。洗衣机。至今为止。都没有海尔售后。',
              url: 'http://weibo.com/7520639563/KjwwVAmIJ'
            }],
            Sort: true // 未超过5名 前三名有样式区分
          }
        } else {
          this.chartDataTable = {
            arr: [{
              pubtime: '2021/6/4 22:20:24',
              trans_num: '32983',
              title: '​​海尔什么垃圾洗衣机！永远在进水永远在E4错误❌ ！ ​​​​​',
              url: 'http://weibo.com/6220386099/KiFpN2gHi'
            }, {
              pubtime: '2021/6/5 14:28:00',
              trans_num: '24216',
              title: '​卡萨帝的油烟机和灶具质量真的太差！对不起这个品牌～  家里很多家电都用了卡萨帝，但是烟机和灶具真的很差劲！首先灶具竟然自己爆了，刚装修的房子没用几次就出现这种问题',
              url: 'http://weibo.com/5840510228/KiLKxj0vF'
            }, {
              pubtime: '2021/6/5 10:13:55',
              trans_num: '4378',
              title: '​#焕新生活 就选海尔除菌舱空调 我是个急性子，最讨厌慢吞吞了，以前家里用的空调，制冷慢，制热也慢，每次都好好久，很烦。今年换空调也对比了很多品牌，发现海尔的制冷最快，能实现15秒急速制冷，就海尔了。 ​​​',
              url: 'http://weibo.com/7609755509/KiK5pc7tc'
            }, {
              pubtime: '2021/6/9 22:10:13',
              trans_num: '1245',
              title: '​​海尔售后垃圾 ，买了全套海尔家电，结果空调的散热板运输过程中断裂了，装修师傅来安装的时候就说修不好的，但是北京售后依然说不给换货，就请问海尔售后是个什么态度',
              url: 'http://weibo.com/7490139180/Kjqu907HV'
            }, {
              pubtime: '2021/6/6 00:33:47',
              trans_num: '788',
              title: '三菱重工海尔中央空调质量太差，后悔死了。用了不到一年就出问题了，因装修新房时买的装修好后一直没住，上年十一搬入的，空调才用。现在内机出问题，打400来了检修师傅说你这不能保修了，时间有点久了，需要换配件还超贵。',
              url: 'http://weibo.com/6451708282/KiPIqB2jr'
            }],
            Sort: true // 未超过5名 前三名有样式区分
          }
        }
      }, 1000);
    },
    hiddendrag() {
      this.currentPage = 1
      this.dialogVisiblemore = false
      this.dialogVisibleProduct = false
    },
    loadmoreDrag(){
      this.dialogVisiblemore = true
    }
  }
}
</script>

<style scoped lang="scss">
.paginationWrap {
  text-align: right;
  margin-bottom: 10px;
}
.item-content {
  background: white;
  width: 100%;
  // height: 100%;
  height: 320px;
  border-radius: $radious6px;
}
.vue-grid-item {
  touch-action: none
}
.titleBox {
  @include background-color('tab-nav-bg');
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: $radious6px;
  .topTitle {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #E3E3E3;
    margin: 0;
    width: 100%;
    padding: 0 16px;
    .left {
      display: flex;
      align-items: center;
      padding-left: 4px;
      font-size: 14px;
      @include color('tab-item-color');
      flex: 1;
      &:before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #3471FF;
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    .right-tit {
      user-select: none;
    }
    .fansNum {
      display: inline-block;
      background: rgba(52, 113, 255, 0.1);
      font-size: 12px;
      color: $functionButtonColor;
      height: 24px;
      line-height: 24px;
      margin: 0;
      padding-left: 8px;
      padding-right: 8px;
    }
    .right-more {
      color: $functionButtonColor;
      margin-left: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    .el-download {
      margin-right: 16px;
      line-height: 40px;
      cursor: pointer;
      position: relative;
      img: {
        position: absolute;
        top: 2px;
      };
    }
  }
  .chart-slot {
    width: 100%;
    height: calc(100% - 40px);
    padding: 0;
    div {
      height: 100%;
    }
  }
}
.vue-grid-layout {
  max-width: 100%;
}
/deep/ .vue-grid-placeholder {
  background: $functionButtonColor;
}
/deep/.el-dialog__body {
  padding: 0px;
}
.loading-style {
  text-align: center;
  color: #ccc;
  .el-icon-loading {
    position: relative;
    top: calc(50% - 40px);
    font-size: 40px;
  }
}
.notcount {
  text-align: center;
  color: #A0A2B2;
  position: relative;
  .nodata {
    height: 136px !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 206px;
    height: 112px;
  }
  p {
    margin-top: -10px;
  }
}
</style>
