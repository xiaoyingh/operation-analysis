<template>
  <div class="sidebarWarpBox" :class="this.$store.getters.sliderShow ? 'openBox':'closeBox'">
    <div class="sidebarBox">
      <p class="inputSear">
        <el-input v-model="input" placeholder="请输入内容" clearable @clear="clear" @keyup.enter.native="querySearch">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <i class="el-icon-caret-left" @click="sliderToggle()" />
      </p>
      <div class="context">
        <div v-if="showList.length !==0">
          <!--   是否选择分析  -->
          <div v-if="sidebar.search">
            <p v-for="(item,index) in showList" :key="index" class="contextList">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox :label="item.mediaName" :value="item.accountId">{{ item.mediaName }}</el-checkbox>
                <span v-if="item.accountType === 1" class="zi">自</span>
              </el-checkbox-group>
            </p>
          </div>
          <!--  列表展示 -->
          <div v-else>
            <p
              v-for="(item,index) in showList"
              :key="index"
              :class="{active : active === item.accountId}"
              class="contextList"
              @click="handleList(item)"
            >
              <span class="name">{{ item.mediaName }}</span>
              <span v-if="item.accountType === 1" class="zi">自</span>
            </p>
          </div>
        </div>
        <div v-else><p class="contextList">暂无匹配内容</p></div>
      </div>
      <div v-if="sidebar.search" class="buttons">
        <el-button @click="dialogVisible = true">添 加</el-button>
        <el-button type="primary" @click="fenxiHand">分 析</el-button>
      </div>
      <!--  账号总览   -->
      <el-dialog
        title="添加对比"
        :visible.sync="dialogVisible"
        width="1096px"
      >
        <ContrastOverview :active-data="activeData" @parentFun="getChildData" />
        <div class="button">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDataList">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { updateAccountAnalysis } from '@/api/comparativeAnalysis'
import ContrastOverview from '@/components/accountNumber/ContrastOverview'

export default {
  name: 'LeftColumn',
  components: { ContrastOverview },
  props: {
    sidebar: {
      type: Object,
      default: () => ({})
    },
    dropConf: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      input: '',
      list: '',
      activeData: [],
      showList: [], // 左侧列表数据
      checkedCities: [],
      checkList: [],
      dialogVisible: false,
      radio1: false,
      dialogCheck: [], // 弹框默认选中数据
      active: '',
      colParam: {
        cols3Width: 3,
        cols21Width: 21
      },
      dataList: []
    }
  },
  computed: {
    sliderShow() { // 侧边栏收缩展开
      return this.$store.getters.sliderShow // 需要监听的数据
    }
  },
  watch: {
    sidebar: {
      handler(n, o) {
        this.showList = n.arr
      },
      deep: true
    }
  },

  mounted() {
    this.list = this.sidebar.arr
    this.showList = this.sidebar.arr
    this.active = this.list[0].accountId
    for (const item in this.showList) {
      this.checkedCities.push(this.showList[item].mediaName)
    }
    // 回显弹框列表
    for (const item in this.showList) {
      this.activeData.push(this.showList[item].accountId)
    }
  },
  methods: {
    // 对比分析
    fenxiHand() {
      for (var item in this.dropConf) {
        this.dropConf[item].loading = true
      }
      this.$emit('parentCheck', this.checkedCities)
    },
    // 请求添加的接口
    addDataList() {
      updateAccountAnalysis(this.dataList).then(res => {
        if (res) {
          this.$parent.getSelectAccountDataList()
          this.dialogVisible = false
        }
      }).catch(res => {
        console.log('失败')
      })
    },
    // 获取子组件传来的值
    getChildData(data) {
      this.dataList = data
    },
    // 左侧栏收缩展开事件
    sliderToggle() {
      if (this.$store.getters.sliderShow) {
        this.$store.commit('accountAnalysis/widthCol', !this.$store.getters.sliderShow)
      }
    },
    // 点击左侧栏列表
    handleList(item) {
      if (this.active === item.accountId) return
      for (const items in this.dropConf) {
        this.dropConf[items].loading = true
      }
      this.active = item.accountId
      this.$emit('childLeftItem', item)
    },
    querySearch() {
      this.showList = []
      this.list.filter(val => {
        if (val.mediaName.indexOf(this.input) !== -1) {
          this.showList.push(val)
        }
      })
    },
    clear() {
      this.showList = this.list
    },
    // 左侧栏选中
    handleCheckedCitiesChange(e) {
      console.log(e)
    },
    // 添加账号
    handleCardList(value) {
      this.dialogCheck = value
    }
  }
}
</script>
<style scoped lang="scss">
.closeBox {
  width: 0;
  transition: width 0.28s;
  .sidebarBox {
    display: none;
  }
}
.openBox {
  width: 300px;
  transition: width 0.28s;
  .sidebarBox {
    display: block;
  }
}
.sidebarBox {
  @include background_color(left-sidebar);
  height: calc(100vh - 66px);
  padding: $margin22px 8px;
  border-radius: $radious4px;
  margin-top: -16px;
  .inputSear {
    display: flex;
    /deep/ .el-input__inner {
      height: $height32px;
      color: #303133;
      background: #E8ECF0;
    }
  }
  .context {
    margin-top: $margin16px;
    max-height: 85%;
    overflow: auto;
    margin-right: -16px;
    padding-right: $margin16px;
  }
  .contextList {
    height: $height40px;
    line-height: $height40px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 8px 0 24px;
    @include color(color-sidebar);
    .imgs {
      font-size: $font18px;
      margin-right: $margin20px;
      width: $width24px;
      line-height: $height40px;
    }
    .name {
      width: calc(100% - 24px);
      text-align: left;
      font-size: $font14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .zi {
      font-size: $font12px;
      width: 16px;
      height: $margin20px;
      margin-left: $margin8px;
      color: #FEA600;
      line-height: 18px;
      text-align: center;
      background: rgba(254, 166, 0, 0.2);
      margin-top: 10px;
    }
  }
  .contextList:hover {
    @include background_color(hover-sidebar);
    @include color(hover-color-sidebar);
    cursor: pointer;
  }
  .contextList.active {
    @include background_color(hover-sidebar);
    @include color(hover-color-sidebar);
  }
  .buttons {
    text-align: center;
    margin: 35px auto;
  }
  /deep/ i.el-icon-caret-left {
    line-height: 32px;
    margin-left: 8px;
    cursor: pointer;
  }
  /deep/ .el-input__icon {
    line-height: 32px;
  }
  /deep/ .contextList .el-checkbox-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  /deep/ span.el-checkbox__input {
    width: $inputWidth;
  }
  /deep/ .el-checkbox__label {
    display: inline-block;
    font-weight: 400;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 8px;
    text-align: left;
    max-width: 92%;
    vertical-align: middle;
  }
  /deep/ .context .el-checkbox:last-of-type {
    width: calc(100% - 24px);
  }
}
</style>
