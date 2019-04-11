<template>
	<view class="person">
		<view class="my-info">
			<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
			<view class="info-desc">
				<view class="nickname">林小雅的专属</view>
				<view class="scholl-name">
				  南昌大学
				</view>
			</view>
			<view class="btn-fans">
				粉丝(99+)
			</view>
		</view>
		<view class="follow-con">
			<view class="text">我的关注</view>
			<view class="follow-area">
				<view class="follow-list">
					<view class="follow-item">
						<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
						<view class="user-name">我的名字</view>
					</view>
				</view>
				<view class="more">更多</view>
			</view>
		</view>
	    <view class="type-list">
	    	<view class="type-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的积分</view>
				<view class="arrow"></view>
			</view>
			<view class="type-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的点赞</view>
				<view class="arrow"></view>
			</view>
			<view class="type-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的评论</view>
				<view class="arrow"></view>
			</view>
			<view class="type-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">最近收听</view>
				<view class="arrow"></view>
			</view>
			<view class="type-item">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">设置</view>
				<view class="arrow"></view>
			</view>
	    </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
		}
	   }
	}
</script>

<style>
 .person {}
 .person .my-info {
	 display: flex;
	 align-items: center;
	 padding: 40upx 30upx 42upx 40upx;
	 border-bottom: 1px solid #EEEEEE;
	 background: #fff;
 }
.person .my-info .pic {
	display: block;
	width: 118upx;
	height: 118upx;
	margin-right: 31upx;
}
.person .my-info .info-desc {
	flex: 1;
}
.person .my-info .info-desc .nickname{
	margin-bottom: 18upx;
	font-size: 30upx;
}
.person .my-info .info-desc .scholl-name {
	font-size: 23upx;
}
.person .my-info .btn-fans {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 166upx;
	height: 62upx;
	color: #fff;
	font-size: 23upx;
	border-radius: 31upx;
	background: #F74C44;
}
.person .follow-con {
	padding-top: 17upx;
	padding: 18upx 61upx 9upx 40upx;
	background: #fff;
}
.person .follow-con .follow-area {
	display: flex;
	align-items: center;
}
.person .follow-con .follow-list {
	flex: 1;
	display: flex;
	align-items: center;
}
.person .follow-con .follow-item {
	margin-right: 30upx;
}
.person .follow-con .follow-item .pic {
	display: block;
	width: 70upx;
	height: 70upx;
}
.person .follow-con .follow-item .user-name {
	margin-top: 7upx;
	font-size: 17upx;
}
.person .follow-con .follow-area .more {
	width: 54upx;
	font-size: 21upx;
}
.person .type-list {
	margin-top: 20upx;
	background: #fff;
}
.person .type-list .type-item {
	display: flex;
	align-items: center;
	padding: 22upx 30upx;
	border-bottom: 1px solid #EEEEEE;
}
.person .type-list .type-item .pic {
	display: block;
	width: 46upx;
	height: 46upx;
}
.person .type-list .type-item .text{
	flex: 1;
	margin-left: 21upx;
}
.person .type-list .type-item .arrow {
	  width: 20upx;
	  height: 20upx;
	  border-top: 1px solid #C9C9C9;
	  border-right: 1px solid #C9C9C9;
	  transform: rotate(45deg);
}
</style>
