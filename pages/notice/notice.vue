<template>
	<view class="notice">
		<template v-if="role == 1">
			 <view class="type-list">
				<view class="type-item" >
					<image src="../../static/msg-tiwen.png" mode="" class="pic"></image>
					<view class="text">问答</view>
					<view class="arrow"></view>
				</view>
					<navigator url="../noticeanswer/noticeanswer" class="type-item" hover-class="none">
					<image src="../../static/msg-huifu.png" mode="" class="pic"></image>
					<view class="text">回复</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../noticepraise/noticepraise" class="type-item" hover-class="none">
					<image src="../../static/msg-zan.png" mode="" class="pic"></image>
					<view class="text">赞</view>
					<view class="arrow"></view>
				</navigator>
			</view>
		</template>
		<template v-else>
			 <view class="type-list">
				<view class="type-item" >
					<image src="../../static/msg-tiwen.png" mode="" class="pic"></image>
					<view class="text">提问</view>
					<view class="arrow"></view>
				</view>
				<navigator url="../noticecomment/noticecomment" class="type-item" hover-class="none">
					<image src="../../static/msg-pinglun.png" mode="" class="pic"></image>
					<view class="text">评论</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../noticepraise/noticepraise" class="type-item" hover-class="none">
					<image src="../../static/msg-zan.png" mode="" class="pic"></image>
					<view class="text">赞</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../noticeanswer/noticeanswer" class="type-item" hover-class="none">
					<image src="../../static/msg-huifu.png" mode="" class="pic"></image>
					<view class="text">回复</view>
					<view class="arrow"></view>
				</navigator>
			</view>
		</template>
		<view class="user-list">
			<view v-for="(item,index) in list" :key="index" class="user-item" @click="msg(item.origin_user_id,item.name)">
				<image :src="item.avatar" mode="" class="pic"></image>
				<view class="user-info">
					<view class="user-text">
						<view class="user-name">{{item.name}}</view>
						<view class="time">
							{{item.createtime}}
						</view>
					</view>
					<view class="user-text">
						<view class="dynamic">{{item.message_title}}</view>
						<view class="radius" v-if="item.num">
							{{item.num}}
						</view>
					</view>
				</view>
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
				role: uni.getStorageSync("role"),
				token: uni.getStorageSync("token"),
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 10,
				list: []
			};
		},
		onShow() {
			this.getMessageList()
		},
		methods: {
			msg(id,name) {
				let data = {}
				data['token'] = this.token
				data['origin_user_id'] = id
				this.api.updateMsgStatus(data).then(res => {
					uni.navigateTo({
						url: '../noticedetail/noticedetail?id='+id+'&name='+name
					})
				})
			},
			
			getMessageList() {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.userMessageList(data).then(res => {
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
			this.getMessageList()
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
   .notice .type-list,
   .notice .user-list{
   	background: #fff;
   	padding: 0 30upx;
   }
   .notice .type-list .type-item {
   	display: flex;
   	align-items: center;
   	padding: 22upx 0;
   	border-bottom: 1px solid #EEEEEE;
   }
   .notice .type-list .type-item .pic {
   	display: block;
   	width: 72upx;
   	height: 72upx;
   }
   .notice .type-list .type-item .text{
   	flex: 1;
   	font-size: 30upx;
   	margin-left: 21upx;
   }
   .notice .type-list .type-item .arrow {
   	  width: 20upx;
   	  height: 20upx;
   	  border-top: 1px solid #C9C9C9;
   	  border-right: 1px solid #C9C9C9;
   	  transform: rotate(45deg);
   }
    .notice .user-list .user-item {
		display: flex;
		align-items: center;
		padding: 20upx 0;
	}
   .notice .user-list .user-item .pic{
	   display: block;
	   width: 70upx;
	   height: 70upx;
	   margin-right: 20upx;
   }
    .notice .user-list .user-item .user-info {
		flex: 1;
	}
    .notice .user-list .user-item .user-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
   .notice .user-list .user-item .user-name {
	   font-size: 30upx;
   }
   .notice .user-list .user-item .time {
	   color: #999999;
	   font-size: 20upx;
   }
    .notice .user-list .user-item .dynamic {
		 color: #999999;
		font-size: 20upx;
	}
	.notice .user-list .user-item .radius {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24upx;
		height: 24upx;
		border-radius: 50%;
		overflow: hidden;
		color: #fff;
		font-size: 20upx;
		background: #FC4E51;
	}
   
</style>
