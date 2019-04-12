<template>
	<view class="mian-box">
		<view class="title-line">
			<text class="title">标题：</text>
			<view>这是标题</view>
		</view>
		<view class="title-line" @click="showSinglePicker()">
			<text class="title">专题：</text>
	        <view>{{pickerText}}</view>
		</view>
		<view class="title-line">
			<text class="title">问题：</text>
			<textarea value="" placeholder="输入问题" />
		</view>
		<view class="title-line">
			<text class="title">答案A：</text>
			<view>这是标题</view>
		</view>
		<view class="title-line">
			<text class="title">答案A：</text>
			<view>这是标题</view>
		</view>
		<view class="title-line">
			<text class="title">答案A：</text>
			<view>这是标题</view>
		</view>
		<view class="title-line">
			<text class="title">答案A：</text>
			<view>这是标题</view>
		</view>
		<view class="sure-an title-line" @click="showSinglePicker2">
			<text class="title">答案A：</text>
			<!-- <mpvue-picker ref="mpvuePicker" :deepLength="deepLength" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker> -->
		</view>
		
		<button  class="preview" @click="proview()">预览</button>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker"  :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 <mpvue-picker :themeColor="themeColor" ref="mpvuePicker2"  :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray2="pickerValueArray2"></mpvue-picker>
	</view>
</template>

<script>
import mpvuePicker from '"../../components/mpvue-picker/mpvuePicker.vue';
export default {
	data() {
		return {
			Answer:["答案A","答案A","答案A","答案A"],
				pickerSingleArray: [{
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
			pickerValueArray:[],
			pickerValueArray2:[]
		};
	},
	methods: {
		// 预览
		proview(){
			uni.navigateTo({
				url:'../proview/proview'
			})
		},
		showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray
			this.deepLength = 1
			this.pickerValueDefault = [0]
			this.$refs.mpvuePicker.show()
		},
		showSinglePicker2(){
			this.pickerValueArray2 = this.Answer
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
					this.$refs.mpvuePicker.pickerCancel()
				}
				
			}
	},
	components: {
		mpvuePicker
	}
};
</script>

<style>
	.mian-box{
		background: #FFFFFF;
		height: 100%;
		width: 100%;
	}
	.title-line{
		border-bottom: #EEEEEE solid 1px;
		margin: 0 33upx;
		padding: 33upx 0;
		display: flex;
	}
	.title{
		color: #999999;
		font-size: 30upx;
	}
	.preview{
		background: #F74C44;
		width: 630upx;
		margin:auto;
		letter-spacing: 10upx;
		text-align: center;
		box-shadow: #F74C44 5upx 1upx 20upx;
		margin-top: 97upx;
		color: #FFFFFF;
		border-radius: 60upx;
		margin-bottom: 60upx;
	}
	.title-line textarea{
		margin-top: 14upx;
	}
</style>
