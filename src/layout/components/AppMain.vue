<template>
  <div class="main-box">
    <section :class="{'app-main':true,'margin-none':isHome}">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>

    <div v-if="sliderShow === false" v-show="displaySlider" class="shrinkBox" @click="sliderToggle()">
      {{ $route.meta.title }}
      <i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      isHome: true,
      displaySlider: true
    }
  },
  computed: {
    sliderShow() {
      return this.$store.getters.sliderShow// 需要监听的数据
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route(to, from) {
      // 为了解决拖拽组件边距对不齐的情况（是首页的话去掉内容区左右边距）
      setTimeout(() => {
        this.isHome = to.path === '/analysisIndex'
      }, 600)
      // 如果跳转的是账号管理路由则取消侧边栏悬浮
      this.displaySlider = to.path !== '/accountManagement/manageIndex'
    }
  },
  mounted() {
    // 为了解决拖拽组件边距对不齐的情况（是首页的话去掉内容区左右边距）
    this.isHome = this.$route.path === '/analysisIndex'
  },
  methods: {
    sliderToggle() {
      this.$store.commit('accountAnalysis/widthCol', !this.$store.getters.sliderShow)
    }
  }
}
</script>
<style scoped lang="scss">
.main-box {
  height: calc(100vh - 65px);
  position: relative;
}
/deep/ i.el-icon-caret-right {
  cursor: pointer;
  margin-right: 2px;
}
.shrinkBox {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 50%;
  width: 31px;
  min-height: 118px;
  font-size: 12px;
  padding: 14px 0 18px 2px;
  border-radius: 0 8px 8px 0;
  line-height: 22px;
  transform: translateY(-50%);
  @include background_color(left-sidebar);
}
.shrinkBox:hover {
  opacity: 0.8;
}
.shrinkBox:active {
  opacity: 1;
}
</style>
