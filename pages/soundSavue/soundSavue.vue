<template>
	<view>
		<!-- <custom-header :title="title" :backBtnClass="backBtnClass" @click="backClick" :showBack="showBack" :containerStyle="containerStyle" :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header> -->

		<!-- <view hidden="true">	<web-view  :webview-styles="webviewStyles" :src="url" @message="getMessage"></web-view></view> -->
		<view class="mian-box">
			<view class="title-line title-line-input">
				<text class="title">标题：</text>
				<input type="text" value="" v-model="contJson.title" placeholder="请输入标题" />
			</view>
			<view class="title-line" @click="showSinglePicker()">
				<text class="title">专题：</text>
				<view>{{ pickerText }}</view>
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
				<view>{{ pickerText2 }}</view>
			</view>

			<button class="preview" @click="proview()">预览</button>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray"
			></mpvue-picker>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker2"
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
			webviewStyles: {
				top: '44px'
			},
			showWeb: true,
			tipBox: 'true',
			title: '主页导航文字',
			showBack: true,
			backBtnClass: 'uni-icon  color-text  uni-icon-back',
			containerStyle: 'background:#F74C44',
			titleStyle: 'font-size:15px;color:#ffffff',
			url: '',
			getMessage: '',
			Answer: [{ label: '答案A',value:0 }, { label: '答案B',value:1 }, { label: '答案C',value:2 }, { label: '答案D',value:3 }],
			optionList: [],
			themeColor: '#007AFF',
			pickerText: '',
			pickerText2: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			pickerValueArray2: [],
			contJson: {}
		};
	},
	onLoad(options) {
		console.log('赋值web页面穿过来的音频文件名' + options.id); //获取参数
		// console.log(decodeURIComponent(options.url));
		uni.getStorageSync('userId')
		var url ='http://wsc-test.oss-cn-shenzhen.aliyuncs.com//ygb/user/null/20190420125738eyxl.mp3'//`http://wsc-test.oss-cn-shenzhen.aliyuncs.com//ygb/user/${uni.getStorageSync('userId')}/${options.id}.mp3`
		console.log(url)
		this.contJson.radio = options.id; //赋值web页面穿过来的音频文件名
		this.contJson.mp3Url = url; //赋值web页面穿过来的音频文件名
		let Data = {};
		Data.token = uni.getStorageSync('token');
		this.yapi
			.getAddYunCont(Data)
			.then(res => {
				this.optionList = res.datas.topic_list;
				this.contJson.userInfo = res.datas.user_info;
				for (var i = 0; i < this.optionList.length; i++) {
					this.optionList[i]['label'] = this.optionList[i].title;
					this.optionList[i]['value'] = this.optionList[i].id;
				}
				// this.pickerText = this.optionList[0].label
				console.log(this.optionList);
				console.log(this.pickerSingleArray);
			})
			.catch(err => {});
		// 		if (options && options.url) {
		// 			this.url = decodeURIComponent(options.url);
		// 		}
	},
	methods: {
		backClick() {
			this.tipBox = false;
		},
		// 预览
		proview() {
			if (this.contJson.title == undefined) {
				uni.showToast({
					icon:'none',
					title: '云广播标题不能为空'
				});
			} 
			else if(this.contJson.descript == undefined){
				uni.showToast({
					icon:'none',
					title: '题目不能为空'
				});
			}
			else if(this.contJson.option1 == undefined){
				uni.showToast({
					icon:'none',
					title: '选项A不能为空'
				});
			}
			else if(this.contJson.option2 == undefined){
					uni.showToast({
					icon:'none',
					title: '选项B不能为空'
				});
			}
			else if(this.contJson.right_option == undefined){
					uni.showToast({
					icon:'none',
					title: '正确选项不能为空'
				});
			}
			else{
				uni.setStorageSync('onjcont',this.contJson)
				uni.navigateTo({
						url: '../proview/proview',
					});
					
			}
		},
		showSinglePicker() {
			this.pickerValueArray = this.optionList; //this.pickerSingleArray;
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		showSinglePicker2() {
			this.pickerValueArray2 = this.Answer; //this.Answer;
			this.deepLength = 1;
			this.pickerValueDefault2 = [0];
			this.$refs.mpvuePicker2.show();
		},
		onConfirm(e) {
			this.pickerText = e.label; //JSON.stringify(e)['label'];
			this.contJson.radio = e.value;
		},
		onConfirm2(e) {
			this.pickerText2 = e.label; //JSON.stringify(e)['label'];
			this.contJson.right_option = e.value;
		},
		onCancel(e) {
			console.log(e);
		},
		// 		onBackPress() {
		// 			if (this.$refs.mpvuePicker.showPicker) {
		// 				this.$refs.mpvuePicker.pickerCancel();
		// 				return true;
		// 			}
		// 		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
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
