<template>
  <el-drawer
    title="主题设置"
    :modal="false"
    size="276px"
    :show-close="false"
    :visible.sync="drawer"
    :direction="direction"
  >
    <div class="setting-container">
      <div class="color-configuration">
        <p>浅色边栏+头部主题</p>
        <div class="notice">（不支持暗夜黑模式）</div>
        <el-row>
          <el-col v-for="(item,index) in predefineColors" :key="index" :span="8">
            <div class="box">
              <div :style="{'--color-box':item.value,'cursor':theme =='dark'?'not-allowed': ''}" @click="changeNavbarColor(item.value)">
                <i
                  v-if="(siderBarColor == 'light' && theme == 'light' && navBarColor == item.value)"
                  class="el-icon-check"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider />
      <div class="color-siderbar">
        <p>深色边栏+头部主题</p>
        <el-row>
          <el-col v-for="(item,index) in predefineColors" :key="index" :span="8" :style="{'--color-box':item.value}">
            <div class="box" @click="changeSiderBarColor(item.value)">
              <div class="left" />
              <div class="right">
                <i v-if="(siderBarColor == 'dark' || theme =='dark') && navBarColor == item.value" class="el-icon-check" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider />
      <div class="color-mode">
        <p>模式主题</p>
        <el-row>
          <el-col v-for="(item,index) in siderBarColors" :key="index" :span="8" :style="{'--mode-box':item.value}">
            <div class="box">
              <div @click="changeTheme(item.theme)">
                <i
                  v-if="theme == item.theme"
                  class="iconfont"
                  :class="item.icon"
                  :style="{color: item.iconColor}"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SettingDrawer',
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      predefineColors: [ // 内置主题颜色
        {
          value: '#e11836',
          label: '活力红'
        },
        {
          value: '#3370fd',
          label: '精锐蓝'
        },
        {
          value: '#6a65e7',
          label: '简约紫'
        },
        {
          value: '#fba800', // 活力红
          label: '青春黄'
        },
        {
          value: '#27cbb2', // 活力红
          label: '生态绿'
        },
        {
          value: '#59657f', // 活力红
          label: '星空灰'
        }
      ],
      siderBarColors: [ // 内置主题颜色
        {
          value: '#ffffff',
          label: '纯净白',
          theme: 'light',
          icon: 'icontaiyang',
          iconColor: '#242733'
        },
        {
          value: '#242733',
          label: '暗夜灰',
          theme: 'dark',
          icon: 'iconyejianmoshishenyemoshiyueliang',
          iconColor: '#ffffff'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['navBarColor', 'siderBarColor', 'theme'])
  },
  methods: {
    changeNavbarColor(val) {
      if (this.theme === 'dark') return
      this.$store.dispatch('app/toggleNavBarColor', val)
      this.$store.dispatch('app/toggleSiderBarColor', 'light')
    },
    changeSiderBarColor(val) {
      this.$store.dispatch('app/toggleNavBarColor', val)
      this.$store.dispatch('app/toggleSiderBarColor', 'dark')
    },
    changeTheme(theme) {
      this.$store.dispatch('app/toggleTheme', theme)
    }
  }
}
</script>

<style lang='scss' scoped>
.setting-container {
  padding: 0px 20px;
  p {
    @include color('theme-drawer-color')
  }
  ::v-deep .el-divider {
    @include background-color('theme-drawer-divider');
  }
  .notice {
    position: relative;
    top: -10px;
    font-size: 12px;
    left: -6px;
    @include color('theme-drawer-notice')
  }
  .el-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .el-col {
      margin-bottom: 23px;
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        div {
          width: 56px;
          height: 56px;
          background-color: var(--color-box);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            color: #fff;
            font-weight: 500;
            font-size: $font24px;
          }
        }
      }
    }
  }
  .color-siderbar {
    .box {
      display: flex;
      .left {
        width: 12px!important;
        background: #242733!important;
      }
      .right {
        width: 44px!important;
        i {
          margin-right: 0!important;
        }
      }
    }
  }
  .color-mode {
    .el-row {
      justify-content: flex-start;
      .el-col:nth-child(1) {
        .box{
          border: 1px solid #242733;
        }
      }
      .el-col:nth-child(2) {
        .box{
          background: #242733;
          border: 1px solid #242733;
        }
      }
    }
  }
}
</style>
