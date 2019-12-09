<template>
	<view class="login-main">
		<!-- 登录界面 -->
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<view class="login-box">
			<view class="chose-schoole" @click="chooseSchool">
				<text class="text-schoole">学校：</text>
				<view class="schoole-name">
					<text>{{ selectSchool.name }}</text>
					<image src="../../static/shangla.png" mode=""></image>
				</view>
			</view>
			<view class="gong-hao">
				<view>账号</view>
				<input type="text" v-model="usn" placeholder="请输入账号" />
			</view>
			<view class="gong-hao">
				<view>密码</view>
				<view class="password">
					<input type="text" v-model="psw" placeholder="请输入密码" />
					<text class="rz-mm" @click="resetPassword">重置密码</text>
				</view>
			</view>
			<!-- <button class="bt-login" open-type="getUserInfo" @getuserinfo="userinfo">登 录</button> -->
			<button class="bt-login" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">登 录</button>
			<mp-vue-picker :pickerValueArray="schoolList" :pickerValueDefault="defaultIndex" :showPicker="showPicker" @onConfirm="onConfirm"
			 @onCancel="onCancel" />
		</view>
		<uni-popup ref="popup" type="bottom" :mask-click="true" :custom="true">
			<view class="buy-ed">
				<navigator :url="'../changepwd/changepwd?usn='+usn"><view class="line-chose" >修改密码</view></navigator>
				<navigator url='../resetmm/resetmm'><view class="line-chose" >忘记密码</view></navigator>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mpVuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				code: '',
				// usn: 'L004',
				// psw: '123456',
				usn: 'S0011',
				psw: '123456',
				// usn: '',
				// psw: '',
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
		onShow() {
			this.$refs.popup.close();
		},
		onLoad() {
			this.getSchoolList();
			this.getUserMet()
		},
		methods: {
			// 忘记密码
			resetPassword() {
				this.$refs.popup.open();
				// uni.navigateTo({
				// 	url: '../resetmm/resetmm'
				// });
			},
			chooseSchool() {
				if (this.schoolList.length == 0 || this.schoolList.length == 1) return;
				this.showPicker = !this.showPicker;
			},
			getSchoolList() {
				let data = {};
				this.api.schoolList(data).then(res => {
					if (res.datas.length == 0) {
						uni.showToast({
							title: '请到后台添加学校',
							icon: 'none'
						});
						return;
					}
					this.schoolList = res.datas;
					if (res.datas.length > 1) return;
					this.selectSchool.id = this.schoolList[0].id;
					this.selectSchool.name = this.schoolList[0].name;
				});
			},
			
			// 授权微信
			getUserMet() {
				uni.getSetting({
					success(res) {
						// 授权了
						if (res.authSetting['scope.userInfo']) {
							console.log("有授权...........");
							uni.getStorage({
								key: 'token',
								success: (res) => {
									if (res.data == "") {
										return
									}
									uni.switchTab({
										url: '../broadcast/broadcast'
									});
								},
								fail() {

								}
							})

						} else {
							console.log("没有授权...........")
						}
					}
				})
			},
			// 微信授权
			bindGetUserInfo(e) {
				var that = this;
				console.log(that.usn+"-"+that.psw)
				if (e.detail.userInfo) {
					//用户按了允许授权按钮
					// 获取到用户的信息了，打印到控制台上看下
					console.log("用户的信息如下：");
					console.log(e.detail.userInfo);
					uni.login({
						provider: 'weixin',
						success: res => {
							that.code = res.code;
							if (that.selectSchool.id) {
								console.log(that.usn )
								if (that.usn && that.psw) {
									let data = {};
									data['schoolId'] = that.selectSchool.id;
									data['account'] = that.usn;
									data['password'] = that.psw;
									data['code'] = that.code;
									data['rawData'] = e.detail.rawData;
									data['signature'] = e.detail.signature;
									data['encryptedData'] = e.detail.encryptedData;
									data['iv'] = e.detail.iv;
									that.api.Login(data).then(res => {
										if (res.code == 200) {
											uni.setStorageSync('token', res.datas.token);
											uni.setStorageSync('userId', res.datas.user_id);
											uni.setStorageSync('role', res.datas.role_type);
					
											uni.setStorageSync('schoolId', this.selectSchool.id);
											// uni.setStorageSync('usn', this.usn);
											// uni.setStorageSync('psw', this.psw);
					
											uni.switchTab({
												url: '../broadcast/broadcast'
											});
										}
					
									});
								} else {
									uni.showToast({
										title: '账号或密码不能为空',
										icon: 'none'
									});
								}
							} else {
								uni.showToast({
									title: '学校必须选择',
									icon: 'none'
								});
							}
						}
					});

				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							// 用户没有授权成功，不需要改变 isHide 的值
							if (res.confirm) {
								console.log('用户点击了“返回授权”');
							}
						}
					});
				}
			},
			userinfo(e) {
				uni.login({
					provider: 'weixin',
					success: res => {
						this.code = res.code;
						if (this.selectSchool.id) {
							if (this.usn && this.psw) {
								let data = {};
								data['schoolId'] = this.selectSchool.id;
								data['account'] = this.usn;
								data['password'] = this.psw;
								data['code'] = this.code;
								data['rawData'] = e.detail.rawData;
								data['signature'] = e.detail.signature;
								data['encryptedData'] = e.detail.encryptedData;
								data['iv'] = e.detail.iv;
								this.api.Login(data).then(res => {
									if (res.code == 200) {
										uni.setStorageSync('token', res.datas.token);
										// uni.setStorageSync('userId', res.datas.user_id);
										// uni.setStorageSync('role', res.datas.role_type);

										// uni.setStorageSync('schoolId', this.selectSchool.id);
										// uni.setStorageSync('usn', this.usn);
										// uni.setStorageSync('psw', this.psw);

										uni.switchTab({
											url: '../broadcast/broadcast'
										});
									}

								});
							} else {
								uni.showToast({
									title: '账号或密码不能为空',
									icon: 'none'
								});
							}
						} else {
							uni.showToast({
								title: '学校必须选择',
								icon: 'none'
							});
						}
					}
				});
				// if (uni.getStorageSync('usn')) {
				// 	this.againLogin();
				// }
				// 

				// 老师
				// 			uni.setStorageSync("token",'7ff0068c-3ce8-4cc1-a4b8-1a2de8a3b992')
				// 			uni.setStorageSync("role",2)
				// 			uni.setStorageSync("userId",'8')
				// 			uni.switchTab({
				// 				url: '../broadcast/broadcast'
				// 			});
				// 学生
				// 		   uni.setStorageSync("token",'96392646-09f2-41b2-ba5b-419e3c60b220')
				// 		   uni.setStorageSync("role",1)
				// 		   uni.setStorageSync("userId",'29')
				// 		   			uni.switchTab({
				// 		   		    url: '../broadcast/broadcast'
				//                     })
			},
			onConfirm(e) {
				// console.log(e);
				this.selectSchool = e;
				this.showPicker = !this.showPicker;
			},
			onCancel() {
				this.showPicker = !this.showPicker;
			}
		},
		components: {
			mpVuePicker,
			uniPopup
		}
	};
</script>

<style>
	.buy-ed {
		background: #FFFFFF;
		text-align: center;

	}

	.buy-ed .line-chose {
		padding: 39upx 0;
		border-bottom: 1upx solid rgba(229, 229, 229, 1);
	}

	page {
		background: #ffffff;
	}

	.chose-schoole {
		padding: 30upx 32upx 15upx 32upx;
		display: flex;
	}

	.schoole-name {
		padding: 5px 15upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1upx #eeeeee solid;
		border-radius: 4upx;
		flex: 1;
	}

	.text-schoole {
		padding: 5px 0;
	}

	.schoole-name image {
		width: 30upx;
		height: 17upx;
	}

	.gong-hao {
		border-bottom: 1upx solid #eeeeee;
		padding: 30upx 32upx 15upx 32upx;
	}

	.login-mainP view,
	text,
	input {
		font-size: 30upx;
	}

	.gong-hao .password {
		display: flex;
		justify-content: space-between;
	}

	.gong-hao .password .rz-mm {
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

	.bt-login {
		width: 630upx;
		margin: 65upx auto;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50upx;
		color: #ffffff;
		background: #f74c44;
		box-shadow: 10px 1px 5upx #f74c44;
		font-size: 32upx;
	}
</style>
