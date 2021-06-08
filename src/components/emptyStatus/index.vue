<template>
  <div class="empty">
    <div v-if="showPic" class="empty_img">
      <img :src="url" alt="">
    </div>
    <p class="empty_description">{{ noDataAvailable }}</p>
  </div>
</template>

<script>
export default {
  props: {
    showPic: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      default: require('@/assets/logo/empty-image-default.svg')
    },
    noDataAvailable: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang='scss' scoped>
.empty {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px 0;
  .empty_img {
    // width: 160px;
    // height: 160px;
    img {
      width: 100%;
    }
  }
  .empty_description {
    margin-top: 16px;
    padding: 0 60px;
    color: #969799;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
