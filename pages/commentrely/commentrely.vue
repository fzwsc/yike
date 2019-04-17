<template>
	<view class="comment-rely">
		<view class="rely-item">
			<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="portrait"></image>
			<view class="rely-info">
				<view class="name">林小雅</view>
				<view class="msg">理想还是要回归现实的</view>
			     <view class="time">昨天 12:15</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
   view {
	   line-height: 1;
   }
   .comment-rely .rely-item {
   	display: flex;
   	padding: 23upx 32upx 0;
   	background: #FFFFFF;
   }
   .comment-rely .rely-item .portrait {
   	width: 60upx;
   	height: 60upx;
   	overflow: hidden;
   	border-radius: 50%;
   	margin-right: 15upx;
   }
   
   .comment-rely .rely-item .rely-info {
   	flex: 1;
   	padding-bottom: 25upx;
   	border-bottom: 1px solid #EEEEEE;
   
   }
   
   .comment-rely .rely-item .rely-info .name {
   	color: #333333;
   	font-size: 32upx;
   }
   
   .comment-rely .rely-item .rely-info .msg {
   	margin: 20upx 0;
   	color: #333333;
   	font-size: 30upx;
   }
   .comment-rely .rely-item .time {
   	color: #999999;
   	font-size: 24upx;
   }
</style>
