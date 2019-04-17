<template>
	<view class="login-main">
		<!-- 登录界面 -->
		<view class="logo"><image src="../../static/logo.png" mode=""></image></view>
		<view class="login-box">
			<view class="chose-schoole">
				<text class="text-schoole">学校：</text>
				<view class="schoole-name"><text>福州大学</text><image src="../../static/shangla.png" mode=""></image></view>
			</view>
			<view class="gong-hao">
				<view>工号</view>
				<input type="text" value="" placeholder="请输入工号" />
			</view>
			<view class="gong-hao">
				<view>密码</view>
				<view class="password">
					<input type="text" value="" placeholder="请输入密码" />
					<text class="rz-mm" @click="rzMm">重置密码</text>
				</view>
			</view>
			<view class="bt-login" @click="loginM">
				登 录
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods:{
		rzMm(){
			uni.navigateTo({
				url:'../resetmm/resetmm'
			})
		},
		loginM(){
			uni.navigateTo({
				url:'../bindWeixin/bindWeixin'
			})
			
		}
	}
};
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.chose-schoole{
		padding: 30upx 32upx 15upx 32upx;
		display: flex;
	}
	.schoole-name{
		padding: 5px 15upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1upx #EEEEEE solid;
		border-radius: 4upx;
		flex: 1;
	}
	.text-schoole{
		padding: 5px 0;
	}
	.schoole-name image{
		width: 30upx;
		height: 17upx;
	}
	.gong-hao{
		border-bottom: 1upx solid #EEEEEE;
		padding: 30upx 32upx 15upx 32upx;
	}
	.login-mainP view,text,input{
		font-size: 30upx;
	}
	.gong-hao .password{
		display: flex;
		justify-content: space-between;
	}
	.gong-hao .password .rz-mm{
		text-decoration: underline;
		color: #999999;
		
	}
.logo {
	background: #f74c44;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 500upx;
}
.logo image {
	width: 208upx;
	height: 187upx;
}
.bt-login{
	width: 630upx;
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
