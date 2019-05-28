<template>
	<view>
		<custom-header :title="title" :backBtnClass="backBtnClass" @click="backClick" :showBack="showBack" :containerStyle="containerStyle" :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header>

		<!-- <view hidden="true">	<web-view  :webview-styles="webviewStyles" :src="url" @message="getMessage"></web-view></view> -->
		<view class="mian-box">
			<view class="title-line title-line-input">
				<text class="title">标题：</text>
				<input type="text" value="" v-model="contJson.title" placeholder="请输入标题" />
			</view>
			<view class="title-line" @click="showSinglePicker()">
				<text class="title">专题：</text>
				<view class="down-class">{{ pickerText }}</view>
				<image src="../../static/dow.png" mode="" class="down-class-img"></image>
			</view>
			<view class="title-line">
				<text class="title">问题：</text>
				<textarea value="" v-model="contJson.descript" placeholder="输入问题" />
			</view>
			<view class="title-line title-line-input">
				<text class="title">答案A：</text>
				<input type="text" value="" v-model="contJson.option1" placeholder="请输入题目" />
			</view>
			<view class="title-line title-line-input">
				<text class="title">答案B：</text>
				<input type="text" value="" v-model="contJson.option2" placeholder="请输入题目" />
			</view>
			<view class="title-line title-line-input">
				<text class="title">答案C：</text>
				<input type="text" value="" v-model="contJson.option3" placeholder="请输入题目" />
			</view>
			<view class="title-line title-line-input">
				<text class="title">答案D：</text>
				<input type="text" value="" v-model="contJson.option4" placeholder="请输入题目" />
			</view>
			<view class="title-line title-line-input" @click="showSinglePicker2()">
				<text class="title">正确答案：</text>
				<view class="down-class">{{ pickerText2 }}</view>
				<image src="../../static/dow.png" mode="" class="down-class-img"></image>
			</view>
			<button class="preview" @click="proview()">预览</button>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:showPicker="showPicker"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray"
			></mpvue-picker>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker2"
				:showPicker="showPicker2"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm2"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray2"
			></mpvue-picker>
		</view>
		<!-- 	<view :class="[{'box-cont-tip-show':tipBox},'box-cont-tip']">
			<view class="tip-box">
				<view>录音未上传，确定放弃吗？</view>
				<view class="bt-class"><text>重新录制</text></view>
				<view class="bt-class"><text>确认放弃</text></view>
				<view class="bt-class"><text class="cancel">取  消</text></view>
			</view>
		</view> -->
	</view>
</template>

<script>
import mpvuePicker from '"../../components/mpvue-picker/mpvuePicker.vue';
import customHeader from '../../components/custom-header/custom-header.vue';
export default {
	data() {
		return {
			title:'录音保存',
			webviewStyles: {
				top: '44px'
			},
			showWeb: true,
			tipBox: 'true',
			showBack: true,
			backBtnClass: 'uni-icon  color-text  uni-icon-back',
			containerStyle: 'background:#F74C44',
			titleStyle: 'font-size:15px;color:#ffffff',
			url: '',
			getMessage: '',
			Answer: [{ name: '', id: 1 }, { name: '', id: 2 }, { name: '', id: 3 }, { name: '', id: 4 }],
			optionList: [],
			themeColor: '#007AFF',
			pickerText: '请选择',
			pickerText2: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueDefault2: [0],
			pickerValueArray: [],
			pickerValueArray2: [],
			contJson: {
				option1:'',
				option2:'',
				option3:'',
				option4:''
			},
			showPicker2: false,
			showPicker: false,
			duration: ''
		};
	},
	onLoad(options) {
		console.log('赋值web页面穿过来的音频文件名' + options.id); //获取参数
		var fileName = options.id;
		
		var url = `http://ykvr.oss-cn-shanghai.aliyuncs.com//ygb/user/${uni.getStorageSync('userId')}/${options.id}`;
		//`http://wsc-test.oss-cn-shenzhen.aliyuncs.com//ygb/user/${uni.getStorageSync('userId')}/${options.id}.mp3`
		console.log(options.id);
		console.log(url);
		console.log(this.duration);
		this.contJson['radio'] = fileName; //赋值web页面穿过来的音频文件名
		this.contJson['mp3Url'] = url; //赋值web页面穿过来的音频文件名
		let Data = {};
		Data.token = uni.getStorageSync('token');
		this.yapi
			.getAddYunCont(Data)
			.then(res => {
				this.contJson.userInfo = res.datas.user_info;
				this.optionList = res.datas.topic_list;
				for (var i = 0; i < this.optionList.length; i++) {
					this.optionList[i]['name'] = this.optionList[i].title;
					this.optionList[i]['id'] = this.optionList[i].id;
				}

				console.log(this.optionList);
				// console.log(this.pickerSingleArray);
			})
			.catch(err => {});
		// 		if (options && options.url) {
		// 			this.url = decodeURIComponent(options.url);
		// 		}
	},
	methods: {
		backClick() {
				uni.showModal({
				title:'提示',
				content:"是否放弃该题目?",
				success(res) {
					if(res.confirm){
						uni.reLaunch({
							url:'../broadcast/broadcast'
						})
					         
					
					}else{
						
					}
				
				}
			})
		},
		// 预览
		proview() {
			if (this.contJson.title == undefined || this.contJson.title=='') {
				uni.showToast({
					icon: 'none',
					title: '云广播标题不能为空'
				});
			} else if (this.contJson.descript == undefined || this.contJson.descript=='') {
				uni.showToast({
					icon: 'none',
					title: '题目不能为空'
				});
			} else if (!this.contJson.option1 || this.contJson.option1=='') {
				uni.showToast({
					icon: 'none',
					title: '选项A不能为空'
				});
			} else if (!this.contJson.option2 || this.contJson.option2=='') {
				uni.showToast({
					icon: 'none',
					title: '选项B不能为空'
				});
			} else if (!this.contJson.right_option || this.contJson.right_option=='') {
				uni.showToast({
					icon: 'none',
					title: '正确选项不能为空'
				});
			} else {
// 				uni.setStorage({
// 					key: 'objcont',
// 					data: this.contJson
// 				});
				uni.setStorage({
					key: 'objcont',
					data: this.contJson,
					success: function() {
						uni.navigateTo({
							url: '../proview/proview'
						});
						console.log('success');
					}
				});
			}
		},
		showSinglePicker() {
			this.pickerValueArray = this.optionList; //this.pickerSingleArray;
			console.log()
			if(this.pickerValueArray.length==0){
				return
				
			}
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			// this.$refs.mpvuePicker.show();
			this.showPicker = !this.showPicker;
		},
		showSinglePicker2() {
			console.log('999999999');
			//this.Answer;
			this.pickerValueArray2 = this.Answer;
			this.deepLength = 1;
			this.pickerValueDefault2 = [0];
			// this.$refs.mpvuePicker2.show();
			this.showPicker2 = !this.showPicker2;
		},
		onConfirm(e) {
			this.pickerText = e.name; //JSON.stringify(e)['label'];
			this.contJson.topic_id = e.id;
			// this.contJson.radioName = e.name;
			this.showPicker = !this.showPicker;
		},
		onConfirm2(e) {
			this.pickerText2 = e.name; //JSON.stringify(e)['label'];
			if(!(e.name)){
				uni.showToast({
					icon: 'none',
					title: '该选项无法选择'
				});
				return
			}
			this.contJson.right_option = e.id;
			this.showPicker2 = !this.showPicker2;
		},
		onCancel(e) {
			console.log(e);
			this.showPicker2 = false;
			this.showPicker = false;
		}
		// 		onBackPress() {
		// 			if (this.$refs.mpvuePicker.showPicker) {
		// 				this.$refs.mpvuePicker.pickerCancel();
		// 				return true;
		// 			}
		// 		},
		// 		onUnload() {
		// 			if (this.$refs.mpvuePicker.showPicker) {
		// 				this.$refs.mpvuePicker.pickerCancel();
		// 			}
		// 		}
	},
	watch: {
		'contJson.option1': function (val, oldVal) {
			console.log(val)
			console.log(oldVal)
			  if(!val){
				  this.Answer[0].name ="";
			  }else{
				  this.Answer[0].name ="答案A";  
			  }
		  },
		  "contJson.option2": function (val, oldVal) {
		  	  if(!val){
		  	  	  this.Answer[1].name ="";
		  	  }else{
				    this.Answer[1].name ="答案B";
			  }
		    },
			 "contJson.option3": function (val, oldVal) {
				  if(!val){
				  	  this.Answer[2].name ="";
				  }else{
					    this.Answer[2].name ="答案C";  
				  }
			  },
			   "contJson.option4": function (val, oldVal) {
			  	  if(!val){
			  	  	  this.Answer[3].name ="";
			  	  }else{
					    this.Answer[3].name ="答案D";  
				  }
			    }
		
	},
	components: {
		mpvuePicker,
		customHeader
	}
};
</script>

<style>
	.down-class-img{
			height: 27upx;
		width: 15upx;
	}
.down-class {
   flex: 1;
	
}
.box-cont-tip-show {
	display: none;
}
.box-cont-tip {
	position: fixed;
	top: 0upx;
	left: 0upx;
	z-index: 99;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.2);
}
.color-text {
	color: #ffffff;
}
/* page{
		padding-top: 114upx;margin-top: var(--status-bar-height)
	} */
view {
	line-height: 1;
}
.mian-box {
	background: #ffffff;
	height: 100%;
	width: 100%;
}
.title-line-input {
	border-bottom: #eeeeee solid 1px;
	margin: 0 33upx;
	padding: 33upx 0;
	display: flex;
	align-items: center;
}
.title-line  input{
	flex: 1;
}
.title-line {
	border-bottom: #eeeeee solid 1px;
	margin: 0 33upx;
	padding: 33upx 0;
	display: flex;
}
.title-line .title {
	color: #999999;
	font-size: 30upx;
}
.preview {
	background: #f74c44;
	width: 630upx;
	margin: auto;
	letter-spacing: 10upx;
	text-align: center;
	box-shadow: #f74c44 5upx 1upx 20upx;
	margin-top: 97upx;
	color: #ffffff;
	border-radius: 60upx;
	margin-bottom: 60upx;
}
.title-line textarea {
	padding: 0upx;
	margin: 0px;
	line-height: normal;
	flex: 1;
}
</style>
