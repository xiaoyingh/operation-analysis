<template>
  <div>
    <div class="serch_box">
      <!--   筛选框   -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="formInline.user"
            style="width:172px;margin-right: 14px;"
            placeholder="请输入账号名称"
            prefix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item label="所属机构:">
          <el-select v-model="formInline.mechanism" style="width:134px;margin-right: 6px;" placeholder="请选择">
            <el-option
              v-for="item in organ"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="账号类型:">
          <el-select v-model="formInline.type" style="width:134px" placeholder="请选择">
            <el-option
              v-for="item in numData"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
          <el-button style="margin-left: 16px" type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          <el-button @click="onResrt">重置</el-button>
        </el-form-item>
      </el-form>
      <!--   账号选择   -->
      <el-checkbox-group v-model="selectArr" @change="handleCardList">
        <el-card v-for="(item,index) in cardLists" :key="index" class="dialogBox" shadow="hover">
          <div v-if="selectArr.length === 0" :mediaName="item.mediaName" class="cardTitle">{{ item.mediaName }}</div>
          <el-checkbox v-else :label="item.accountId" :media-name="item.mediaName">{{ item.mediaName }}</el-checkbox>
        </el-card>

      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import { selectManagementAnalysis } from '@/api/comparativeAnalysis'
export default {
  data() {
    return {
      formInline: {
        user: '',
        mechanism: '',
        type: ''
      },
      numData: [{ value: '', text: '全部' }, { value: '1', text: '自有账号' }, { value: '2', text: '其他账号' }],
      organ: [{ value: '', text: '全部' }, { value: '1', text: '机构A' }, { value: '2', text: '机构B' }],
      cardLists: [
        {
          type: '微信',
          data: [{ title: '人民日报', id: '2021012801' }, { title: '人民网', id: '2021012802' }, {
            title: '环球时报',
            id: '2021012803'
          }, { title: '新华网', id: '2021012804' }, { title: '新华视点', id: '2021012805' }]
        },
        {
          type: '微博',
          data:
            [{ title: '环球网', id: '2021012810' }, { title: '人民日报', id: '2021012811' }, { title: '新华视点', id: '2021012812' }, { title: '央广网', id: '2021012813' }, { title: '央视新闻', id: '2021012814' }]
        },
        {
          type: '短视频',
          data: [{ title: '人民日报（抖音）', id: '2021012821' }, { title: '人民日报（快手）', id: '2021012822' }, { title: '新华社(抖音)', id: '2021012823' }, { title: '新华网(抖音)', id: '2021012824' }, { title: '新华社(快手)', id: '2021012825' }, { title: '新华网(快手)', id: '2021012826' }]
        },
        {
          type: '传统媒体',
          data:
            [{ title: '新华网', id: '2021012830' }, { title: '央视网', id: '2021012831' }, { title: '中国新闻网', id: '2021012832' }, { title: '中国日报网', id: '2021012833' }, { title: '光明网', id: '2021012834' }]
        }
      ], // 下面所有数据
      wecaht: [{ title: '人民日报', id: '2021012801' }, { title: '人民网', id: '2021012802' }, {
        title: '环球时报',
        id: '2021012803'
      }, { title: '新华网', id: '2021012804' }, { title: '新华视点', id: '2021012805' }],
      webo: [{ title: '环球网', id: '2021012810' }, { title: '人民日报', id: '2021012811' }, {
        title: '新华视点',
        id: '2021012812'
      }, { title: '央广网', id: '2021012813' }, { title: '央视新闻', id: '2021012814' }],
      duanshipin: [{ title: '人民日报（抖音）', id: '2021012821' }, { title: '人民日报（快手）', id: '2021012822' }, {
        title: '新华社(抖音)',
        id: '2021012823'
      }, { title: '新华网(抖音)', id: '2021012824' }, { title: '新华社(快手)', id: '2021012825' }, {
        title: '新华网(快手)',
        id: '2021012826'
      }],
      chuanmei: [{ title: '新华网', id: '2021012830' }, { title: '央视网', id: '2021012831' }, {
        title: '中国新闻网',
        id: '2021012832'
      }, { title: '中国日报网', id: '2021012833' }, { title: '光明网', id: '2021012834' }],
      selectedNum: [], // 已选则的账号-顶部
      allNum: [], // 所有账号数组
      selectArr: ['70', '73'], // 下面数组-选则的账号(回显)
      isToggle: true, // 是否展开: false 关闭，true 展开
      checkAll: false // 全选

    }
  },
  mounted() {
    for (let i = 0; i < this.cardLists.length; i++) {
      this.allNum.push(this.cardLists[i])
    }
    if (this.selectedNum.length === 0) {
      // selectedNum为 0，未选择账号
      this.checkAll = false
      this.checkAll ? this.selectedNum = this.allNum.slice(0) : this.selectedNum // 已选择账号数组赋值
      this.checkAll ? this.isToggle = false : true // 默认全选状态下收起
    } else {
      // 账号回显
      for (let i = 0; i < this.selectedNum.length; i++) {
        this.selectArr.push(this.selectedNum[i].accountId)
      }
    }
    this.getCurrentData()
  },
  methods: {
    // 重置
    onResrt() {
      this.formInline.user = ''
      this.formInline.mechanism = ''
      this.formInline.type = ''
      this.getCurrentData()
    },
    // 选择数据来源
    selectSource() {
      this.checkAll = true
      this.checkAll ? this.selectedNum = this.allNum.slice(0) : [] // 已选择账号数组赋值
      this.checkAll ? this.isToggle = false : true // 默认全选状态下收起
      for (let i = 0; i < this.allNum.length; i++) {
        this.selectArr.push(this.allNum[i].accountId)
      }
    },
    // 账号分类-选择账号
    handleCardList(value) {
      this.selectArr = value
      const temSelObj = []
      for (let i = 0; i < value.length; i++) {
        this.allNum.filter(val => {
          if (val.accountId === value[i]) {
            temSelObj.push(val)
          }
        })
      }
      const dataArr = {
        accountId: this.selectArr,
        channelType: localStorage.getItem('channelType'),
        moduleType: 2,
        tenantId: 5
      }
      this.$emit('parentFun', dataArr)
      this.selectedNum = temSelObj
      if (this.selectedNum.length > 9) {
        this.isToggle = true
      } else {
        this.isToggle = false
      }
      if (this.selectedNum.length === this.allNum.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    // 删除账号
    delects(index) {
      this.selectArr.splice(index, 1)
      this.selectedNum.splice(index, 1)
      if (this.selectedNum.length === this.allNum.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    // 展开收起功能
    toggle() {
      if (this.selectedNum.length > 9) {
        this.isToggle = !this.isToggle
      }
    },
    // 全选 反选
    handleCheckAllChange() {
      if (this.checkAll) {
        this.selectedNum = this.allNum.slice(0)
        this.selectArr = []
        for (let i = 0; i < this.allNum.length; i++) {
          this.selectArr.push(this.allNum[i].accountId)
        }
      } else {
        this.selectedNum = []
        this.selectArr = []
      }
    },
    // 搜索
    onSubmit() {
      this.getCurrentData()
    },
    // 暂时应付演示
    getCurrentData(route) {
      console.log(this.$route.path, 'this.$route.path')
      switch (this.$route.path) {
        case '/comparativeAnalysis/wechatComparison':
          this.cardLists[0].data = this.wecaht
          // this.selectManagementAnalysis(4)
          // localStorage.setItem('channelType', '4')
          break
        case '/comparativeAnalysis/microblogComparison':
          this.cardLists[0].data = this.webo
          // this.selectManagementAnalysis(5)
          // localStorage.setItem('channelType', '5')
          break
        case '/comparativeAnalysis/shortVideoComparison':
          this.cardLists[0].data = this.duanshipin
          // this.selectManagementAnalysis('7,8')
          // localStorage.setItem('channelType', '7,8')
          break
        case '/comparativeAnalysis/traditionalMediaComparison':
          this.cardLists[0].data = this.chuanmei
          // this.selectManagementAnalysis('1,2')
          // localStorage.setItem('channelType', '1,2')
          break
      }
    },
    // 获取列表方法
    selectManagementAnalysis(id) {
      const obj = {
        tenantId: 5,
        pageNum: 1,
        pageSize: 100,
        channelType: id,
        organizationName: this.formInline.mechanism,
        accountType: this.formInline.type,
        accountName: this.formInline.user
      }

      selectManagementAnalysis(obj).then(res => {
        if (res && res.data && res.data[0]) {
          this.cardLists = res.data[0].data
        }
      }).catch(res => {
        console.log('失败')
      })
    }
  }
}
</script>

<style scoped lang="scss">

.serch_box .el-button + .el-button {
  margin-left: $margin16px;
}
.serch_box {
  min-height: 300px;
  background: $pureWhite;
  .demo-form-inline {
    margin-bottom: 10px;
  }
  /deep/ .el-checkbox__label {
    padding-left: 4px;
  }
  /deep/ label.el-checkbox {
    //padding-left: 8px;
  }
  /deep/ span.el-checkbox__label {
    display: inline-block;
    vertical-align: middle;
  }
  /deep/ .el-icon-error {
    cursor: pointer;
  }
  /deep/ .el-form-item__label {
    padding-right: 8px;
  }
  /deep/ .el-card.is-hover-shadow {
    height: 40px;
    line-height: 40px;
    float: left;
    margin: 0 16px 16px 0;
    text-align: center;
    padding: 0 8px;
  }
  /deep/ .el-card__body {
    padding: 0;
  }
  .cardTitle {
    font-size: 14px;
    /*vertical-align: middle;*/
  }
}
.dialogBox {
  overflow: hidden;
  p.classification {
    font-size: 16px;
    color: #333333;
    line-height: 24px;
    margin: 0 0 16px 8px;
  }
}
.selectSource {
  margin-bottom: 24px;
  color: $functionButtonColor !important;
}
.el-button.el-button--default:active {
  background: #ececec;
}
/* 已选账号 */
.selectNumb {
  max-height: 306px;
  overflow-y: scroll;
  background: #F8F9FB;
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;
  .boxSel {
    overflow: hidden;
    width: 96%;
  }
  .list {
    text-align: center;
    color: #333333;
    line-height: 38px;
    float: left;
    margin: 0 8px;
    i {
      color: #FF8066;
    }
  }
  span.toggle {
    position: absolute;
    right: 16px;
    bottom: 10px;
    font-size: 14px;
    color: #3471FF;
    cursor: pointer;
  }
}
.lowHeight {
  height: 38px;
  overflow-y: hidden;
}
.highHeight {
  max-height: 306px;
  overflow-y: scroll;
}
</style>
