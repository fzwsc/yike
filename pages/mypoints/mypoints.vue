<template>
	<view class="my-points">
		<view class="points-header">
			<view class="info">
				<image :src="userInfo.avatar" mode="" class="pic"></image>
				<view class="user-name">
					{{userInfo.name}}
				</view>
			</view>
			<view class="score">
				<text class="score-num">{{userInfo.scoreTotal}}</text> 积分
			</view>
		</view>
		<view class="points-container">
			<view class="points-item" v-for="(item,index) in list" :key="index">
				<view class="answer">
					{{item.content}}
				</view>
				<view class="points-state">
					<view class="time">{{item.createtime}}</view>
					<view class="add-score">
						+{{item.score}}
					</view>
				</view>
			</view>
			<view class="empty-data" v-if="list.length <= 0">
				<image src="../../static/noData.png" mode="" class="pic"></image>
				<view class="text">暂无数据~</view>
			</view>
			<view :hidden="hidden">
				<uni-load-more status="loading"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				list: [],
				userInfo: {},
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 11,
				token: uni.getStorageSync("token")
			};
		},
		onLoad() {
			this.getScoreList()
		},
		methods: {
			getScoreList() {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.scoreList(data).then(res => {
					 this.userInfo = res.datas.data.user_info
					 if (this.curpage == 1) this.list = []
					 this.list = [...this.list,...res.datas.data.scorelist]
					 this.hasmore = res.datas.has_more
					 this.curpage++
				}).catch(err => {
					
				})
			}
		},
		onReachBottom() {
			if(this.hasmore) this.hidden = false
			else{
				this.hidden = true
				return;
			}
			this.getScoreList()
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
  .my-points .points-header {
	  position: fixed;
	  top: 0;
	  left: 0;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  width: 100vw;
	  padding: 10upx 22upx 10upx 53upx;
	  color: #fff;
	  box-sizing: border-box;
	  background: #F74C44;
  }
  .my-points .points-header .info {
	  display: flex;
	  align-items: center;
	  font-size: 30upx;
  }
  .my-points .points-header .info .pic {
	  display: block;
	  width: 100upx;
	  height: 100upx;
	  margin-right: 20upx;
	   border-radius: 50%;
	  overflow: hidden;
  }
  .my-points .points-header .score {
	  font-size: 24upx;
  }
  .my-points .points-header .score .score-num {
	  font-size: 36upx;
	  font-weight: bold;
	  margin-right: 3upx;
  }
  .my-points .points-container {
	  margin-top: 120upx;
  }
   .my-points .points-container .points-item {
	   padding: 36upx 33upx 16upx;
	   border: 1px solid #EEEEEE;
	   background: #fff;
   }
    .my-points .points-container .points-item .answer {
		font-size: 28upx;
		color: #333333;
	}
	.my-points .points-container .points-item .points-state {
		display: flex;
		justify-content: space-between;
	}
	 .my-points .points-container .points-item .time {
		 font-size: 24upx;
		 color: #666666;
	 }
	  .my-points .points-container .points-item .add-score {
		  font-size: 28upx;
		  color: #333333;
	  }
</style>
