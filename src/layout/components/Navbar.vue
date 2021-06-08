<template>
  <div class="navbar">
    <!-- logo -->
    <div class="left">
      <span>运营分析</span>
    </div>
    <!-- 用户信息 -->
    <div class="right">
      <i
        class="iconfont"
        :class="hover ?'iconzu1679' :'iconICON_pifu'"
        @mouseover="hover =true"
        @mouseleave="hover =false"
        @click="openDrawer"
      />
      <span class="userimg">
        <img src="../../assets/images/user.png" alt="">
      </span>

      <span class="users">
        {{ userName }}
      </span>
    </div>
    <!-- 设置弹窗 -->
    <settingDrawer ref="settingDrawer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import settingDrawer from '@/components/settingDrawer'

export default {
  components: { settingDrawer },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    ...mapGetters(['userData', 'userName', 'theme', 'predefineColors']),
    navBarColor: {
      get() {
        return this.$store.getters.navBarColor
      },
      set() {
      }
    }
  },
  methods: {
    openDrawer() {
      this.$refs.settingDrawer.drawer = true
    }
  }
}
</script>
<style lang="scss" scoped>
.userimg {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  background: $userbackground;
  border-radius: 50%;
  margin-right: 14px;
}
.users {
  color: $usercolor;
}
</style>
