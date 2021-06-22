<template>
  <div class="price-box">
    <div v-for="(item,index) in priceData" :key="index" :style="calcWidth">
      <p class="priceBoxTitle">{{ item.name }}</p>
      <div class="priceCon">
        <div class="priceImg">
          <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
        </div>
        <div class="priceInfo">
          <p>价格：{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'priceDegreeMore',
  props: {
    priceData: {
      type: Array,
      default: () => [{}]
    }
  },
  computed: {
    calcWidth() {
      if (this.priceData.length > 4) {
        return { minWidth: parseInt(100 / 4) - 0.01 + '%', maxWidth: '50%', height: '100%', float: 'left' }
      } else {
        return { minWidth: parseInt(100 / this.priceData.length) - 0.01 + '%', maxWidth: '50%', height: '100%', float: 'left' }
      }
    }
  },
  watch: {
    priceData: {
      handler: function() {
        this.$nextTick(() => {
          this.initprice()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.initprice()
  },
  methods: {
    initprice() {
      
    } 
  }
}
</script>

<style scoped lang="scss">
.price-box {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  .priceBoxTitle {
    width: calc(100% - 16px);
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    text-align: center;
    background: #F8F9FB;
    margin: 0 0 0 16px;
  }
  .priceCon {
    width: 100%;
    height: calc(100% - 32px);
    .priceImg {
      width: 100%;
      height: 80%;
      img {
        display: block;
        height: 100%;
        margin: 0 auto;
      }
    }
    .priceInfo {
      width: 100%;
      text-align: center;
      height: 20%;
      padding-top: 5px;
    }
  }
}
</style>
