<template>
	<view class="play-audio">
		<!-- 头部播放区 -->
		<view class="head-box">
			<view class="name-img" v-if="area.user_info">
				<view class="user-box">
					<image :src="area.user_info.avatar" mode=""></image>
					<view class="text-info">
						<text>{{area.user_info.name}}</text>
						<text>{{area.user_info.attention_num}}人关注</text>
					</view>
				</view>
				<template v-if="area.attention_status == 1">
					<view class="concern-btn">
						+关注
					</view>
				</template>
				<template v-if="area.attention_status == 2">
					<view class="concern-btn">
					    已关注
					</view>
				</template>
				
			</view>
			<view class="audio-title">
			   {{area.title}}
			</view>
			<view class="audio" v-if="audio.length > 0">
				<imt-audio
					:src="audio[now].src"
					:duration="audio[now].duration"
					@prev="now = now === 0 ? audio.length - 1 : now - 1"
					@next="now = now === audio.length - 1 ? 0 : now + 1"
					@getaudio="getAudioContext"
					@end='finish'
				></imt-audio>
			</view>
		</view>
		<!-- 题目回区域 -->
		<view class="ti-cont">
			<view class="title">问题：</view>
			<view class="ti-cont-line">{{area.subject_list[0].descript}}</view>
			<view class="answer-box">
				<view class="answer">
					<radio-group class="radio-group-rad" @change="radioChange">
						<label class="" v-for="(item, index) in radioItems" :key="index">
							<view class="box-grop" v-show="!(item==null)">
								<view class="ridio-by" >
									<radio :id="item" :value="item" :checked="item.checked"></radio>
									</view>
								<view class="cont-box">
									<text>{{ item }}</text>
								</view>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		<!-- <view class="fixed-answer"></view> -->
		<!-- 评论区 -->
		<view class="comment-box">
			<text class="comment-line">评论区</text>
			<template v-if="area.comment_list.length > 0">
				<view class="line" v-for="(item,index) in area.comment_list" :key="index">
					<view class="line-in-box">
						 <view class="coment-box-in">
							<view class="user-box comment-box-user">
								<image :src="item.avatar" mode=""></image>
								<view class="text-info">
									<text>{{item.name}}</text>
									<text>{{item.createtime}}</text>
								</view>
							</view>
							<view class="nei-ron">{{item.content}}</view>
							<view class="zan-comment">
								<view><image src="../../static/pinglun.png" mode="" @click="comment()"></image>{{item.reply_num}}</view>
								<view><image src="../../static/zan.png" mode=""></image>{{item.like_num}}</view>
							</view>
						 </view>
						
					</view>
				</view>
			</template>
		</view>
		<!-- 底部 -->
		<view class="button-cont">
				<view class="control-box">
				<view class="box-ico box-ico1">
					<image src="../../static/tiwen.png" mode=""></image>
					提问
				</view>
				<navigator :url="'../commentdetail/commentdetail?radioId='+area.id" class="box-ico" hover-class="none">
					<image src="../../static/pinglun.png" mode="" />
					{{area.comment_num}}
				</navigator>
				<view class="box-ico box-ico2">
					<image src="../../static/zan.png" mode="" />
					{{area.like_num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import imtAudio from 'components/imt-audio/imt-audio';
export default {
	data() {
		return {
			audioContext: null,
			isFinish: false,
			audio: [],
			area: {},
			token: uni.getStorageSync('token'),
			now: 0,
			radioItems: [],
			listenStatus:1.,
			audioId:''
		};
	},
	onLoad:function(option){
		console.log(option)
		this.audioId = option.id
		this.getAudioResource()
	},
	onReachBottom() {
		this.hidden = false;
		console.log('aaa');
		setTimeout(() => {
			this.hidden = true;
		}, 3000);
	},
	methods: {
		// 收听云广播
		listenRadio(){
			let par={}
			par.radio_id = this.audioId
			par.token = this.token
			par.listen_status = this.listenStatus
			this.yapi.listenAudo(par).then(res=>{
				
				
			}).catch(err=>{
				
			})
			
		},
		comment(){
			uni.navigateTo({
				url:"../commentrely/commentrely"
			})
		},
		againEdit() {
			uni.navigateBack({
				
			})
			
		},
		radioChange(e) {
			if (!this.isFinish) {
				uni.showToast({
					title:'请听完再答题',
					icon: 'none'
				})
				return;
			}
			var checked = e.target.value;
			var changed = {};
			for (var i = 0; i < this.radioItems.length; i++) {
				if (checked.indexOf(this.radioItems[i].name) !== -1) {
					changed['radioItems[' + i + '].checked'] = true;
				} else {
					changed['radioItems[' + i + '].checked'] = false;
				}
			}
		},
		// 获取音频实例
		getAudioContext(audio) {
			this.audioContext = audio;
		},
		// 获取音频已播完整首
		finish(end) {
			this.isFinish = true;
			this.listenStatus = 2
			this.listenRadio();
		},
		getAudioResource(id) {
			let data = {};
			data['token'] = this.token
			data['radio_id'] = this.audioId;
			this.yapi.getYunDetils(data).then(res => {
				this.radioItems = new Array(res.datas.subject_list[0].option1,res.datas.subject_list[0].option2,res.datas.subject_list[0].option3,res.datas.subject_list[0].option4)
				this.area = res.datas
				let audioJson = {
					// src: 'http://src.fzwsc.com/ygb/user/4/20190419145128oplq.mp3',
					src: res.datas.radio,//http://src.fzwsc.com/ygb/user/4/20190419145128oplq.mp3',
					duration: res.datas.duration
				}
				this.audio.push(audioJson)
			})
		}
	},
	onHide() {
		 if (this.audioContext) this.audioContext.destroy();
	},
	onUnload() {
		if (this.audioContext) this.audioContext.destroy();
		uni.setStorageSync('flag',true)
	},
	components: {
		imtAudio
	}
};
</script>

<style>
	view{
		line-height: 1.6;
	}
page {
	height: 100%;
	width: 100%;
	/* background: #ffffff; */
}

.head-box{
	background:#f74c44;
}
.user-info {
	background: #ffffff;
	padding: 22upx 27upx 22upx 29upx;
	margin-bottom: 18upx;
}
.name-img {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #f74c44;
	padding: 12upx 53upx;
	display: flex;
	justify-content: space-between;
	color: #ffffff;
}
.user-box image {
	border: 1px solid rgba(242, 242, 242, 1);
	border-radius: 50%;
	height: 100upx;
	width: 100upx;
}
 .user-box {
	display: flex;
}
 .user-box .text-info {
	margin-left: 13upx;
	display: flex;
	height: 100upx;
	flex-direction: column;
	padding-top: 15upx;
}
.text-info text:nth-child(1) {
	font-size: 28upx;
}
.text-info text:nth-child(2) {
	margin-top: 5upx;
	font-size: 20upx;
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
.play-audio .concern-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 110upx;
	height: 50upx;
	border: 1px solid #FFFFFF;
	border-radius: 10upx;
	font-size: 24upx;
}
.play-audio .audio-title {
	padding-left: 53upx;
	color: #fff;
	background: #F74C44;
	font-size: 28upx;
}
.play-audio .audio {
	background: #f74c44;
}
.ti-cont {
	color: #333333;
	height: 100%;
	background: #ffffff;
	font-size: 30upx;
	padding: 33upx;
}
.ti-cont  .title{
	margin: 0 0 25upx 0;
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
.comment-box-user{
	
}
.comment-box{
	background: #FFFFFF;
	margin-top: 20upx;
	padding-bottom: 100upx;
}
.comment-box .comment-line{
	color: #333333;
	display: block;
	padding: 18upx 31upx;
	border-bottom: 1px solid #EEEEEE;
}
.comment-box .coment-box-in{
	padding: 24upx 32upx 0 32upx;
	border-bottom: 1upx solid #EEEEEE;
}
.comment-box .nei-ron{
	border-bottom: 1upx solid #EEEEEE;
	padding-bottom: 10upx;
}
.comment-box .zan-comment{
	display: flex;
	justify-content: space-between;
	height: 90upx;
	align-items: center;
	color: #666666;
	font-size: 15upx;
    padding: 0 118upx;
	
}
.comment-box .zan-comment view{
	font-size: 20upx;
	display: flex;
	align-items:center;
}
.comment-box .zan-comment image{
	margin-right: 14upx;
	height: 31upx;
	width: 30upx;
	
}
.control-box {
	position: fixed;
	bottom: 0px;
	left: 0px;
	height: 98upx;
	border-top:1upx solid #EEEEEE ;
	padding: 18upx 0 0 0;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background: #FFFFFF;
	align-items: center;
}
.control-box .box-ico {
	color: #666666;
	font-size: 23upx;
	text-align: center;
	display: flex;
	justify-content: center;
	
}
.control-box .box-ico1{
	padding-left: 40upx;
}
.control-box .box-ico2{
	padding-right: 40upx;
}
.control-box .box-ico image {
	margin-right: 5upx;
	height: 38upx;
	width: 38upx;
	vertical-align: middle;
}
.fixed-answer {
	position: fixed;
	top: 246upx;
	left: 0;
	bottom: 0;
	width: 100vw;
	background: rgba(0,0,0,.1);
}
</style>
