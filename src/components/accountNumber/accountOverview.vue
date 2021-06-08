<template>
  <div>
    <div class="serch_box">
      <!--  已选账号    -->
      <el-button v-if="oneShows == true" class="selectSource" @click="selectSource">选择数据来源</el-button>
      <div v-else class="selectNumb" :class="isToggle ? 'highHeight':'lowHeight' ">
        <div class="boxSel">
          <div v-for="(item,index) in selectedNum" :key="index" class="list">
            {{ item.title }}
            <i class="el-icon-error" @click="delects(index)" />
          </div>
        </div>
        <span v-if="selectedNum.length > 9" class="toggle" @click="toggle()">{{ isToggle ? '收起':'展开' }}</span>
      </div>
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
        <el-form-item label="账号渠道:">
          <el-select v-model="formInline.region" style="width:134px;margin-right: 6px;" placeholder="请选择">
            <el-option
              v-for="item in weichartData"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
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
        </el-form-item>
        <el-form-item style="margin-right: 0;float:right">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          <el-button @click="onResrt">重置</el-button>
        </el-form-item>
      </el-form>
      <!--   全选和反选   -->
      <el-checkbox v-if="oneShows == false" v-model="checkAll" style="margin-bottom: 24px;" @change="handleCheckAllChange">全选</el-checkbox>
      <!--   账号列表   -->
      <el-checkbox-group v-model="selectArr" @change="handleCardList">
        <div v-for="(item,index) in cardLists" :key="index" class="dialogBox">
          <p class="classification">{{ item.type }}</p>
          <el-card v-for="(item2,index2) in item.data" :key="index2" shadow="hover">
            <div v-if="oneShows === true" :title="item2.title" class="cardTitle">{{ item2.title }}</div>
            <el-checkbox v-else :label="item2.id" :title="item2.title">{{ item2.title }}</el-checkbox>
          </el-card>
        </div>
      </el-checkbox-group>
    </div>
    <!-- 底部按钮插槽 -->
    <div v-if="oneShows == false" class="button">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oneShows: true, // 默认弹框样式是否显示
      formInline: {
        user: '',
        region: '',
        mechanism: '',
        type: '',
      },
      weichartData: [{ value: '', text: '全部' }, { value: '1', text: '客户端' }, { value: '2', text: '微信' }, { value: '3', text: '微博' }, { value: '4', text: '头条' }, { value: '5', text: '抖音' }, { value: '6', text: '快手' }, { value: '7', text: '网站' }, { value: '8', text: '电子报纸' }],
      numData: [{ value: '', text: '全部' }, { value: '1', text: '自有账号' }, { value: '2', text: '其他账号' }],
      organ: [{ value: '', text: '全部' }, { value: '1', text: '机构A' }, { value: '2', text: '机构B' }],
      cardLists: [
        {
          type: '微信',
          data: [{ title: '人民日报', id: '2021012801' }, { title: '人民网', id: '2021012802' }, { title: '环球时报', id: '2021012803' }, { title: '新华网', id: '2021012804' }, { title: '新华视点', id: '2021012805' }]
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
      selectedNum: [], // 已选则的账号-顶部
      allNum: [], // 所有账号数组
      selectArr: [], // 下面数组-选则的账号(回显)
      isToggle: true, // 是否展开: false 关闭，true 展开
      checkAll: false // 全选
    }
  },
  mounted() {
    for (let i = 0; i < this.cardLists.length; i++) {
      for (let j = 0; j < this.cardLists[i].data.length; j++) {
        this.allNum.push(this.cardLists[i].data[j])
      }
    }
    if (this.selectedNum.length === 0) {
      // selectedNum为 0，未选择账号
      this.checkAll = false
      this.checkAll ? this.selectedNum = this.allNum.slice(0) : this.selectedNum // 已选择账号数组赋值
      this.checkAll ? this.isToggle = false : true // 默认全选状态下收起
    } else {
      // 账号回显
      for (let i = 0; i < this.selectedNum.length; i++) {
        this.selectArr.push(this.selectedNum[i].id)
      }
    }
  },
  methods: {
    // 重置
    onResrt() {
      this.formInline.user = ''
      this.formInline.region = ''
      this.formInline.mechanism = ''
      this.formInline.type = ''
    },
    // 搜索
    onSubmit() {
      console.log(this.formInline)
    },
    // 选择数据来源
    selectSource() {
      this.oneShows = false
      this.checkAll = true
      this.checkAll ? this.selectedNum = this.allNum.slice(0) : [] // 已选择账号数组赋值
      this.checkAll ? this.isToggle = false : true // 默认全选状态下收起
      for (let i = 0; i < this.allNum.length; i++) {
        this.selectArr.push(this.allNum[i].id)
      }
    },
    // 账号分类-选择账号
    handleCardList(value) {
      this.selectArr = value
      const temSelObj = []
      for (let i = 0; i < value.length; i++) {
        this.allNum.filter(val => {
          if (val.id === value[i]) {
            temSelObj.push(val)
          }
        })
      }
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
          this.selectArr.push(this.allNum[i].id)
        }
      } else {
        this.selectedNum = []
        this.selectArr = []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/.el-checkbox__label{
    padding-left: 4px;
  }
  /deep/span.el-checkbox__label {
    display: inline-block;
    vertical-align: middle;
  }
  /deep/.el-icon-error{
    cursor: pointer;
  }
  /deep/.el-form-item__label{
    padding-right: 8px;
  }
  /deep/.el-card.is-hover-shadow {
    height: 40px;
    line-height: 40px;
    float: left;
    margin: 0 16px 16px 0;
    text-align: center;
    padding: 0 8px;
  }
  /deep/.el-card__body{
    padding: 0;
  }
  .cardTitle {
    font-size: 14px;
    /*vertical-align: middle;*/
  }
  .serch_box .el-button + .el-button{margin-left:$margin16px;}
  .serch_box{
    background: $pureWhite;
  }
  .dialogBox {
    overflow: hidden;
    p.classification{
      font-size: 16px;
      color: #333333;
      line-height: 24px;
      margin: 0 0 16px 8px;
    }
  }
  .selectSource{
    margin-bottom: 24px;
    color: $functionButtonColor !important;
  }
  .el-button.el-button--default:active{
    background: #ececec;
  }
  /* 已选账号 */
  .selectNumb{
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
    .list{
      margin: 0 8px;
      text-align: center;
      color: #333333;
      line-height: 38px;
      float: left;
      i{
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
  .lowHeight{
    height: 38px;
    overflow-y: hidden;
  }
  .highHeight{
    max-height: 306px;
    overflow-y: scroll;
  }
</style>
