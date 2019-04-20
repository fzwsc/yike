<template>
	<view class="login-main">
		<!-- 登录界面 -->
		<view class="logo"><image src="../../static/logo.png" mode=""></image></view>
		<view class="login-box">
			<view class="chose-schoole" @click="chooseSchool">
				<text class="text-schoole">学校：</text>
				<view class="schoole-name"><text>{{selectSchool.name}}</text><image src="../../static/shangla.png" mode=""></image></view>
			</view>
			<view class="gong-hao">
				<view>工号</view>
				<input type="number" v-model="usn"  placeholder="请输入工号" />
			</view>
			<view class="gong-hao">
				<view>密码</view>
				<view class="password">
					<input type="text" v-model="psw" placeholder="请输入密码" />
					<!-- <text class="rz-mm" @click="rzMm">重置密码</text> -->
				</view>
			</view>
			<button class="bt-login" open-type="getUserInfo" @getuserinfo="userinfo">
				登 录
			</button>
            <mp-vue-picker :pickerValueArray="schoolList" :pickerValueDefault="defaultIndex" :showPicker="showPicker" @onConfirm="onConfirm" @onCancel='onCancel'/>
		</view>
	</view>
</template>

<script>
	import mpVuePicker from '../../components/mpvue-picker/mpvuePicker.vue'
export default {
	data() {
		return {
			code: '',
			usn: '',
			psw: '',
			schoolList: [],
			hidden: true,
			defaultIndex: [0],
			showPicker: false,
			selectSchool: {
				id: 0,
				name: '请选择'
			}
		};
	},
	onLoad() {
		uni.login({
		  provider: 'weixin',
		  success: res => {
			this.code = res.code
		  }
		});
		this.getSchoolList()
	},
	methods:{
		rzMm(){
			uni.navigateTo({
				url:'../resetmm/resetmm'
			})
		},
		chooseSchool() {
			this.showPicker = !this.showPicker
		},
		getSchoolList() {
			let data = {}
			this.api.schoolList(data).then(res => {
				this.schoolList = res.datas
			})
		},
		userinfo(e) {
// 			if (this.usn && this.psw) {
// 				let data = {};
//              data['schoolId'] = this.selectSchool.id
// 				data['account'] = this.usn
// 				data['password'] = this.psw
// 				data['code'] = this.code;
// 				data["rawData"] = e.detail.rawData;
// 				data["signature"] = e.detail.signature;
// 				data["encryptedData"] = e.detail.encryptedData;
// 				data["iv"] = e.detail.iv;
// 				this.api.Login(data).then(res => {
// 					uni.setStorageSync("token",res.datas.token)
// 					uni.setStorageSync("userId",res.datas.user_id)
//                  uni.setStorageSync("role",res.datas.role_type)
// 					uni.switchTab({
// 						url: '../broadcast/broadcast',
// 					});
// 					
// 				})
// 			}else {
// 				uni.showToast({
// 					title: '工号或密码不能为空',
// 					icon: 'none'
// 				})
// 			}
				uni.setStorageSync("token",'5c5f605a-4d90-4bd8-87f3-e5dabeb773ae')
				uni.setStorageSync("role",1)
				uni.setStorageSync("userId",'7')
			uni.switchTab({
				url: '../broadcast/broadcast',
			});
		},
		onConfirm(e) {
			console.log(e);
			this.selectSchool = e;
			this.showPicker = !this.showPicker
		},
		onCancel() {
           this.showPicker = !this.showPicker
		}
	},
	components: {
		mpVuePicker
	},
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
