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
		<view class="audio">
			<imt-audio continue :src="audio[now].src" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1"
			@next="now = now === audio.length-1?0:now+1"></imt-audio>
			
		</view>
		<view class="ti-cont">
			<view class="title">问题：</view>
			<view></view>
			<view></view>
			<view></view>
			
		</view>
	</view>
</template>

<script>
	import imtAudio from 'components/imt-audio/imt-audio'
	export default {
		data() {
			return {
				audio: [{
						src: 'http://mouyizhan.com/1.mp3',
						duration: 212
					},
					{
						src: 'http://mouyizhan.com/2.mp3',
						duration: 189
					},
					{
						src: 'http://mouyizhan.com/3.mp3',
						duration: 214
					},
					{
						src: 'http://mouyizhan.com/4.mp3',
						duration: 205
					},
					{
						src: 'http://mouyizhan.com/5.mp3',
						duration: 228
					}
				],
				now: 0
			};
		},
		onReachBottom() {
			this.hidden = false;
			console.log("aaa")
			setTimeout(() => {
				this.hidden = true;
			},3000)
		},
		components: {
			imtAudio
		}
	}
</script>

<style>
	page{
		height: 100%;
		width: 100%;
		background: #FFFFFF;
	}
.user-info {
	background: #ffffff;
	padding: 22upx 27upx 22upx 29upx;
	margin-bottom: 18upx;
}
.name-img {
	background: #F74C44;
	padding: 12upx 53upx;
	display: flex;
	justify-content: space-between;
	color: #FFFFFF;
}
.name-img .user-box image {
	border: 1px solid rgba(242, 242, 242, 1);
	border-radius: 50%;
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
}
.text-info text:nth-child(2) {
	font-size: 15upx;
}
.name-img .follow {
	margin-top: 25upx;
	
}
.name-img .follow text {
	padding: 12upx 23upx;
	border:2upx solid #FFFFFF;
	border-radius: 10upx;
}
.name-img .no-follow {
	margin-top: 25upx;
}
.name-img .no-follow text {
	padding: 12upx 23upx;
	border: 1upx solid #FFFFFF;
	border-radius: 10upx;
}
.audio{
	background: #F74C44;
}
.ti-cont{
	height: 100%;
	background: #FFFFFF;
}
</style>
