<template>
	<view class="comment-detail">
		<view class="comments-header">
			<view class="flex">
				<view class="user-info" v-if="detail.user_info">
					<image :src="detail.user_info.avatar" mode="" class="pic"></image>
					<view class="">
						<view class="user-name">{{detail.user_info.avatar.name}}</view>
						<view class="content">
							{{detail.title}}
						</view>
					</view>
				</view>
				<template v-if="detail.user_info.attention_status == 1">
					<view class="already-concern">+关注</view>
				</template>
				<template v-if="detail.user_info.attention_status == 2">
					<view class="already-concern">已关注</view>
				</template>
				
			</view>
			<view class="user-state">
				<view class="play-num">
					<image src="../../static/bf.png" mode="" class="pic"></image>
					<view class="text">{{detail.read_num}}次</view>
				</view>
				<view class="timer">
					<image src="../../static/shijian.png" mode="" class="pic"></image>
					<view class="text">{{detail.duration}}'</view>
				</view>
				<view class="time">
					{{detail.createtime}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content-title">
				评论({{list.length}})
			</view>
			<view class="comment-list">
				<navigator :url="'../commentrely/commentrely?id='+item.comment_id" v-for="(item,index) in list" :key="index" class="comment-item" hover-class="none">
					<image :src="item.avatar" mode="" class="portrait"></image>
					<view class="comment-info">
						<view class="name">{{item.name}}</view>
						<view class="msg">{{item.content}}</view>
						<view class="state">
							<view class="time">昨天 12:15</view>
							<view class="icon half">
								<image src="../../static/pinglun.png" mode="" class="pic" />{{item.reply_num}}</view>
							<view class="icon">
								<image src="../../static/zan.png" mode="" class="pic" />{{item.like_num}}</view>
						</view>
					</view>
				</navigator>
				 <view :hidden="loadingHidden">
					<uni-load-more status="loading"></uni-load-more>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="button-cont" v-show="!hidden">
			<view class="control-box">
				<view class="box-ico box-ico1">
					<image src="../../static/tiwen.png" mode=""></image>
					提问
				</view>
				<view class="box-ico" @click="pop">
					<image src="../../static/pinglun.png" mode="" />
					评论
				</view>
				<view class="box-ico box-ico2">
					<image src="../../static/zan.png" mode="" />
					点赞
				</view>
			</view>
		</view>
		<!-- 阴影层 -->
		<view class="shadow-area" v-if="hidden" @click="hide"></view>
		<!-- 输入框 -->
		<view class="area" v-if="hidden" :style="{bottom: bottom+'px'}">
			<textarea v-model="msgContent" placeholder="写评论" class="write" :adjust-position="false" fixed :maxlength="-1" focus
			 @focus="focus" @blur="blur" auto-height :show-confirm-bar="false" />
			<view class="btn-group">
				 <view class="textarea-num">{{getWordNumber}}</view>
				 <button type="primary" hover-class="none" :disabled="isDisabled">发送</button>
			 </view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
               msgContent: '',
			   bottom: 0,
			   hidden: false,
			   radioId: '',
			   detail: {},
			   list: [],
			   loadingHidden: true,
			   hasmore: true,
			   curpage: 1,
			   pagesize: 10,
			}
		},
		onLoad(option) {
			this.radioId = option.radioId
			this.getCommentList()
		},
		computed: {
			getWordNumber() {
				return this.msgContent.length
			},
			isDisabled() {
				if (!this.msgContent.length) return true
				else return false
			}
		},
		methods: {
		  hide() {
			this.hidden = !this.hidden  
		  },
          pop() {
			  this.hidden = true;
		  },
		  focus(e) {
			  this.bottom = e.detail.height
		  },
		  blur(e) {
			  this.bottom = 0
		  },
		  getCommentList() {
			  let data = {};
			  data["radio_id"] = this.radioId;
			  data['curpage'] = this.curpage;
			  data['pagesize'] = this.pagesize
			  this.loadingHidden = true;
			  this.api.commentList(data).then(res => {
				  this.detail = res.datas;
			  	 if (this.curpage == 1) this.list = []
			  	 this.list = [...this.list,...res.datas.comment_list.data]
			  	 this.hasmore = res.datas.comment_list.has_more
			  	 this.curpage++
			  	 
			  }).catch(err => {
			  	
			  })
		  }
		},
		components: {
			uniLoadMore
		},
		onReachBottom() {
			if(this.hasmore) this.loadingHidden = false
			else{
				this.loadingHidden = true
				return;
			}
			this.getCommentList()
		}
	}
</script>

<style>
	button {
		margin-left: 16upx;
		margin-right: 0;
		font-size: 14px;
		line-height: 2;
		background: #F74C44;
		 outline:none;
		 appearance: none;
	}
	view {
		line-height: 1.5;
	}
	
    button[type=primary]{
		background: #F74C44;
	}
	 button[disabled][type=primary] {
		 background: #eaeaea;
	 }
	 button[disabled] {
		color:#c1c1c1;
	}
	.comment-detail .comments-header {
		padding: 31upx 31upx 30upx 30upx;
		margin-bottom: 20upx;
		background: #FFFFFF;
	}

	.comment-detail .flex {
		display: flex;
		align-items: center;
	}

	.comment-detail .comments-header .user-info {
		flex: 1;
		display: flex;
	}
	.comment-detail .comments-header .user-info .pic {
		display: block;
		width: 100upx;
		height: 100upx;
		margin-right: 10upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.comment-detail .comments-header .user-info .user-name {
		color: #333333;
		font-size: 28upx;
	}

	.comment-detail .comments-header .user-info .content {
		margin-top: 10upx;
		font-size: 30upx;
	}

	.comment-detail .already-concern {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 110upx;
		height: 50upx;
		margin-bottom: 16upx;
		border: 1px solid #F74C44;
		color: #F74C44;
		font-size: 24upx;
		border-radius: 10upx;
	}

	.comment-detail .comments-header .user-state {
		display: flex;
		margin-top: 30upx;
	}

	.comment-detail .comments-header .user-state .play-num {
		display: flex;
		align-items: center;

	}

	.comment-detail .comments-header .user-state .text {
		font-size: 20upx;
		color: #666666;
	}

	.comment-detail .comments-header .user-state .timer {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 52upx;
	}

	.comment-detail .comments-header .user-state .time {
		font-size: 20upx;
		color: #666666;
	}

	.comment-detail .comments-header .user-state .pic {
		display: block;
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
	}

	.comment-detail .content-title {
		padding: 16upx 0 16upx 34upx;
		font-size: 28upx;
		color: #666666;
		background: #F2F2F2;
	}

	.comment-detail .comment-item {
		display: flex;
		padding: 23upx 32upx 0;
		background: #FFFFFF;
	}
    .comment-detail .comment-item view{
		line-height: 1;
	}
	.comment-detail .comment-item .portrait {
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 15upx;
	}

	.comment-detail .comment-item .comment-info {
		flex: 1;
		padding-bottom: 25upx;
		border-bottom: 1px solid #EEEEEE;

	}

	.comment-detail .comment-item .comment-info .name {
		color: #333333;
		font-size: 32upx;
	}

	.comment-detail .comment-item .comment-info .msg {
		margin: 20upx 0;
		color: #333333;
		font-size: 30upx;
	}

	.comment-detail .comment-item .comment-info .state {
		display: flex;
	}

	.comment-detail .comment-item .state {
		color: #999999;
		font-size: 24upx;
	}

	.comment-detail .comment-item .state .time {
		color: #999999;
		font-size: 24upx;
	}

	.comment-detail .comment-item .state .icon {
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 24upx;
	}

	.comment-detail .comment-item .state .icon.half {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		margin-right: 61upx;
	}

	.comment-detail .comment-item .state .pic {
		width: 31upx;
		height: 31upx;
		margin-right: 4upx;
	}

	.control-box {
		position: fixed;
		bottom: 0px;
		left: 0px;
		height: 95upx;
		border-top: 1upx solid #EEEEEE;
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
	.comment-detail .shadow-area {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,.3);
		z-index: 9;
	}
	.comment-detail .area {
		position: fixed;
		left: 0;
		width: 100vw;
		/* height: 80upx; */
		background: #FFFFFF;
		z-index: 10;
	}
    .comment-detail .write {
		padding: 15upx;
		/* height: 80upx; */
		width: 100vw;
	}
	.comment-detail .area .btn-group {
		display: flex;
		justify-content:  flex-end;
		align-items: center;
	    padding:0 15upx 15upx 0;
	}
</style>
