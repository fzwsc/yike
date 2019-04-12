<template>
	<view>
		<web-view  class="web-page" src="https://sale.vmall.com/honor.html?cid=99151"></web-view>
		<view class="save" @click="save()">
			 hahahh 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},methods:{
			save(){
				
			}
		}
	}
</script>

<style>
	.web-page{
		height: 100upx;
		overflow: hidden;
	}
   .save{
	   position: fixed;
	   top: 0px;
	   z-index: 999;
   }
</style>
