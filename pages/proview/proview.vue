<template>
	<view>
		<!-- 头部播放区 -->
		<view class="head-box"  :key="item.tostring">
			<view class="name-img">
				<view class="user-box" v-if="contJson.userInfo">
					<image :src="contJson.userInfo.avatar" mode=""></image>
					<view class="text-info">
						<text>{{contJson.userInfo.realname}}</text>
						<text>{{contJson.userInfo.fans_num}} 关注</text>
					</view>
				</view>
				<!-- <view class="follow" v-show="isFollow" @click="follow()"><text>已关注</text></view>
				<view class="no-follow" v-show="!isFollow" @click="noFllow()"><text>+关注</text></view> -->
			</view>
				<view class="audio" v-if="audio.length > 0">
	     	 			<imt-audio ref="imt" :src="audio[now].src" :duration="audio[now].duration" @prev="now = now === 0 ? audio.length - 1 : now - 1"
	     	 			 @next="now = now === audio.length - 1 ? 0 : now + 1" @getaudio="getAudioContext" ></imt-audio>
	     	 		</view>
		</view>
		<view class="ti-cont">
			<view class="title">问题：</view>
			<view class="ti-cont-line">{{contJson.descript}}</view>
			<view class="answer-box">
				<view class="answer">
					<radio-group class="radio-group-rad" >
						<label class="" v-for="(items, index) in radioItems" :key="index">
							<view class="box-grop" v-if='radioItems'>
								<!-- <view class="ridio-by"><radio  :checked="(index+1)==contJson.right_option" disabled></radio></view> -->
								<view class="cont-box" v-if='items'>
									<image :src="(index+1)==contJson.right_option?'../../static/dui.png' :'../../static/xuanxiang.png'" mode="" class="pic" ></image>
									<text>{{ items }}</text>
								</view>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="bt-grop">
				<button class="again-edit" @click="againEdit">重新编辑</button>
				<button class="up-sure" @click="upFile">确定上传</button>
			</view>
		</view>
	</view>
</template>

<script>
import imtAudio from 'components/imt-audio/imt-audio';
export default {
	data() {
		return {
			audioContext:null,
			contJson:{},
			audio: [
			],
			now: 0,
			radioItems: [
			
			],
			token: uni.getStorageSync('token')
		};
	},
		onLoad(options) {
			console.log(options);
			// this.contJson =''// uni.setStorage('objcont');
			// var radioItemsArr = new Array(this.contJson.option1,this.contJson.option2,this.contJson.option3,this.contJson.option4);
			// this.radioItems = radioItemsArr
		this.getData()
		this.getAudioDuration()
			
		},
	onReachBottom() {
		this.hidden = false;
		console.log('aaa');
		setTimeout(() => {
			this.hidden = true;
		}, 3000);
	},
	methods: {
		getAudioContext(audio) {
			this.audioContext = audio;
		},
		getData(){
			 uni.getStorage({
				  key: 'objcont',
					success: res => {
						console.log(res)
						this.contJson = res.data
						var radioItemsArr = new Array(this.contJson.option1,this.contJson.option2,this.contJson.option3,this.contJson.option4);
						this.radioItems = radioItemsArr
					}
			})
		
		},
		againEdit() {
			uni.navigateBack({
				
			})
		},
		
	getAudioDuration() {
			let data = {}
			data['token'] = this.token
			this.yapi.getDuration(data).then(res => {
				let json = {
					src: this.contJson.mp3Url,
					duration: res.datas
				}
				this.audio.push(json)
				console.log(res);
			})
		},
		upFile(){
			// 	uni.reLaunch({
			// 	url:'../broadcast/broadcast?tip=3'
			// })
			
			let _this = this
			uni.showModal({
				title: '提示',
				content: '确认提交么',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
							 _this.contJson['token'] = _this.token
						 // data['token'] = this.token
						// console.log(this.contJson)
						_this.yapi.addYunCont(_this.contJson).then(res=>{
							if (_this.audioContext) _this.audioContext.destroy();
							// if(res.code==200){
								uni.reLaunch({
									url:'../broadcast/broadcast?tip=3'
								})
							// }else{
							// 	uni.showToast({
							// 		icon:"none",
							// 		title:'上传失败,请重试'
							// 	})
							// }
								// uni.reLaunch({
								// 	url:'../broadcast/broadcast'
								// })
								// uni.navigateBack({
								// 	delta: 2
								// })
							  }).catch(err=>{
								
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
		
				}
			})
		}
	},
	components: {
		imtAudio
	}
};
</script>

<style>
	.cont-box .pic{
		margin-right: 10upx;
		height: 42upx;
		width: 42upx;
	}
	view{
		line-height: 1.5;
	}
page {
	height: 100%;
	width: 100%;
	background: #ffffff;
}

.head-box{
	
}
.user-info {
	background: #ffffff;
	padding: 22upx 27upx 22upx 29upx;
	margin-bottom: 18upx;
}
.name-img {
	background: #f74c44;
	padding: 12upx 53upx;
	display: flex;
	justify-content: space-between;
	color: #ffffff;
}
.name-img .user-box image {
	border: 1px solid rgba(242, 242, 242, 1);
	border-radius: 50%;
	height: 100upx;
	width: 100upx;
}
.name-img .user-box {
	display: flex;
}
.name-img .user-box .text-info {
	margin-left: 13upx;
	display: flex;
	height: 100upx;
	flex-direction: column;
	padding-top: 15upx;
}
.text-info text:nth-child(1) {
	font-size: 26upx;
}
.text-info text:nth-child(2) {
	font-size: 15upx;
}
.name-img .follow {
	margin-top: 25upx;
}
.name-img .follow text {
	padding: 12upx 23upx;
	border: 2upx solid #ffffff;
	border-radius: 10upx;
}
.name-img .no-follow {
	margin-top: 25upx;
}
.name-img .no-follow text {
	padding: 12upx 23upx;
	border: 1upx solid #ffffff;
	border-radius: 10upx;
}
.audio {
	background: #f74c44;
}
.ti-cont {
	color: #333333;
	height: 100%;
	background: #ffffff;
	font-size: 30upx;
	padding: 33upx;
}
.box-grop {
	position: relative;
}
.ridio-by {
	position: absolute;
	/* left: 30upx; */
	top: 0upx;
}
.cont-box {
	display: flex;
	align-items: center;
}
.bt-grop {
	display: flex;
	font-size: 32upx;
}
.answer-box{
	padding-bottom: 140upx;
}
.bt-grop .again-edit {
	width: 230upx;
	height: 88upx;
	line-height: 88upx;
	border: 1upx solid rgba(153, 153, 153, 1);
	border-radius: 44upx;
	color: #666666;
	background: #ffffff;
}
.bt-grop .up-sure {
	width: 230upx;
	height: 88upx;
	line-height: 88upx;
	line-height: 88upx;
	border-radius: 44upx;
	background: #f74c44;
     border: 1upx solid #f74c44;
	color: #ffffff;
}
</style>
