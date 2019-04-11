<template>
	<view class="content">
		<!-- <view v-for="(item,index) in 50" :key="index">
            <text class="title">{{title}}</text>
        </view> -->
		<view class="" :hidden="hidden">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<imt-audio continue :src="audio[now].src" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1"
		@next="now = now === audio.length-1?0:now+1"></imt-audio>
			<navigator url="../broadcast/broadcast" open-type="switchTab" hover-class="none">
			       <button type="default">跳转到新页面</button>
			</navigator>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import imtAudio from 'components/imt-audio/imt-audio'
	export default {
		data() {
			return {
				title: 'Hello',
				hidden: true,
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
			}
		},
		onLoad() {

		},
		methods: {

		},
		onReachBottom() {
			this.hidden = false;
			console.log("aaa")
			setTimeout(() => {
				this.hidden = true;
			},3000)
		},
		components: {
			uniLoadMore,
			imtAudio
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
