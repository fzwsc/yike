<template>
	<view>
		<view class="tab-list">
			<view :class="['tab', { active: fistIndex == index }]" v-for="(item, index) in listTab" @click="choseTab(index)">{{ item }}</view>
		</view>
		<!-- 待审核 -->
		<scroll-view scroll-y='true' :style='{height:(heightView-40)+"px"}' @scrolltolower="getListCont()">
	
		<view class="shen-he" v-show="0 == fistIndex">
			<view class="user-info" v-for="itemOne in contList" :key="itemOne">
				<view  >
					<view class="name-img" @click.stop>
						<view class="user-box">
							<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2363037083,4182949652&fm=27&gp=0.jpg" mode=""></image>
							<view class="text-info">
								<text></text>
								<text>{{ itemOne.createtime }}</text>
							</view>
						</view>
						<view class="cotrols-url">
							<view class="state"><text>待审核</text></view>
							<!-- <view class="edit" @click="restEdit(31,35)" ><text>重新编辑</text></view> -->
							<view class="edit" @click="restEdit(itemOne.user_id, itemOne.radio_id)"><text>重新编辑</text></view>
							<!-- <view class="edit" @click="restEdit(36, 26)"><text>重新编辑</text></view> -->
						</view>
					</view>
					<view class="ques-cont">
						<text>{{itemOne.title}}</text>
					</view>
				</view>
				<!-- 	<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						{{item.read_num}}次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						{{item.duration_time}}
					</view>
				</view> -->
			</view>
			<view class="no-data" v-if="contList.length <= 0 ? true : false">
				<image src="../../static/noData.png" mode=""></image>
				<view class="tip-color">抱歉，暂无相关数据。</view>
			</view>
		</view>
		<!-- 已发布 -->
		<view class="fa-bu" v-show="1 == fistIndex">
			<view class="user-info" v-for="itemTow in contList" :key="itemTow">
				<view>
					<view class="name-img" @click.stop>
						<view class="user-box">
							<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2363037083,4182949652&fm=27&gp=0.jpg" mode=""></image>
							<view class="text-info">
								<text>{{ itemTow.name }}</text>
								<text>{{ itemTow.createtime }}</text>
							</view>
						</view>
					</view>
					<view class="ques-cont">
						<text>{{ itemTow.title }}</text>
					</view>
				</view>
				<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						{{ itemTow.read_num }}次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						{{ itemTow.duration_time }}
					</view>
				</view>
			</view>
			<view class="no-data" v-if="contList.length <= 0 ? true : false">
				<image src="../../static/noData.png" mode=""></image>
				<view class="tip-color">抱歉，暂无相关数据。</view>
			</view>
		</view>
		<!-- 审核是失败 -->
		<view class="shi-bai" v-show="2 == fistIndex">
			<view class="user-info"  v-for="itemFor in contList" :key="itemFor">
				<view>
					<view class="name-img" @click.stop>
						<view class="user-box">
							<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2363037083,4182949652&fm=27&gp=0.jpg" mode=""></image>
							<view class="text-info">
								<text>{{itemFor.name}}</text>
								<text>{{itemFor.createtime}}</text>
							</view>
						</view>
						<view class="cotrols-url">
							<view class="state"><text>待审失败</text></view>
							<view class="edit"  @click="restEdit(itemFor.user_id, itemFor.radio_id)"><text>重新编辑</text></view>
						</view>
					</view>
					<view class="ques-cont"><text>{{itemFor.title}}</text></view>
				</view>
				<!-- 	<view class="bo-cont">
					<view>
						<image src="../../static/bf.png" mode=""></image>
						{{item.read_num}}次
					</view>
					<view>
						<image src="../../static/shijian.png" mode=""></image>
						{{item.duration_time}}
					</view>
				</view> -->
			</view>
				<view class="no-data" v-if="contList.length <= 0 ? true : false">
				<image src="../../static/noData.png" mode=""></image>
				<view class="tip-color">抱歉，暂无相关数据。</view>
			</view>
		</view>
			</scroll-view>
		<!-- <view :hidden="hidden"><uni-load-more status="loading"></uni-load-more></view>
		<min-modal ref="modal"></min-modal> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import minModal from '@/components/min-modal/min-modal.vue';
export default {
	data() {
		return {
			listTab: ['待审核', '已发布', '审核是失败'],
			fistIndex: 0,
			token: uni.getStorageSync('token'),
			tabList: [0, 1, 3],
			curpage: 1,
			pagesize: 10,
			hasmore: true,
			hidden: true,
			contList: [],
			heightView:''
		};
	},
	onLoad() {
	  uni.getSystemInfo({
      success: (res) => {
          this.heightView= res.windowHeight
		  console.log( this.heightView);
      }
    })
		this.getListCont(this.tabList[0]);
	},
	methods: {
		choseTab(index) {
			this.fistIndex = index;
			this.getListCont(this.tabList[index]);
			this.contList = [];
			this.curpage =1
			this.hasmore = true
		},
		more(){
		
		},
		// 获取内容list
		getListCont(status) {
				console.log("触底......................"+this.hasmore)
			let par = {};
			par['token'] = this.token;
			par['pagesize'] = this.pagesize;
			par['curpage'] = this.curpage;
			par['status'] = status;
			this.yapi
				.getAudioStateList(par)
				.then(res => {
					this.contList = res.datas.data;
					if(res.datas.has_more){
						this.contList = [...this.contList,...res.datas.data];
						this.hasmore = res.datas.has_more
						this.curpage++;
					}else{
						console.log("没有更多了...");
					}
					// this.contList = 30//res.datas.data;
				})
				.catch(err => {});
		},
		restEdit(userid, id) {
			let _this = this;
			uni.setStorageSync("radio_id",id);
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'devtools') {
						url: '../soundRecording/soundRecording?url=' + encodeURIComponent('https://ygb.yikevr.com/h5/#/?token=' + _this.token + '&userid=' + userid);
					} else if (res.platform == 'ios') {
						console.log('ios' + userid);
						uni.navigateTo({
							// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+userid+"&idEditId="+id)
							url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.test.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+userid+"&idEditId="+id)
							// url:
							// 	'../soundRecording/soundRecording?url=' +
							// 	encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/iospage?token=' + _this.token + '&userid=' + userid + '&idEditId=' + id)
						});
					} else if (res.platform == 'android') {
						uni.navigateTo({
							// url:
							// 	'../soundRecording/soundRecording?url=' +
							// 	encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/?token=' + _this.token + '&userid=' + userid + '&idEditId=' + id)
							// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/?token=' + _this.token + '&userid=' + userid + '&idEditId=' + id)
							url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.test.yikevr.com/h5/#/?token=' + _this.token + '&userid=' + userid + '&idEditId=' + id)
						});
					}
				}
			});
		},
		onReachBottom() {
			if (this.hasmore) this.hidden = false;
			else {
				this.hidden = true;
				return;
			}
			this.getNetData(this.activeIndex, this.tabList[this.activeIndex]);
		},
			changeTime(value) {
			var theTime = parseInt(value); // 秒
			var theTime1 = 0; // 分
			var theTime2 = 0; // 小时
			if (theTime > 60) {
				theTime1 = parseInt(theTime / 60);
				theTime = parseInt(theTime % 60);
				if (theTime1 > 60) {
					theTime2 = parseInt(theTime1 / 60);
					theTime1 = parseInt(theTime1 % 60);
				}
			}
			var result = '' + parseInt(theTime) + '秒';
			if (theTime1 > 0) {
				result = '' + parseInt(theTime1) + '分' + result;
			}
			if (theTime2 > 0) {
				result = '' + parseInt(theTime2) + '小时' + result;
			}
			return result;
		}
	},
	components: { uniLoadMore, minModal },
	filter: {
	
	}
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
.tab-list {
	display: flex;
	width: 100%;
	background: #ffffff;
	border-bottom: 1upx solid #e5e5e5;
	height: 66upx;
	align-items: center;
	left: 0;
	top: 0;
	z-index: 99;
}
.tab {
	flex: 1;
	text-align: center;
}
.active {
	color: #fc4e51;
	position: relative;
}
.active:after {
	position: absolute;
	bottom: -10upx;
	left: 50%;
	width: 80upx;
	transform: translate(-50%, 0);
	height: 4px;
	border-radius: 3px;
	background: #fc4e51;
	content: '';
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
.cotrols-url {
	text-align: center;
}
.cotrols-url .state {
	color: #f74c44;
	font-size: 22upx;
}
.cotrols-url .edit {
	border: 1upx solid #999999;
	color: #999999;
	margin-top: 10upx;
	border-radius: 15upx;
	padding: 0 20upx;
}
</style>
