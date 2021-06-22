<template>
  <div class="boxWarp">
    <Comparison @handleComparisonClick="handleComparisonClick" />
    <div class="boxRightWarp">
      <el-row>
        <el-col :span="24" style="margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">价格对比分析 </span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <!--      接口里将loading值改为false，并判断是否有数据      -->
                <div v-if="loadingPrice" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataPrice" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <priceDegreeMore :priceData="chartDataPrice" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">好评度分析</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingPraise" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataPraise" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <praiseDegreeMore :praiseData="praiseData" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">亮点对比分析</span>
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
                    <HotModelMore :chartData="chartDataWords" :rotationRange="rotationRange" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px;">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">槽点对比分析</span>
                <div class="right-tit">
                  <!-- <span class="fansNum">123</span> -->
                  <!-- <span class="right-more" @click="loadmoreDrag()">更多</span> -->
                </div>
              </div>
              <div class="chart-slot">
                <div v-if="loadingSlotWords" class="loading-style">
                  <i class="el-icon-loading" />
                </div>
                <div v-else>
                  <div v-if="noDataSlotWords" class="notcount">
                    <div class="nodata">
                      <img src="@/assets/images/nodata.png" alt="">
                      <p>暂无统计数据</p>
                    </div>
                  </div>
                  <div v-else>
                    <HotModelMore :chartData="chartDataSlotWords" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="24">
          <div class="item-content">
            <div class="titleBox">
              <div class="topTitle">
                <span class="left border_left">热文</span>
                <div class="right-tit">
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
        </el-col> -->
      </el-row>
    </div>
    <!-- <el-dialog
      title="热文top10"
      :visible.sync="dialogVisiblemore"
      width="1096px"
    >
      <hotdocumentable :chartData="chartDataTable" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddendrag()">取 消</el-button>
        <el-button type="primary" @click="hiddendrag()">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import Comparison from '@/components/comparison'
import praiseDegreeMore from '@/components/viewEcharts/praiseDegreeMore'
import priceDegreeMore from '@/components/price/index'
import HotModelMore from '@/components/viewEcharts/hotModelMore'
import hotdocumentable from '@/components/viewEcharts/hotdocumentable'
export default {
  name: 'competingAnalysis',
  components: {
    Comparison,
    praiseDegreeMore,
    priceDegreeMore,
    HotModelMore,
    hotdocumentable
  },
  data() {
    return {
      loadingPrice: false,
      noDataPrice: false,
      chartDataPrice: [],
      loadingPraise: false,
      noDataPraise: false,
      praiseData: [],
      loadingWords: false,
      noDataWords: false,
      chartDataWords: [],
      loadingSlotWords: false,
      noDataSlotWords: false,
      chartDataSlotWords: [],
      rotationRange: [5, 30],
      loadingTable: false,
      noDataTable: false,
      chartDataTable: {},
      dialogVisiblemore: false
    }
  },
  mounted () {
    
  },
  methods: {
    // 价格对比分析
    loadTraditionPrice(data) {
      this.loadingPrice = true
      setTimeout(() => {
        this.loadingPrice = false
        this.chartDataPrice = [{
            name: data[0].name,
            imgUrl: require('@/static/images/image1.png'),
            price: 3599
          }, {
            name: data[1].name,
            imgUrl: require('@/static/images/image2.png'),
            price: 3899
          }, {
            name: data[2].name,
            imgUrl: require('@/static/images/image3.png'),
            price: 4999
          } 
          ]
      }, 1000);
    },
    handleComparisonClick(param){
      console.log(param)
      this.loadTraditionPrice(param)
      this.loadTraditionWords(param)
      this.loadTraditionSlotWords(param)
      this.loadTraditionPraise(param)
    },
    //热词 亮点
    loadTraditionWords(data) {
      this.loadingWords = true
      setTimeout(() => {
        this.loadingWords = false
        this.chartDataWords = [
        {
          name: data[0].name,
          value: [{
            name: '空间够大',
            value: 500
          }, {
            name: '制冷效果好',
            value: 490
          }, {
            name: '几乎没有噪音',
            value: 470
          }, {
            name: '冷冻保鲜好',
            value: 450
          }, {
            name: '消菌杀毒',
            value: 440
          }, {
            name: '存储分明',
            value: 430
          }, {
            name: '省电',
            value: 400
          }, {
            name: '智能',
            value: 380
          }, {
            name: '省时',
            value: 320
          }, {
            name: '反应灵敏',
            value: 310
          }, {
            name: '做工精美',
            value: 300
          }, {
            name: '大气',
            value: 260
          }, {
            name: '颜色漂亮',
            value: 220
          }, {
            name: '送货快',
            value: 200
          }, {
            name: '服务好',
            value: 180
          }, {
            name: '高大上',
            value: 120
          }, {
            name: '四开门',
            value: 90
          },
          // {
          //   name: '地理',
          //   value: 24
          // }, {
          //   name: '化学',
          //   value: 30
          // }, {
          //   name: '品味',
          //   value: 18
          // }
          ]
        }, {
          name: data[1].name,
          value: [{
            name: '布局合理',
            value: 890
          }, {
            name: '时尚',
            value: 860
          }, {
            name: '容量大',
            value: 855
          }, {
            name: '噪音小',
            value: 840
          }, {
            name: '服务好',
            value: 800
          }, {
            name: '准时',
            value: 780
          }, {
            name: '性价比高',
            value: 760
          }, {
            name: '实惠',
            value: 750
          }, {
            name: '颜色百搭',
            value: 730
          }, {
            name: '不占地',
            value: 700
          }, {
            name: '超级省电',
            value: 670
          }, {
            name: '值得信赖',
            value: 650
          }, {
            name: '质感高',
            value: 660
          }, {
            name: '客服完美',
            value: 500
          }, {
            name: '值得信赖',
            value: 400
          }, {
            name: '值得推荐',
            value: 380
          }, {
            name: '贴心',
            value: 300
          },
          // {
          //   name: '地理',
          //   value: 24
          // }, {
          //   name: '化学',
          //   value: 30
          // }, {
          //   name: '品味',
          //   value: 18
          // }
          ]
        },
        {
          name: data[2].name,
          value: [{
            name: '颜值高',
            value: 716
          }, {
            name: '节能省电',
            value: 621
          }, {
            name: '空间大',
            value: 381
          }, {
            name: '整体感觉不错',
            value: 376
          }, {
            name: '无异味',
            value: 327
          }, {
            name: '外观漂亮',
            value: 294
          }, {
            name: '性价比很高',
            value: 223
          }, {
            name: '冰箱不错',
            value: 198
          }, {
            name: '款式好看',
            value: 143
          }, {
            name: '买得超值',
            value: 114
          }]
        }
        ]
      }, 1000);
    },
    //热词 槽点
    loadTraditionSlotWords(data) {
      this.loadingSlotWords = true
      setTimeout(() => {
        this.loadingSlotWords = false
        this.chartDataSlotWords = [{
          name: data[0].name,
          value: [{
            name: '有划横',
            value: 16
          }, {
            name: '物流较慢',
            value: 14
          }, {
            name: '没调平',
            value: 12
          }, {
            name: '轱辘不着地',
            value: 10
          }, {
            name: '快递慢',
            value: 8
          }, {
            name: '残次品',
            value: 5
          }, {
            name: '冷藏室不降温',
            value: 5
          }, {
            name: '冰箱门有小凹痕',
            value: 1
          }]
        }, {
          name: data[1].name,
          value: [{
            name: '门体高低不平',
            value: 10
          }, {
            name: 'wifi连不上',
            value: 6
          }, {
            name: '不制冷',
            value: 5
          }, {
            name: '返修机',
            value: 2
          }, {
            name: '后倾',
            value: 1
          }]
        }, {
          name: data[2].name,
          value: [{
            name: '异味',
            value: 123
          }, {
            name: '有霜',
            value: 115
          }, {
            name: '声音太大',
            value: 110
          }, {
            name: '很难看',
            value: 100
          }, {
            name: '送货太慢',
            value: 80
          }, {
            name: '乱收费',
            value: 75
          }, {
            name: '态度极其恶劣',
            value: 60
          }, {
            name: '欺骗消费者',
            value: 50
          }, {
            name: '套路太深',
            value: 45
          }, {
            name: '不返卡',
            value: 40
          }]
        }]
      }, 1000);
    },
    // 好评度分析 评分
    loadTraditionPraise(data) {
      this.loadingPraise = true
      setTimeout(() => {
        this.loadingPraise = false
        this.praiseData = [
          {
            name: data[0].name,
            value: 4.2
          },
          {
            name: data[1].name,
            value: 4.6
          },
          {
            name: data[2].name,
            value: 4.2
          }
        ]
      }, 1000);
    },
    // 热文 
    loadTraditionTable() {
      this.loadingTable = true
      setTimeout(() => {
        this.loadingTable = false
        this.chartDataTable = {
          arr: [{
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
          }],
          Sort: true // 未超过5名 前三名有样式区分
        }
      }, 1000);
    },
    hiddendrag() {
      this.pageNo = 1
      this.dialogVisiblemore = false
    },
    loadmoreDrag(){
      this.dialogVisiblemore = true
    }
  }
}
</script>

<style scoped lang="scss">
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
