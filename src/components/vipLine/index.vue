<template>
  <div class="vip-line">
    <img class="vip-logo" src="~@/assets/images/vip_logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'VipLine'
}
</script>

<style scoped lang="scss">
.vip-line {
  width: calc(100% - 16px);
  height: 61px;
  margin: 0 8px;
  background-image: url("~@/assets/images/vip_blue_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .vip-logo {
    width: 270px;
    height: 61px;
  }
}

</style>
