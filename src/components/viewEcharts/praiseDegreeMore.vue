<template>
  <div class="praise-box">
    <div v-for="(item,index) in praiseData" :key="index" :style="calcWidth">
      <p class="praiseBoxTitle">{{ item.name }}</p>
      <div class="praiseCon">
        <el-rate
          v-model="item.value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'praiseDegreeMore',
  props: {
    praiseData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    calcWidth() {
      if (this.praiseData.length > 4) {
        return { minWidth: parseInt(100 / 4) - 0.01 + '%', maxWidth: '50%', height: '100%', float: 'left' }
      } else {
        return { minWidth: parseInt(100 / this.praiseData.length) - 0.01 + '%', maxWidth: '50%', height: '100%', float: 'left' }
      }
    }
  },
  watch: {
    praiseData: {
      handler: function() {
        this.$nextTick(() => {
          this.initPraise()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.initPraise()
  },
  methods: {
    initPraise() {
      
    } 
  }
}
</script>

<style scoped lang="scss">
.praise-box {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  .praiseBoxTitle {
    width: calc(100% - 16px);
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    text-align: center;
    background: #F8F9FB;
    margin: 0 0 0 16px;
  }
  .praiseCon {
    width: 100%;
    height: calc(100% - 32px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    /deep/.el-rate__icon {
      font-size: 30px;
    }
  }
}
</style>
