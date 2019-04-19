<template>
	<view>
		<view class="tab-box">
			<view @click="choseTab(index,item)" :class="[{ active: activeIndex == index }, 'chose-tab']" v-for="(item, index) in tabList" :key="item.toString">{{ item.name }}</view>
			<view class="img-add" @click="addMark()"><image class="add-img" src="../../static/jiahao.png" mode=""></image></view>
		</view>
		<!-- 内容 -->
		<view class="cont-box">
			<view class="user-info" v-for="item in getHoneList" :key="item.toString">
				<view @click="detiles(item)">
					<view class="name-img" @click.stop>
						<view class="user-box">
							<image :src="item.avatar" mode=""></image>
							<view class="text-info">
								<text>{{item.name}}</text>
								<text>{{item.createtime}}</text>
							</view>
						</view>
						<view class="follow" v-show="isFollow" @click="follow()"><text>已关注</text></view>
						<view class="no-follow" v-show="!isFollow" @click="noFllow()"><text>+关注</text></view>
					</view>
					<view class="ques-cont"><text>{{item.title}}</text></view>
				</view>
				<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						{{item.read_num}}次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						{{item.duration}}
					</view>
				</view>
				<view class="control-box">
					<view class="box-ico box-ico1">
						<image src="../../static/tiwen.png" mode=""></image>
						提问
					</view>
					<view class="box-ico" @click="comment()">
						<image src="../../static/pinglun.png" mode="" />
						{{item.comment_num}}
					</view>
					<view class="box-ico box-ico2">
						<image src="../../static/zan.png" mode="" />
						{{item.like_num}}
					</view>
				</view>
			</view>
				<view class="no-data" v-if="getHoneList.length<=0?true:false">
				<image src="../../static/noData.png" mode=""></image>
				<view class="tip-color">抱歉，暂无相关数据。</view>
			</view>
		</view>
		<!-- mark -->
		<view class="mark" v-show="isShowMark" @click="hidenMark($event)">
			<view class="list">
				<view class="luy ss" @click="gotoSearch()">
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
			tabList: [],
			activeIndex: 0,
			isFollow: true,
			isShowMark: false,
			getHoneList:[],
			token:11111,
			userid:333333333
		};
	},
	onLoad() {
	   this.getTab()
	},
	methods: {
		getTabList(id){
			
		},
		getList(){
			
		},
		// 评论
		comment(){
			uni.navigateTo({
				url:'../comment-detail/comment-detail'
			});
		},
		// 跳转详情
		detiles(item) {
			console.log(item.radio_id)
			uni.navigateTo({
				url:'../playaudio/playaudio?id='+item.radio_id,
				// url: '../soundRecording/soundRecording'
			});
			uni.setStorage({
				key: 'storage_key',
				data: 'hello',
				success: function() {
					console.log('success');
				}
			});
		},
		gotoSearch() {
			uni.navigateTo({
				url: '../searchpage/searchpage'
			});
		},
		getTab(){
			this.yapi.getHoneTab().then((res)=>{
				this.tabList = res.datas
				this.choseTab(0,res.datas[0])
			}).catch(()=>{
			})
		},
		choseTab(index,item) {
			this.activeIndex = index;
			let pram = {}
			pram.type = item.id;
			pram.curpage = 1;
			pram.pagesize = 10;
			this.yapi.getHoneList(pram).then((res)=>{
				this.getHoneList = res.datas.data
				
			}).catch(()=>{
			})
			
		},
		follow() {
			this.isFollow = false;
		},
		noFllow() {
			this.isFollow = true;
		},
		search() {
			console.log('0000000000000000');
		},
		
		// 录音
		soundAudio() {
			uni.navigateTo({
				// url: '../soundSavue/soundSavue?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/?id=8888'),
				// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/cataudio.html?id=8888'),
				url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/?token='+this.token+'&id='+this.userid)
			});
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
	.no-data{
			position: absolute;
			text-align: center;
			margin-top: 179upx;
			width: 100%;
			
		}
		.no-data image{
			width: 290upx;
			height: 239upx;
			margin: auto;
		}
		.no-data .tip-color{
			color: #666666;
			margin-top: 91upx;
			text-align: center;
		}
view {
	line-height: 1.5;
}
.active {
	color: #fc4e51 !important;
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
	border-radius: 50%;
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
	font-size: 28upx;
	color: #333333;
}
.text-info text:nth-child(2) {
	font-size: 20upx;
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
.bo-cont view {
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
.control-box .box-ico1 {
	padding-left: 40upx;
}
.control-box .box-ico2 {
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
