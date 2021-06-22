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
                <span class="left border_left">服务分析 </span>
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
        <el-col :span="12" style="padding-right: 10px;margin-bottom: 20px;">
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
                    <hotModel :chartData="chartDataWords" :rotationRange="rotationRange" />
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
  name: 'serveAnalysis',
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
      radius: '70%',
      loadingWords: false,
      noDataWords: false,
      chartDataWords: [],
      rotationRange: [10, 40],
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
            value: 50,
            name: '满意'
          }, {
            value: 39,
            name: '一般'
          }, {
            value: 28,
            name: '不满意'
          }, {
            value: 12,
            name: '很不满意'
          }]
      }, 1000);
    },
    handlePieClick(param){
      console.log(param)
      if (param.name == '满意') {
        this.loadTraditionZt(1)
        this.loadTraditionWg(1)
        this.loadTraditionLine(1)
        this.loadTraditionWords(1)
        this.loadTraditionTable(1)
      } else if (param.name == '一般') {
        this.loadTraditionZt(2)
        this.loadTraditionWg(2)
        this.loadTraditionLine(2)
        this.loadTraditionWords(2)
        this.loadTraditionTable(2)
      } else {
        this.loadTraditionZt(3)
        this.loadTraditionWg(3)
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
        // 制冷、洗涤、空调、热水器、厨电、彩电、净水、日日顺乐农、日日顺乐家、其他
        if (type == 1) { 
          this.chartDataZt = {
            dataX: ['厨电', '制冷', '洗涤', '空调', '热水器', '彩电', '其他'],
            dataY: [45, 36, 30, 28, 25, 20, 12, 10]
          }
        } else if (type == 2){
          this.chartDataZt = {
            dataX: ['空调', '制冷', '洗涤', '厨电', '热水器', '彩电', '日日顺乐农', '其他'],
            dataY: [48, 35, 30, 27, 25, 20, 12, 8]
          }
        } else {
          this.chartDataZt = {
            dataX: ['厨电', '热水器', '彩电', '空调', '制冷', '洗涤', '其他'],
            dataY: [42, 38, 32, 30, 25, 18, 14, 10]
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
        // 安装、物流、维修、赠品、退货
        this.chartDataWg = {
          data: [
            {
              stack: '体验',
              data: [42, 35, 33, 25, 12, 8]
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
          dataX: ['安装', '物流', '维修', '赠品', '退货']
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
              name: '物流很快',
              value: 120
            }, {
              name: '信任',
              value: 116
            }, {
              name: '无后顾之忧',
              value: 102
            }, {
              name: '放心',
              value: 100
            }, {
              name: '好评',
              value: 80
            }, {
              name: '非常准时',
              value: 70
            }, {
              name: '送货上门',
              value: 70
            }, 
            {
              name: '清洁能力强',
              value: 70
            }, {
              name: '多人适用',
              value: 50
            }, {
              name: '使用舒适',
              value: 40
            }, {
              name: '夏季适用',
              value: 34
            }, {
              name: '物理',
              value: 20
            }
            ]
        } else if (type == 2) {
          this.chartDataWords = [{
              name: '补差价',
              value: 130
            }, {
              name: '算了',
              value: 125
            }, {
              name: '误导信息',
              value: 120
            }, {
              name: '催促',
              value: 80
            }, {
              name: '没落实',
              value: 60
            }, {
              name: '人少单多',
              value: 50
            }, {
              name: '契约服务',
              value: 30
            }, {
              name: '说辞',
              value: 20
            }, {
              name: '保修期',
              value: 20
            }, {
              name: '不知原因',
              value: 10
            }, {
              name: '合格品',
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
              name: '垃圾客服',
              value: 180
            }, {
              name: '欺骗消费',
              value: 160
            }, {
              name: '被套路',
              value: 160
            }, {
              name: '没开票',
              value: 150
            }, {
              name: '管理混乱',
              value: 120
            }, {
              name: '退货流程复杂',
              value: 100
            }, {
              name: '太慢了',
              value: 100
            }, {
              name: '购物体验差',
              value: 80
            }, {
              name: '店大欺客',
              value: 60
            }, {
              name: '不给退换',
              value: 50
            }, {
              name: '没人处理',
              value: 40
            }, {
              name: '不负责任',
              value: 40
            }, {
              name: '互相扯皮',
              value: 30
            }, {
              name: '沟通太费劲',
              value: 30
            }, {
              name: '补偿费',
              value: 30
            }, {
              name: '服务差劲',
              value: 20
            }, {
              name: '送货体验差',
              value: 20
            }, {
              name: '外壳摔坏',
              value: 20
            }, {
              name: '内部撞坏',
              value: 10
            }, {
              name: '服务态度差',
              value: 10
            }, {
              name: '强迫改期',
              value: 10
            }, {
              name: '管理混乱',
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
        if (type == 1) {
          // 门户网站、论坛、微博、微信、问答社区、头条、抖音、快手、小红书、B站、电商、应用商店
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ['微博', '微信', '头条', '抖音', '电商', '论坛'],
            dataY: [40, 38, 32, 25, 17, 12]
          }
        } else if (type == 2){
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ['微博','微信', '抖音', '电商', '论坛', '快手'],
            dataY: [40, 35, 32, 26, 18, 6]
          }
        } else {
          this.chartDataLine = {
            name: '渠道来源',
            id: 'paperName',
            dataX: ["微博",'微信', '抖音', '电商', '门户网站'],
            dataY: [48, 35, 26, 17, 10]
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
              pubtime: '2021/6/11 16:27:52',
              trans_num: '32983',
              title: '卡萨帝洗衣机实物很高大上，安装师傅也很好，不愧是海尔旗下的，不愧是卡萨帝！ ​​​​​',
              url: 'http://weibo.com/6001414367/KjH6av7G7'
            }, {
              pubtime: '2021/6/8 21:41:09',
              trans_num: '24216',
              title: '​海尔热水器大卖 金钢无缝胆 质保终身就是好',
              url: 'http://weibo.com/7581269056/KjgRQvJ7j'
            }, {
              pubtime: '2021/6/10 14:13:09',
              trans_num: '4378',
              title: '​日日顺物流非常棒！又快又平稳，之前买的洗衣机。妈妈很满意呢！',
              url: 'http://weibo.com/2570417517/KjwN064Sr'
            }, {
              pubtime: '2021/6/9 14:49:25',
              trans_num: '1245',
              title: '​卡萨帝空调买的很合心意，颜色也好看，牌子的也有保障，安装师傅很负责哦 ​​​ ',
              url: 'http://weibo.com/7462209835/KjnBdC5sl'
            }, {
              pubtime: '2021/6/9 12:46:45',
              trans_num: '788',
              title: '​海尔洗衣机拍了第二天就收到了，安装师傅很热心，一切安装好，并调试好，耐心解答，这次购物很满意。 ',
              url: 'http://weibo.com/3079952544/KjmNqlhpD'
            }],
            Sort: true // 未超过5名 前三名有样式区分
          }
        } else if (type == 2){
          this.chartDataTable = {
            arr: [{
              pubtime: '2021/6/6 17:39:26',
              trans_num: '32983',
              title: '​海尔公司，你是怎么做到这么大的，事情是这样的，京东买了个热水器，安装过程特别的糟心，我发了微博吐槽一下，不知道怎么的让海尔的人找到我了。三番五次联系我删微博',
              url: 'http://weibo.com/6509282557/KiWqK6Clw'
            }, {
              pubtime: '2021/6/5 13:26:53',
              trans_num: '24216',
              title: '​5月28号在天猫优品购买一台 海尔滚筒洗衣机  拉回家里打售后 上门安装  一会说必须买个水龙头70块钱  一会又不给我安装了。说不是在当地买的  不给安装',
              url: 'http://weibo.com/3118529907/KiLlJhX5x'
            }, {
              pubtime: '2021/6/11 14:57:18',
              trans_num: '4378',
              title: '我来改变一下空调大厂们的猫腻玩法。昨天买了两台海尔壁挂空调，今天安装人员到场干活后告诉我2匹的空调不配插头，要我加钱安装插头才能使用。',
              url: 'http://weibo.com/1400447892/KjGvpou8l'
            }, {
              pubtime: '2021/6/9 10:42:21',
              trans_num: '1245',
              title: '你脑子不好吗？脑子有问题就赶紧去治疗，商品有问题不处理，你拉黑我？你是个人吗@海尔空调 做个人好吗 ​​​​​ ',
              url: 'http://weibo.com/5746894138/KjlYVzLlx'
            }, {
              pubtime: '2021/6/5 18:58:07',
              trans_num: '788',
              title: '#我们坐在高高的虾壳上听老虾讲过去的故事[超话]# 今天老公给家里装了几台空调，装的海尔的，他说其实他本来想买奥克斯的，但是怕我不开心，我说为啥？ 讲实话我忘性大，都不记得谁代言了奥克斯空调',
              url: 'http://weibo.com/7535284701/KiNwb3txl'
            }],
            Sort: true // 未超过5名 前三名有样式区分
          }
        } else {
          this.chartDataTable = {
            arr: [{
              pubtime: '2021/6/9 19:52:45',
              trans_num: '32983',
              title: '​海尔现在太让人失望了，修个热水器踢皮球，根本不把客户放心上了，海尔变了@海尔',
              url: 'http://weibo.com/6857270648/KjpAlaCdW'
            }, {
              pubtime: '2021/6/8 23:08:23',
              trans_num: '24216',
              title: '​海尔这么大公司，售后竟然再三推脱，冰箱有问题一直给维修，冰箱立梁有水珠，给换封条，又给换门子 ，又给换立梁，现在问题还没解决',
              url: 'http://weibo.com/2904014187/KjhrftYp8'
            }, {
              pubtime: '2021/6/6 11:28:06',
              trans_num: '4378',
              title: '​家里装的海尔空调，完全不制冷，已经维修5、6次了，一直没有效果。要求换新机！！！什么辣鸡海尔空调，要支持国货也要自身硬呀，就这样都质量让我对你们海尔太失望了！',
              url: 'http://weibo.com/6720874837/KiU00EhHm'
            }, {
              pubtime: '2021/6/10 23:24:25',
              trans_num: '1245',
              title: '​​#海尔[超话]#辣鸡海尔空调一直修不好，我家已经修了7次了，还是不制冷，还不给换空调外机，大夏天是要热死我吗？？？你们是这样做国产的吗？？？？？从此海尔一生黑，大家买空调一定不要选海尔，血的教训！！！！ ​​​​​ ',
              url: 'http://weibo.com/6720874837/KjAoKvBaf'
            }, {
              pubtime: '2021/6/10 17:16:11',
              trans_num: '788',
              title: '​咸阳市海尔售后服务太差劲，中央空调漏水严重，打售后电话请人来处理2天了没见到有人过来，店面都是电器存在安全隐患谁来承担责任！？？',
              url: 'http://weibo.com/6155460067/KjxZibCJf'
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
