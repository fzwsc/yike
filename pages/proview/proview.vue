<template>
	<view>
		<view class="name-img">
			<view class="user-box">
				<image src="../../static/bofang.png" mode=""></image>
				<view class="text-info">
					<text>萧逸风</text>
					<text>04-02 12:00</text>
				</view>
			</view>
			<view class="follow" v-show="isFollow" @click="follow()"><text>已关注</text></view>
			<view class="no-follow" v-show="!isFollow" @click="noFllow()"><text>+关注</text></view>
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
.user-info {
	background: #ffffff;
	padding: 22upx 27upx 22upx 29upx;
	margin-bottom: 18upx;
}
.name-img {
	display: flex;
	justify-content: space-between;
}
.name-img .user-box image {
	height: 100upx;
	width: 100upx;
}
.name-img .user-box {
	display: flex;
}
.name-img .user-box .text-info {
	margin-left: 13upx;
	display: flex;
	height: 100upx;
	flex-direction: column;
	padding-top: 15upx;
}
.text-info text:nth-child(1) {
	font-size: 26upx;
	color: #333333;
}
.text-info text:nth-child(2) {
	font-size: 15upx;
	color: #666666;
}
.name-img .follow {
	margin-top: 25upx;
}
.name-img .follow text {
	padding: 12upx 23upx;
	border: 1upx solid #f74c44;
	border-radius: 10upx;
	color: #f74c44;
}
.name-img .no-follow {
	margin-top: 25upx;
}
.name-img .no-follow text {
	padding: 12upx 23upx;
	border: 1upx solid #cccccc;
	border-radius: 10upx;
	color: #666666;
}
</style>
