<template>
	<view>
		<view class="gh">工号：130242014055</view>
			<view class="bt-login" @click="loginM">
			绑定微信
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
  .gh{
	  color: #333333;
	  font-size: 32upx;
	  text-align: center;
	  margin: 214upx 0;
  }
  .bt-login{
  	width: 630upx;
  	margin: 0 auto;
  	text-align: center;
  	height: 100upx;
  	line-height: 100upx;
  	border-radius: 50upx;
  	color: #FFFFFF;
  	background: #F74C44;
  	box-shadow: 10px 1px 5upx #F74C44;
  	font-size: 32upx;
  }
</style>
