<template>
	<view>
		<!-- 头部播放区 -->
		<view class="head-box"  :key="item.tostring">
			<view class="name-img">
				<view class="user-box">
					<image :src="contJson.userInfo.avatar" mode=""></image>
					<view class="text-info">
						<text>{{contJson.userInfo.realname}}</text>
						<text>{{contJson.userInfo.fans_num}} 关注</text>
					</view>
				</view>
				<!-- <view class="follow" v-show="isFollow" @click="follow()"><text>已关注</text></view>
				<view class="no-follow" v-show="!isFollow" @click="noFllow()"><text>+关注</text></view> -->
			</view>
			<view class="audio">
				<imt-audio
					continue
					:src="contJson.mp3Url"
					:duration="contJson.title	"
					@prev="now = now === 0 ? audio.length - 1 : now - 1"
					@next="now = now === audio.length - 1 ? 0 : now + 1"
				></imt-audio>
			</view>
		</view>
		<view class="ti-cont">
			<view class="title">问题：</view>
			<view class="ti-cont-line">{{contJson.descript}}</view>
			<view class="answer-box">
				<view class="answer">
					<radio-group class="radio-group-rad" >
						<label class="" v-for="(items, index) in radioItems" :key="index">
							<view class="box-grop">
								<view class="ridio-by"><radio  :checked="index==contJson.right_option" disabled></radio></view>
								<view class="cont-box">
									<text>{{ items }}----{{index==item.right_option}}---{{index}}--=={{contJson.right_option}}</text>
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
			contJson:{},
			audio: [
				{
					src: 'http://mouyizhan.com/1.mp3',
					duration: 212
				},
				{
					src: 'http://mouyizhan.com/2.mp3',
					duration: 189
				},
				{
					src: 'http://mouyizhan.com/3.mp3',
					duration: 214
				},
				{
					src: 'http://mouyizhan.com/4.mp3',
					duration: 205
				},
				{
					src: 'http://mouyizhan.com/5.mp3',
					duration: 228
				}
			],
			now: 0,
			radioItems: [
			
			]
		};
	},
		onLoad(options) {
			this.contJson = uni.getStorageSync('onjcont')
			var obj = {}
			 this.radioItems = new Array(this.contJson.option1,this.contJson.option2,this.contJson.option3,this.contJson.option4)
		
// 			this.radioItems.add()
// 			for(var i=1;i<=4;i++){
// 				var obj = {}
// 				obj.name = this.contJson.option+i
// 				this.radioItems.push()
// 				
// 			}
			
		
			console.log(this.contJson)
			console.log(this.radioItems)
			
		},
	onReachBottom() {
		this.hidden = false;
		console.log('aaa');
		setTimeout(() => {
			this.hidden = true;
		}, 3000);
	},
	methods: {
		againEdit() {
			uni.navigateBack({
				
			})
			
		},
		upFile(){
			this.contJson.token = uni.getStorageSync('token');
			this.yapi.addYunCont(this.contJson).then(res=>{
				if(res.code==200){
					
					uni.switchTab({
						url:'../broadcast/broadcast'
					})
					return
				}else{
					uni.showToast({
						icon:"none",
						title:'上传失败,请重试'
					})
				}
			}).catch(err=>{
				
			})
		}
// 		radioChange(e) {
// 			var checked = e.target.value;
// 			var changed = {};
// 			for (var i = 0; i < this.radioItems.length; i++) {
// 				if (checked.indexOf(this.radioItems[i].name) !== -1) {
// 					changed['radioItems[' + i + '].checked'] = true;
// 				} else {
// 					changed['radioItems[' + i + '].checked'] = false;
// 				}
// 			}
// 		}
	},
	components: {
		imtAudio
	}
};
</script>

<style>
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
	margin-left: 60upx;
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
	border: 2upx solid rgba(153, 153, 153, 1);
	border-radius: 44upx;
	color: #666666;
	background: #ffffff;
}
.bt-grop .up-sure {
	width: 230upx;
	height: 88upx;
	line-height: 88upx;
	border-radius: 44upx;
	background: #f74c44;
	color: #ffffff;
}
</style>
