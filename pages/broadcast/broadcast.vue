<template>
	<view>
		<view class="tab-box">
			<view @click="choseTab(index)" :class="[{ active: activeIndex == index }, 'chose-tab']" v-for="(item, index) in tabList">{{ item }}</view>
			<view class="img-add" @click="addMark()"><image class="add-img" src="../../static/jiahao.png" mode=""></image></view>
		</view>
		<!-- 内容 -->
		<view class="cont-box">
			<view class="user-info">
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
				<view class="ques-cont"><text>中共十九大重要通知1中共十九大重要通知1中共十九大重要通知1</text></view>
				<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						300次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						时间
					</view>
				</view>
				<view class="control-box">
					<view class="box-ico box-ico1">
						<image src="../../static/tiwen.png" mode=""></image>
						提问
					</view>
					<view class="box-ico">
						<image src="../../static/pinglun.png" mode="" />
						22
					</view>
					<view class="box-ico box-ico2">
						<image src="../../static/zan.png" mode="" />
						33
					</view>
				</view>
			</view>
			<view class="user-info">
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
				<view class="ques-cont"><text>中共十九大重要通知1中共十九大重要通知1中共十九大重要通知1</text></view>
				<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						300次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						时间
					</view>
				</view>
				<view class="control-box">
					<view class="box-ico box-ico1">
						<image src="../../static/tiwen.png" mode=""></image>
						提问
					</view>
					<view class="box-ico">
						<image src="../../static/pinglun.png" mode="" />
						22
					</view>
					<view class="box-ico box-ico2">
						<image src="../../static/zan.png" mode="" />
						33
					</view>
				</view>
			</view>
		</view>
		<!-- mark -->
		<view class="mark" v-show="isShowMark" @click="hidenMark($event)">
			<view class="list">
				<view class="luy ss" @click="search()">
					<image src="../../static/sousuo.png" mode=""></image>
					搜索
				</view>
				<view class="luy" @click="soundAudio()">
					<image src="../../static/luyin.png" mode=""></image>
					录音
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	data() {
		return {
			tabList: ['关注', '推荐', '热门', '最新'],
			activeIndex: 0,
			isFollow: true,
			isShowMark: false
		};
	},
	methods: {
		choseTab(index) {
			this.activeIndex = index;
		},
		follow() {
			this.isFollow = false;
		},
		noFllow() {
			this.isFollow = true;
		},
		search() {
			console.log("0000000000000000")
		},
		// 录音
		soundAudio() {
			uni.navigateTo({
				url:'../soundSavue/soundSavue'
			})
		},
		hidenMark() {
			this.isShowMark = false;
		},
		addMark() {
			this.isShowMark = true;
		}
	},
	components: { uniLoadMore }
};
</script>

<style>
.active {
	color: #fc4e51!important;
}
.active::after {
	content: '';
	position: absolute;
	bottom: 3upx;
	left: 50%;
	width: 60upx;
	height: 5upx;
	border-radius: 3upx;
	background: #fc4e51;
	transform: translate(-50%, 0);
	color: #fc4e51;
}
.tab-box {
	position: fixed;
	top: 0px;
	display: flex;
	text-align: center;
	width: 100%;
	height: 66upx;
	border-bottom: 1upx solid #e5e5e5;
	background: #ffffff;
}
.chose-tab {
	color: #666666;
	position: relative;
	flex: 2;
	line-height: 66upx;
}
.img-add {
	display: 1;
	text-align: center;
	line-height: 66upx;
	margin-right: 35upx;
}
.img-add .add-img {
	width: 36upx;
	height: 36upx;
	vertical-align: middle;
}
.cont-box {
	margin-top: 66upx;
}
.follow {
	margin-top: 25upx;
}
.follow text {
	padding: 12upx 23upx;
	border: 1upx solid #f74c44;
	border-radius: 10upx;
	color: #f74c44;
}
.no-follow {
	margin-top: 25upx;
}
.no-follow text {
	padding: 12upx 23upx;
	border: 1upx solid #cccccc;
	border-radius: 10upx;
	color: #666666;
}
.user-info {
	background: #ffffff;
	padding: 22upx 27upx 22upx 29upx;
	margin-bottom: 18upx;
}
.name-img {
	display: flex;
	justify-content: space-between;
}
.name-img .user-box image {
	height: 100upx;
	width: 100upx;
}
.name-img .user-box {
	display: flex;
}
.text-info {
	margin-left: 13upx;
	display: flex;
	height: 100upx;
	flex-direction: column;
	padding-top: 15upx;
}
.text-info text:nth-child(1) {
	font-size: 26upx;
	color: #333333;
}
.text-info text:nth-child(2) {
	font-size: 15upx;
	color: #666666;
}
.ques-cont {
	margin: 6px 0;
	color: #333333;
}
.bo-cont {
	display: flex;
	border-bottom: 1upx #eeeeee solid;
	padding: 12upx 0 18upx 0;
	align-items: center;
	line-height: 28upx;
}
.bo-cont view{
	font-size: 20upx;
	color: #666666;
	display: flex;
	align-items: center;
}
.bo-cont view image {
	width: 28upx;
	height: 28upx;
	margin-right: 10upx;
}
.bo-cont view:nth-child(1) {
	margin-right: 52upx;
}
.control-box {
	padding: 18upx 0 0 0;
	display: flex;
	width: 100%;
	justify-content: space-between;
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
.mark {
	position: fixed;
	top: 0px;
	z-index: 99;
	height: 100vh;
	width: 100%;
	background: rgba(0, 0, 0, 0.2);
}

.mark .list {
	position: absolute;
	right: 20upx;
	top: 80upx;
	width: 186upx;
	background: #000000;
	border-radius: 10upx;
	height: 196upx;
}
.mark .list .ss {
	border-bottom: 1upx solid #666666;
	position: relative;
}
.ss:before {
	content: '';
	width: 0px;
	height: 0px;
	border-left: 15upx solid transparent;
	border-right: 15upx solid transparent;
	border-bottom: 15upx solid #000000;
	position: absolute;
	top: -10upx;
	right: 20upx;
}

.mark .list .luy {
	padding-left: 32upx;
	color: #ffffff;
	line-height: 99upx;
}
.mark .list image {
	width: 38upx;
	height: 38upx;
	margin-right: 12upx;
	vertical-align: middle;
}
</style>
