<template>
	<view>
		<view class="tab-box">
			<view class="active chose-tab">关注</view>
			<view class="chose-tab">推荐</view>
			<view class="chose-tab">热门</view>
			<view class="chose-tab">最新</view>
			<view class="img-add">
				<image src="" mode=""></image>
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
	.tab-box{
		display: flex;
		text-align: center;
		width: 100%;
	}
	.chose-tab{
		flex: 2;
	}

</style>
