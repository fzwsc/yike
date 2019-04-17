<template>
	<view>
		<!-- <web-view :src="url" @message="getMessage"></web-view> -->
		<view hidden="true">	<web-view  :webview-styles="webviewStyles" :src="url" @message="getMessage"></web-view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = decodeURIComponent(options.url);
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
