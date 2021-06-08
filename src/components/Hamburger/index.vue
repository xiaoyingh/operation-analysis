<template>
  <div class="hamburger" @click="toggleClick">
    <span v-if="!isActive" :class="{'in-active': !isActive}">
      <i class="el-icon-d-arrow-right" />
    </span>
    <span v-if="isActive" :class="{'is-active': isActive}">
      <i class="el-icon-d-arrow-left" /> 收起 </span>
  </div>
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

