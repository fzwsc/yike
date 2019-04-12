<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			var flag = uni.getStorageSync("flag")
			if (flag) {
				uni.switchTab({
					url: '../broadcast/broadcast'
				})
			   uni.setStorageSync("flag",false)
			}else {
				uni.navigateTo({
					url:'../playaudio/playaudio'
				})
			}
		}
	}
</script>

<style>

</style>
