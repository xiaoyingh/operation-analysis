<template>
  <div class="comparison">
    <div class="list">
      <div class="item-xh">
        <label for="">产品型号：</label>
        <el-input
          class="textInput"
          placeholder="请输入产品型号"
          v-model="params[0].name"
          clearable>
        </el-input>
      </div>
      <div class="item-pt">
        <label for="">选择平台：</label>
        <el-select v-model="params[0].platform" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="list vs">
      <div>VS</div>
    </div>
    <div class="list">
      <div class="item-xh">
        <label for="">产品型号：</label>
        <el-input
          class="textInput"
          placeholder="请输入产品型号"
          v-model="params[1].name"
          clearable>
        </el-input>
      </div>
      <div class="item-pt">
        <label for="">选择平台：</label>
        <el-select v-model="params[1].platform" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="list vs">
      <div>VS</div>
    </div>
    <div class="list">
      <div class="item-xh">
        <label for="">产品型号：</label>
        <el-input
          class="textInput"
          placeholder="请输入产品型号"
          v-model="addParams[0].name"
          clearable>
        </el-input>
      </div>
      <div class="item-pt">
        <label for="">选择平台：</label>
        <el-select v-model="addParams[0].platform" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="add">
      <el-button type="primary">添加</el-button>
    </div>
    <div class="search">
      <el-button type="primary" @click="handleClick">对比</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return {
      params: [
        {
          name: '海尔冰箱BCD-458WDVMU1',
          platform: '京东'
        },
        {
          name: '海尔冰箱BCD-458WDVMU1',
          platform: '苏宁'
        }
      ],
      addParams: [
        {
          name: '海尔冰箱BCD-458WDVMU1',
          platform: '天猫'
        }
      ],
      options: [
        {
          label: '京东',
          value: '京东'
        },
        {
          label: '国美',
          value: '国美'
        },
        {
          label: '苏宁',
          value: '苏宁'
        },
        {
          label: '天猫',
          value: '天猫'
        }
      ],
    }
  },
  mounted () {
    this.handleClick()
  },
  methods: {
    handleClick(){
      let param = this.params.concat(this.addParams)
      this.$emit('handleComparisonClick', param)
    }
  }
}
</script>
<style scoped lang="scss">
.comparison {
  width: 100%;
  height: 160px;
  padding: 20px;
  margin-bottom: 20px;
  .list {
    float: left;
    width: 300px;
    height: 100%;
    .item-xh {
      margin-bottom: 20px;
    }
    .textInput {
      width: 200px;
    }
    .select {
      width: 200px;
    }
  }
  .vs {
    width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 40px;
  }
  .add {
    float: left;
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .search {
    float: left;
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>