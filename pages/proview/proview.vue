<template>
	<view>
		<view class="name-img">
			<view class="user-box">
				<image src="../../static/bofang.png" mode=""></image>
				<view class="text-info">
					<text>萧逸风</text>
					<text>04-02 12:00</text>
				</view>
			</view>
			<view class="follow" v-show="isFollow" @click="follow()"><text>已关注</text></view>
			<view class="no-follow" v-show="!isFollow" @click="noFllow()"><text>+关注</text></view>
		</view>
		<view class="audio">
			<imt-audio
				continue
				:src="audio[now].src"
				:duration="audio[now].duration"
				@prev="now = now === 0 ? audio.length - 1 : now - 1"
				@next="now = now === audio.length - 1 ? 0 : now + 1"
			></imt-audio>
		</view>
		<view class="ti-cont">
			<view class="title">问题：</view>
			<view class="ti-cont-line">这是问题这是问题这是问题这是问题这是问题这是问题</view>
			<view class="answer-box">
				<view class="answer">
					<radio-group class="radio-group-rad" @change="radioChange">
						<label class="" v-for="(item, index) in radioItems" :key="index">
							<view class="box-grop">
								<view class="ridio-by"><radio :id="item.name" :value="item.name" :checked="item.checked"></radio></view>
								<view class="cont-box">
									<text>{{ item.value }}</text>
								</view>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="bt-grop">
				<button class="again-edit" @click="againEdit">重新编辑</button>
				<button class="up-sure">确定上传</button>
			</view>
		</view>
	</view>
</template>

<script>
import imtAudio from 'components/imt-audio/imt-audio';
export default {
	data() {
		return {
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
				{
					name: 'USA',
					value: '题目题目题目题目题目'
				},
				{
					name: 'CHN',
					value:
						'题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目111',
					checked: 'true'
				},
				{
					name: 'USA',
					value: '题目题目题目题目题目'
				},
				{
					name: 'CHN',
					value:
						'题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目111'
				}
			]
		};
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
		radioChange(e) {
			var checked = e.target.value;
			var changed = {};
			for (var i = 0; i < this.radioItems.length; i++) {
				if (checked.indexOf(this.radioItems[i].name) !== -1) {
					changed['radioItems[' + i + '].checked'] = true;
				} else {
					changed['radioItems[' + i + '].checked'] = false;
				}
			}
		}
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
