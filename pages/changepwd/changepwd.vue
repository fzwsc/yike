<template>
	<view class="change-body">
		<view class="chose-schoole" @click="chooseSchool">
			<text class="text-schoole">学校：</text>
			<view class="schoole-name"><text>{{selectSchool.name}}</text><image src="../../static/shangla.png" mode=""></image></view>
		</view>
		<view class="gong-hao">
			<view class="password">
				<text class="rz-mm" @click="resetPassword">工号</text>
				<input type="text" maxlength="20" v-model="user" placeholder="请输入工号" />
			</view>
		</view>
		<view class="gong-hao">
			<view class="password">
				<text class="rz-mm" @click="resetPassword">旧密码</text>
				<input type="text" v-model="oldPwd" ref="oldPwd" placeholder="请输入旧密码" />
			</view>
		</view>
		<view class="gong-hao">
			<view class="password">
				<text class="rz-mm" @click="resetPassword">新密码</text>
				<input type="text" v-model="newPwd" placeholder="请输入新密码" />
			</view>
		</view>
		<view class="gong-hao">
			<view class="password">
				<text class="rz-mm" @click="resetPassword">确认密码</text>
				<input type="text" v-model="againnewPwd" placeholder="请输入确认密码" />
			</view>
		</view>
		<view class="tip">
			提示：必须是6-20个英文字母、数字或符号（除空格），且字母、数字和标点符号至少包含两种
		</view>
		
		<button class="bt-login" @click="changePwd">确认修改</button>
		 <mp-vue-picker :pickerValueArray="schoolList" :pickerValueDefault="defaultIndex" :showPicker="showPicker" @onConfirm="onConfirm" @onCancel='onCancel'/>
	</view>
</template>

<script>
	import mpVuePicker from '../../components/mpvue-picker/mpvuePicker.vue'
	export default {
		components:{
			mpVuePicker
		},
		data() {
			return {
				user:'',
				oldPwd:"",
				newPwd:'',
				againnewPwd:'',
				
				schoolList: [],
				defaultIndex: [0],
				showPicker: false,
				selectSchool: {
					id: 0,
					name: '请选择'
				}
				
			}
		},
		onLoad(options) {
			
			this.user = (!options.usn)?options.usn:''
			this.getSchoolList()
		},
		methods: {
			// 选择学校
			onConfirm(e) {
				// console.log(e);
				this.selectSchool = e;
				this.showPicker = !this.showPicker
			},
			onCancel() {
			   this.showPicker = !this.showPicker
			},
			chooseSchool() {
				if (this.schoolList.length == 0 || this.schoolList.length == 1) return
				this.showPicker = !this.showPicker
			},
			getSchoolList() {
				let data = {}
				this.api.schoolList(data).then(res => {
					if (res.datas.length == 0) {
						uni.showToast({
							title: '请到后台添加学校',
							icon: 'none'
						});
						return
					}
					this.schoolList = res.datas
					if (res.datas.length > 1)  return;
					this.selectSchool.id = this.schoolList[0].id
					this.selectSchool.name = this.schoolList[0].name
				})
			},
			// 确认修改
			changePwd() {
				if(!this.selectSchool.id) {
					uni.showToast({
						icon: 'none',
						title: '学校不能为空!'
					});
					return;
				} 
				else if(this.user == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入你的工号!'
					});
					return;
				}
				 else if (this.oldPwd == '') {
					uni.showToast({
						icon: 'none',
						title: '旧密码不能为空!'
					});
					return;
				} else if (this.newPwd == '') {
					uni.showToast({
						icon: 'none',
						title: '输入新密码不能为空!'
					});
					return;
				} else if (this.againnewPwd == "" ) {
					uni.showToast({
						icon: 'none',
						title: '确认密码不能为空!'
					});
					return;
				} else if (!(this.againnewPwd === this.newPwd)  ) {
					uni.showToast({
						icon: 'none',
						title: '两次输入密码不同!'
					});
					return;
				} 
				else {
					// 提交修改密码\
					let parm = {}
					parm["account"] = this.user
					parm["password_old"] = this.oldPwd
					parm["password"] = this.newPwd
					parm["password_verify"] = this.againnewPwd
					parm["schoolId"] = this.selectSchool.id
					console.log(parm)
					
					// return
					this.yapi.changePwdMet(parm).then(res => {
						if(res.code==200){
								uni.showToast({
								icon: 'none',
								title: '修改密码成功'
							});
							setTimeout(function(){
								 uni.navigateTo({
									url:'../login/login'
								}) 
							},1000)
							
							
						}
							console.log(res);
						})
						.catch(err => {});
				}
			},
			keyUpNull(e){
				
				console.log(e.detail.value)
				let _this = this
				_this.oldPwd = e.detail.value.replace(/\s+/g, '')
				switch (e){
					case 1:
					if(_this.checkTextSpace(_this.oldPwd)){
						_this.oldPwd = null
					}
						break;
					case 2:
					this.checkTextSpace(this.newPwd)
						break;
					case 3:
					this.checkTextSpace(this.againnewPwd)
						break;
					default:
						break;
				}
			},
			checkTextSpace(value){
			    let reg = /^\S+$/;
					console.log(value==" ")
			     if(value==" ") {
			        console.log("返回-->空")
			        return true;
			    }
			    return false;
			 }
			
			
		},
		watch:{
			oldPwd:function (newData,oldData) {
				 const reg= /\s+/g;
				if(reg.test(newData)||reg.test(oldData)){
					this.oldPwd = null; 
					return;
				}
			},
			newPwd:function () {
				const reg= /\s/;
				if(reg.test(this.newPwd)){
						this.newPwd = null; 
					return;
				}
			},
			againnewPwd:function () {
				const reg= /\s/;
				if(reg.test(this.againnewPwd)){
					this.againnewPwd = null; 
					return;
				}
			},
		}
	}
</script>

<style scoped>
	page{
		
	}
	.change-body{
		background: #FFFFFF;
		padding: 30rpx 55rpx;
	}
	.gong-hao {
		border-bottom: 1upx solid #eeeeee;
		padding: 30upx 32upx 15upx 32upx;
		display: flex;
	}
	.chose-schoole{
		padding: 30upx 32upx 15upx 30upx;
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
	.login-mainP view,
	text,
	input {
		font-size: 30upx;
	}
	.rz-mm{
		width:150rpx;
		display: block;
	}
	input{
		flex: 1;
		
	}
	
	.gong-hao .password {
		display: flex;
		justify-content: space-between;
	}
	
	.gong-hao .password .rz-mm {
		text-decoration: underline;
		color: #999999;
	}
	.tip{
		padding: 20rpx 0;
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
