<!--
 * @Description:
 * @Version: 1.0.0
 * @Autor: fc
 * @Date: 2020-11-30 18:38:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-05 14:27:55
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div id="siderBarBox">
      <sidebar class="sidebar-container" />
    </div>
    <div class="app-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    const siderBarColor = localStorage.getItem('siderBarColor') ? localStorage.getItem('siderBarColor') : 'light'
    this.$store.dispatch('app/toggleSiderBarColor', siderBarColor)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/common/mixin.scss";
.app-wrapper {
  @include clearfix;
  @include relative;
}
</style>
