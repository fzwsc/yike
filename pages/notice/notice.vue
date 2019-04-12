<template>
	<view class="notice">
		 <view class="type-list">
			<navigator url="../mypoints/mypoints" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">提问</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../mypraise/mypraise" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">评论</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../mycomments/mycomments" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">赞</view>
				<view class="arrow"></view>
			</navigator>
		</view>
		<view class="user-list">
			<view class="user-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="user-info">
					<view class="user-text">
						<view class="user-name">林小雅</view>
						<view class="time">
							22:211
						</view>
					</view>
					<view class="user-text">
						<view class="dynamic">林小雅老师发布了一条新动态</view>
						<view class="radius">
							1
						</view>
					</view>
				</view>
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
   .notice .type-list,
   .notice .user-list{
   	background: #fff;
   	padding: 0 30upx;
   }
   .notice .type-list .type-item {
   	display: flex;
   	align-items: center;
   	padding: 22upx 0;
   	border-bottom: 1px solid #EEEEEE;
   }
   .notice .type-list .type-item .pic {
   	display: block;
   	width: 72upx;
   	height: 72upx;
   }
   .notice .type-list .type-item .text{
   	flex: 1;
   	font-size: 30upx;
   	margin-left: 21upx;
   }
   .notice .type-list .type-item .arrow {
   	  width: 20upx;
   	  height: 20upx;
   	  border-top: 1px solid #C9C9C9;
   	  border-right: 1px solid #C9C9C9;
   	  transform: rotate(45deg);
   }
    .notice .user-list .user-item {
		display: flex;
		align-items: center;
		padding: 20upx 0;
	}
   .notice .user-list .user-item .pic{
	   display: block;
	   width: 70upx;
	   height: 70upx;
	   margin-right: 20upx;
   }
    .notice .user-list .user-item .user-info {
		flex: 1;
	}
    .notice .user-list .user-item .user-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
   .notice .user-list .user-item .user-name {
	   font-size: 30upx;
   }
   .notice .user-list .user-item .time {
	   color: #999999;
	   font-size: 20upx;
   }
    .notice .user-list .user-item .dynamic {
		 color: #999999;
		font-size: 20upx;
	}
	.notice .user-list .user-item .radius {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24upx;
		height: 24upx;
		border-radius: 50%;
		overflow: hidden;
		color: #fff;
		font-size: 20upx;
		background: #FC4E51;
	}
   
</style>
