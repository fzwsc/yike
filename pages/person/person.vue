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
						<text class="user-name">我的名字</text>
					</view>
				</view>
				<text class="more">更多</text>
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
	margin-top: 17upx;
	padding: 18upx 61upx 9upx 40upx;
	background: #fff;
}
.person .follow-con .follow-area {
	display: flex;
}

.person .follow-con .follow-area .more {
	width: 54upx;
}
</style>
