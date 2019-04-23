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
			// var flag = uni.getStorageSync("flag")
			// if (flag) {
			// 	uni.switchTab({
			// 		url: '../broadcast/broadcast'
			// 	})
			//    uni.setStorageSync("flag",false)
			// }else {
			// 	uni.navigateTo({
			// 		url:'../playaudio/playaudio',
			// 		    animationType: 'pop-out',
   //                      animationDuration: 0
			// 		 
			// 	})
			// }
			 uni.getStorage({
			 	key: 'flag',
				success(res) {
					let flag = res.data
					if (flag) {
						uni.setStorage({
							key: 'flag',
							data: '',
							success() {
									uni.switchTab({
										url: '../broadcast/broadcast'
									})
							}
						})
					} else{
				    	uni.navigateTo({
							url:'../playaudio/playaudio',
								animationType: 'pop-out',
							 animationDuration: 0
							 
						})
										
					}
				}
			 })
		}
	}
</script>

<style>
/* 	Page {
	   background: transparent; 
	} */
</style>
