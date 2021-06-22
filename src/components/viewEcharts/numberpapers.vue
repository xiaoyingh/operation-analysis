<template>
  <div class="numberpapers">
    <div v-for="(item,i) in papers" :key="i" class="box">
      <div class="numberTitle" />
      <div class="numbercon">
        <span class="numberconnum">{{ item.number }}</span>
        <span class="numberconTitle">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Numberpapers',
  props: {
    papers: { // 列表数组，必传
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // papers: [{
      //   name: '发布总数',
      //   number: '580,886'
      // }, {
      //   name: '关注总量',
      //   number: '235,110'
      // }, {
      //   name: '阅读总量',
      //   number: '5,886'
      // }, {
      //   name: '转发总量',
      //   number: '580,886'
      // }, {
      //   name: '评论总量',
      //   number: '468'
      // }, {
      //   name: '点赞总量',
      //   number: '180,881'
      // }]
    }
  }

}
</script>

<style scoped lang="scss">
 .numberpapers{
		height: 96px;
		display: flex;
   margin:  0 8px;
		.numberTitle{
			margin-top: 28px;
			height: 40px;
			width: 40px;
			color: #333333;
			margin-left: 32px;

		}
		.numbercon{
			height: 64px;
			line-height: 26px;
			margin-top: 16px;
			margin-left: 24px;
			border-right: 1px solid #ddd;
			flex: 1;
			.numberconTitle{
				font-size: 14px;
				font-weight: 400;
				color: #8C8C8C;
				display: block;
				text-align: left;

			}
			.numberconnum{
				font-size: 24px;
				font-weight: 500;
				margin-top: 8px;
				color: #3471FF;
				text-align: left;
				margin-right: 15px;
				display: block;
			}
		}
 }
 .numberpapers .box:last-child .numberTitle, .numberpapers .box:last-child .numbercon{
		border-right: 0;
 }
 .numberpapers .box{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
		display: flex;
    height: 96px;
    @include background-color('tab-nav-bg');
    font-size: 20px;
    @include color('tab-item-color');
 }
 .box:nth-child(1){
		.numberTitle{
			background:url(../../assets/images/head01.png) no-repeat center;
			background-size: 40px 40px;
			border-radius: 5px;
		}
 }
 .box:nth-child(2){
		.numberTitle{
			background:url(../../assets/images/head02.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
 .box:nth-child(3){
		.numberTitle{
			background:url(../../assets/images/head03.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
 .box:nth-child(4){
		.numberTitle{
			background:url(../../assets/images/head04.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
 .box:nth-child(5){
		.numberTitle{
			background:url(../../assets/images/head05.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
 .box:nth-child(6){
		.numberTitle{
			background:url(../../assets/images/head06.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
 .box:nth-child(7){
		.numberTitle{
			background:url(../../assets/images/head07.png) no-repeat center;
			background-size: 40px 40px;
		}
 }
</style>
