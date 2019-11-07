<template>
	<view>
		<view class="chose-schoole" @click="chooseSchool">
			<text class="text-schoole">学校：</text>
			<view class="schoole-name"><text>{{selectSchool.name}}</text><image src="../../static/shangla.png" mode=""></image></view>
		</view>
		<view style="display: flex;margin: 25upx 0;align-items: center;">
			账号：
			<input type="text" value="" v-model="name" placeholder="请输入你的账号" />
		</view>
		<view class="new-pasd line">
			<image src="../../static/mima.png" mode=""></image>
			<input type="password" v-model="fistPwd" value="" placeholder="请输入新的密码" />
		</view>
		<view class="again-new-pasd line">
			<image src="../../static/mima.png" mode=""></image>
			<input type="password" v-model="towPwd" value="" placeholder="请再次输入新的密码" />
		</view>
		 <mp-vue-picker :pickerValueArray="schoolList" :pickerValueDefault="defaultIndex" :showPicker="showPicker" @onConfirm="onConfirm" @onCancel='onCancel'/>
		<view class="up-img">
			<view>
				上传凭证：
				<view class="" style="display: flex;">
					<avatar
						selWidth="200px"
						selHeight="400upx"
						@upload="myUpload"
						:avatarSrc="url"
						avatarStyle="width: 200upx; height: 200upx; border-radius: 0%;margin:10upx 0"
					></avatar>
					<text style="margin-top: 180upx;margin-left: 22upx;">{{ numb }}/1</text>
				</view>
			</view>
			<view class="">上传手持的照片</view>
		</view>
		<view class="bt-login" @click="loginM">修改密码并解除微信绑定</view>
		
	</view>
</template>

<script>
import avatar from '../../components/yq-avatar/yq-avatar.vue';
import mpVuePicker from '../../components/mpvue-picker/mpvuePicker.vue'
export default {
	data() {
		return {
			url: require('../../static/up-img.png'),
			name: '',
			fistPwd: '',
			towPwd: '',
			numb: 0,
			zhuUrl:'',
			school:'',
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
		this.getSchoolList()
	},
	methods: {
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
		myUpload(rsp) {
	         let _this = this
			_this.numb = 1;
			_this.url = rsp.path; //更新头像方式一
			//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			wx.uploadFile({
				url: _this.yapi.uploadImg,
				filePath: rsp.path,
				name: 'image',
				formData: {
					image: 'image'
				},
				header: {
					'Content-Type': 'multipart/form-data'
				},
				success: function(res) {
					
					if(JSON.parse(res.data).code==200){
						console.log(JSON.parse(res.data).code);
						console.log(JSON.parse(res.data).datas);
					
						_this.zhuUrl = JSON.parse(res.data).datas
					}
				}
			});
		},
		loginM() {
			if (this.name == '') {
				uni.showToast({
					icon: 'none',
					title: '请输入你的工号!'
				});
				return;
			} else if (this.fistPwd == '') {
				uni.showToast({
					icon: 'none',
					title: '密码不能为空!'
				});
				return;
			} else if (this.towPwd == '') {
				uni.showToast({
					icon: 'none',
					title: '再次输入密码不能为空!'
				});
				return;
			} else if (!(this.fistPwd === this.towPwd)) {
				uni.showToast({
					icon: 'none',
					title: '两次输入密码不同!'
				});
				return;
			} else if (this.zhuUrl == "") {
				uni.showToast({
					icon: 'none',
					title: '图片上传不能为空!'
				});
				return;
			} 
			else if(!this.selectSchool.id) {
				uni.showToast({
					icon: 'none',
					title: '学校不能为空!'
				});
				return;
			} 
			else {
				// 先解绑成功后再提交修改密码\
				let parm = {}
				parm["password"] = this.fistPwd
				parm["password_verify"] = this.towPwd
				parm["card_img"] = this.zhuUrl
				parm["account"] = this.name
				parm["schoolId"] = this.selectSchool.id
				this.yapi.changePwd(parm).then(res => {
					if(res.code==200){
							uni.showToast({
							icon: 'none',
							title: '已提交，工作人员会在三个工作日之内处理，请耐心等待!'
						});
						setTimeout(function(){
							 uni.navigateTo({
								url:'../login/login'
							}) 
						},2000)
						
						
					}
						console.log(res);
					})
					.catch(err => {});
			}
		}
	},
	components: {
		avatar,mpVuePicker
	}
};
</script>

<style>
page {
	background: #ffffff;
	padding: 20px 55upx;
	box-sizing: border-box;
}
	.chose-schoole{
		padding: 30upx 32upx 15upx 0upx;
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
.line {
	display: flex;
	width: 100%;
	padding: 20px 0upx;
	border-bottom: 1upx solid #eeeeee;
}
.line image {
	width: 40upx;
	height: 40upx;
	margin-right: 39upx;
}
.up-img {
	margin: 66upx 0;
}
.bt-login {
	flex: 1;
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
