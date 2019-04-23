<template>
	<view class="notice-answer">
		<view class="notice-answer-item"  v-for="(item,index) in list" :key="index">
			<view class="notice-header" v-if="item.user_info">
				<image :src="item.user_info.avatar" mode="" class="pic"></image>
				<view class="user-info">
					<view class="user-name">{{item.user_info.name}}</view>
					<view class="time">{{item.user_info.createtime}}</view>
				</view>
			</view>
			<view class="notice-rely"  v-if="item.user_info">
				{{item.user_info.content}}
			</view>
			<view class="notice-con">
				<view class="comments-item">
					<view class="comment-msg" v-if="item.be_user_info">@{{item.be_user_info.name}}：{{item.be_user_info.content}}</view>
					<view class="user-info" v-if="item.radio_info">
						<image :src="item.radio_info.avatar" mode="" class="pic"></image>
						<view class="">
							<view class="user-name">{{item.radio_info.name}}</view>
							<view class="content">
								{{item.radio_info.title}}
							</view>
						</view>
					</view>
					<view class="user-state" v-if="item.radio_info">
						<view class="play-num">
							<image src="../../static/bf.png" mode="" class="pic"></image>
							<view class="text">{{item.radio_info.read_num}}次</view>
						</view>
						<view class="timer">
							<image src="../../static/shijian.png" mode="" class="pic"></image>
							<view class="text">{{item.radio_info.duration}}</view>
						</view>
						<view class="time">
							{{item.radio_info.createtime}}
						</view>
					</view>

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
			this.getAnswerList()
		},
		methods: {
			getAnswerList(onlyOne = false) {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.answerList(data,onlyOne).then(res => {
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
			this.getAnswerList(true)
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style>
	.notice-answer .notice-answer-item {
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		background: #fff;
	}

	.notice-answer .notice-header {
		display: flex;
	}

	.notice-answer .notice-header .pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 13upx;
		overflow: hidden;
	}

	.notice-answer .notice-header .user-name {
		color: #333333;
		font-size: 28upx;
	}

	.notice-answer .notice-header .time {
		margin-top: 7upx;
		color: #666666;
		font-size: 20upx;
	}

	.notice-answer .notice-rely {
		display: flex;
		align-items: center;
		margin: 17upx 0
	}

	.notice-answer .notice-rely .pic {
		width: 32upx;
		height: 27upx;
		margin: 0 10upx;
	}

	.notice-answer .comments-item {
		padding: 20upx 31upx 30upx 30upx;
		margin-bottom: 20upx;
		background: #F7F7F7;
	}

	.notice-answer .comments-item .user-info {
		display: flex;
	}

	.notice-answer .comments-item .user-info .pic {
		display: block;
		width: 100upx;
		height: 100upx;
		margin-right: 10upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.notice-answer .comments-item .user-info .user-name {
		color: #333333;
		font-size: 28upx;
	}

	.notice-answer .comments-item .user-info .content {
		margin-top: 10upx;
		font-size: 30upx;
	}

	.notice-answer .comments-item .user-state {
		display: flex;
		margin-top: 30upx;
	}

	.notice-answer .comments-item .user-state .play-num {
		display: flex;
		align-items: center;

	}

	.notice-answer .comments-item .user-state .text {
		font-size: 20upx;
		color: #666666;
	}

	.notice-answer .comments-item .user-state .timer {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 52upx;
	}

	.notice-answer .comments-item .user-state .time {
		font-size: 20upx;
		color: #666666;
	}

	.notice-answer .comments-item .user-state .pic {
		display: block;
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
	}
	.notice-answer .comment-msg {
		margin-bottom: 10upx;
	}
</style>
