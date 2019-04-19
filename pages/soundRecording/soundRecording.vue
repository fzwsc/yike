<template>
	<view>
		<web-view :src="url" ></web-view>
		<!-- <view hidden="true">	<web-view  :webview-styles="webviewStyles" :src="url" :message="postMessage"></web-view></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: '',
			ss: ''
		};
	},
	// 获取web-url
	onLoad(options) {
		if (options && options.url) {
			this.url = decodeURIComponent(options.url);
		}
	},
	methods: {
	}
};
</script>

<style></style>
