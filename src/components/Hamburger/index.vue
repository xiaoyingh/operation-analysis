<template>
  <div class="hamburger" @click="toggleClick">
    <span v-if="!isActive" :class="{'in-active': !isActive}">
      <!-- <i class="el-icon-d-arrow-right" /> -->
      <i class="right" title="打开" />
    </span>
    <span v-if="isActive" :class="{'is-active': isActive}">
      <!-- <i class="el-icon-d-arrow-left" /></span> -->
      <i class="left" title="收起" />
    </span></div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>
<style scoped lang="scss">
.right{
	display: inline-block;
	background: url(../../assets/images/leftIcon.png);
	height: 14px;
	width: 14px;
	background-size: 100%;
	transform:rotate(180deg);
}
.left{
	display: inline-block;
	background: url(../../assets/images/leftIcon.png);
	height: 14px;
	width: 14px;
	background-size: 100%;
}
</style>

