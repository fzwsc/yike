<template>
	<view>
		<!-- <custom-header :title="title" :backBtnClass="backBtnClass" @click="backClick" :showBack="showBack" :containerStyle="containerStyle" :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header> -->
	
		<!-- <view hidden="true">	<web-view  :webview-styles="webviewStyles" :src="url" @message="getMessage"></web-view></view> -->
		<view class="mian-box"  >
			<view class="title-line">
				<text class="title">标题：</text>
				<view>这是标题</view>
			</view>
			<view class="title-line" @click="showSinglePicker()">
				<text class="title">专题：</text>
				<view>{{ pickerText }}</view>
			</view>
			<view class="title-line">
				<text class="title">问题：</text>
				<textarea value="" placeholder="输入问题" />
			</view>
			<view class="title-line">
				<text class="title">答案A：</text>
				<textarea value="" placeholder="输入问题" />
			</view>
			<view class="title-line">
				<text class="title">答案B：</text>
				
			</view>
			<view class="title-line">
				<text class="title">答案C：</text>
				<textarea value="" placeholder="输入问题" />
			</view>
			<view class="title-line">
				<text class="title">答案D：</text>
				<textarea value="" placeholder="输入问题" />
			</view>
			<view class="sure-an title-line" @click="showSinglePicker2">
				<text class="title">答案A：</text>
				<textarea value="" placeholder="输入问题" />
				<!-- <mpvue-picker ref="mpvuePicker" :deepLength="deepLength" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker> -->
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
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray2="pickerValueArray2"
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
import customHeader  from '../../components/custom-header/custom-header.vue';
export default {
	data() {
		return {
			webviewStyles:{
				top:'44px',
			},
			showWeb:true,
			tipBox:"true",
			title: '主页导航文字',
			showBack: true,
			backBtnClass: 'uni-icon  color-text  uni-icon-back',
			containerStyle:'background:#F74C44',
			titleStyle: 'font-size:15px;color:#ffffff',
			url: '',
			getMessage: '',
			Answer: ['答案A', '答案A', '答案A', '答案A'],              
			pickerSingleArray: [
				{
					label: '中国',
					value: 1
				},
				{
					label: '俄罗斯',
					value: 2
				},
				{
					label: '美国',
					value: 3
				},
				{
					label: '日本',
					value: 4
				}
			],
			themeColor: '#007AFF',
			pickerText: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			pickerValueArray2: []
		};
	},
	onLoad(options) {
// 		console.log(options)
// 		console.log(decodeURIComponent(options.url));
       let Data = {}
	   Data.token = uni.getStorageSync("token")
       this.yapi.getAddYunCont(Data).then(res=>{
		   
	   }).catch(err=>{
		   
	   })
// 		if (options && options.url) {
// 			this.url = decodeURIComponent(options.url);
// 		}
	},
	onLaunch(options) {
		console.log('app.js ---onLaunch---' + JSON.stringify(options));
	},
	onShow() {
		console.log('app.js ---onShow---');
	},
	onHide() {
		console.log('app.js ---onHide---');
	},
	onError(msg) {
		console.log('app.js ---onError---' + msg);
	},
	onUnload: function () {
		console.log("onUnload")
	
	},
// 	globalData: {
// 		userInfo: null
// 	},
	methods: {
		backClick(){
			this.tipBox = false
		},
		// 预览
		proview() {
			uni.navigateTo({
				url: '../proview/proview'
			});
		},
		showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray;
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		showSinglePicker2() {
			this.pickerValueArray2 = this.Answer;
			this.$refs.mpvuePicker2.show();
		},
		onConfirm(e) {
			this.pickerText = JSON.stringify(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
			}
		}
	},
	components: {
		mpvuePicker,
		customHeader ,
	}
};
</script>

<style>
	.box-cont-tip-show{
		display: none;
		
	}
	.box-cont-tip{
		position: fixed;
		top:0upx;
		left: 0upx;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
	}
	.color-text {
		color: #FFFFFF;
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
