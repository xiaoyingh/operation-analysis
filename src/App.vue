<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    this.$store.dispatch('app/toggleTheme', theme)
    const navBarColor = localStorage.getItem('navBarColor') ? localStorage.getItem('navBarColor') : '#e11836'
    this.$store.dispatch('app/toggleNavBarColor', navBarColor)
  }
}
</script>
