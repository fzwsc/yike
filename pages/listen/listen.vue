<template>
	<view class="my-comments">
		<view class="comments-item" v-for="(item,index) in list" :key="index">
			<view class="user-info">
				<image :src="item.avatar" mode="" class="pic"></image>
				<view class="">
					<view class="user-name">{{item.realname}}</view>
					<view class="content">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="user-state">
				<view class="play-num">
					<image src="../../static/bf.png" mode="" class="pic"></image>
					<view class="text">{{item.read_num}}次</view>
				</view>
				<view class="timer">
					<image src="../../static/shijian.png" mode="" class="pic"></image>
					<view class="text">{{item.duration_time}}</view>
				</view>
				<view class="time">
					{{item.radio_time}}
				</view>
			</view>
			<view class="notice">
				收听时间：{{item.read_time}}
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
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				list: [],
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 10,
				token: uni.getStorageSync("token")
			};
		},
		onLoad() {
			this.getHistoryList()
		},
		methods: {
			getHistoryList(onlyOne = false) {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.historyList(data,onlyOne).then(res => {
					 if (this.curpage == 1) this.list = []
					 this.list = [...this.list,...res.datas.data]
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
			this.getHistoryList(true)
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
   .my-comments {
	   
   }
   .my-comments .comments-item {
	   padding: 31upx 31upx 30upx 30upx;
	   margin-bottom: 20upx;
	   background: #FFFFFF;
   }
    .my-comments .comments-item .user-info {
		display: flex;
		
	}
   .my-comments .comments-item .user-info .pic {
	   display: block;
	   width: 100upx;
	   height: 100upx;
	   margin-right: 10upx;
	    border-radius: 50%;
	   overflow: hidden;
   }
   .my-comments .comments-item .user-info .user-name {
	   color: #333333;
	   font-size: 28upx;
   }
     .my-comments .comments-item .user-info .content {
		 margin-top: 10upx;
		 font-size: 30upx;
	 }
	 .my-comments .comments-item .user-state {
		   display: flex;
		   margin-top: 30upx;
		   
	   }
	    .my-comments .comments-item .user-state .play-num {
			display: flex;
			align-items: center;
			
		}
		.my-comments .comments-item .user-state .text {
			font-size: 20upx;
			color: #666666;
		}
	   .my-comments .comments-item .user-state .timer {
		   flex: 1;
		   display: flex;
		   align-items: center;
		   margin-left: 52upx;
	   }
	    .my-comments .comments-item .user-state .time {
			font-size: 20upx;
			color: #666666;
		}
	   .my-comments .comments-item .user-state .pic {
			 display: block;
			 width: 28upx;
			 height: 28upx;
			 margin-right: 10upx;
		}
		 .my-comments .comments-item .notice {
			  color: #666666;
			  font-size: 24upx;
			  margin-top: 39upx;
		 }
		  
</style>
