<template>
	<view>
		<view>
			工号：130242014055
		</view>
		<view class="new-pasd line">
				<image src="../../static/mima.png" mode=""></image> <input type="text" value="" placeholder="请输入新的密码" />
		</view>
		<view class="again-new-pasd line">
			<image src="../../static/mima.png" mode=""></image> <input type="text" value="" placeholder="请再次输入新的密码" />
		</view>
		<view class="up-img">
			<view>上传头像：</view>
		</view>
		<view class="bt-login" @click="loginM">
			登 录
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
	page{
		background: #FFFFFF;
		padding: 20px 55upx;
		box-sizing: border-box;
	}
	.line{
		display: flex;
		width: 100%;
		padding: 20px 0upx;
		border-bottom: 1upx solid #EEEEEE;
	
	}
	.line image{
		width: 40upx;
		height: 40upx;
		margin-right: 39upx;
	}
	.up-img{
		margin: 66upx 0;
	}
.bt-login{
	flex: 1;
	margin: 65upx auto;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	border-radius: 50upx;
	color: #FFFFFF;
	background: #F74C44;
	box-shadow: 10px 1px 5upx #F74C44;
	font-size: 32upx;
}
</style>
