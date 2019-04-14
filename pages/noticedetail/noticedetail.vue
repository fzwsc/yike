<template>
	<view class="notice-detail">
		<view class="notice-item">
			<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
			<view class="notice-con">
				<view class="title">我发表了一个动态</view>
				<navigator url="../playarea/playarea" class="link" hover-class="none" open-type="switchTab">小雅发表了她的录音</navigator>
			</view>
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
   .notice-detail {}
   .notice-detail .notice-item {
	   display: flex;
	   padding: 33upx 130upx 20upx 34upx;
   }
   .notice-detail .notice-item .pic {
	   display: block;
	   width: 100upx;
	   height: 100upx;
	   margin-right: 21upx;
	    border-radius: 50%;
	   overflow: hidden;
   }
   .notice-detail .notice-item .notice-con {
	   position: relative;
	   width: 454upx;
	   padding: 30upx 0 30upx 26upx;
	   background: #FFFFFF;
	   
   }
    .notice-detail .notice-item .notice-con:after {
		content: '';
		position: absolute;
		top: 40upx;
		left: -24upx;
		width: 0;
		height: 0;
		border-width: 15rpx;
		border-style: solid;
		border-color: #F2F2F2 #FFFFFF #F2F2F2 #F2F2F2;
	}
	.notice-con .notice-item .title {
		color: #333333;
		font-size: 30upx;
	}
   .notice-detail .notice-item .link {
	   margin-top: 57upx;
	   font-size: 30upx;
	   color: #5C82A8;
	   text-decoration: underline;
   }
</style>
