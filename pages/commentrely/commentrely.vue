<template>
	<view class="comment-rely">
		<template v-if="!whiteScreen">
				<view class="rely-item" v-for="(item,index) in list " :key="index">
					<image :src="item.avatar" mode="" class="portrait"></image>
					<view class="rely-info">
						<view class="name">{{item.name}}</view>
						<view class="msg">{{item.content}}</view>
						<view class="cotrol-box">
								<view class="time">{{item.createtime}}</view>
								<view class="jubao" @click="jubao(item.comment_id)"><image src="../../static/jubao.png" mode=""></image>举报</view>
						</view>
					
					</view>
				</view>
				<view :hidden="loadingHidden">
					<uni-load-more status="loading"></uni-load-more>
				</view>
				<view class="empty-data"  v-if="list.length <= 0">
					<image src="../../static/noData.png" mode="" class="pic"></image>
					<view class="text">暂无数据~</view>
				</view>

		    <view class="footer-area" v-if="!hidden" @click="pop">
				<view class="input-area" ></view>
				<view class="text">发布</view>
			</view>
			<!-- 阴影层 -->
			<view class="shadow-area" v-if="hidden" @click="hide"></view>
			<!-- 输入框 -->
			<view class="area" v-if="hidden" :style="{bottom: bottom+'px'}">
				<textarea v-model="msgContent" placeholder="写评论" class="write" :adjust-position="false" fixed :maxlength="-1" focus
				 @focus="focus" @blur="blur" auto-height :show-confirm-bar="false" />
				<view class="btn-group">
					 <view class="textarea-num">{{getWordNumber}}</view>
					 <button type="primary" hover-class="none" :disabled="isDisabled" @click="send">发送</button>
				 </view>
			</view>
		</template>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				radio_id: '',
				comment_id: '',
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
				token: uni.getStorageSync('token'),
				whiteScreen: true
			}
		},
		onLoad(option) {
			console.log(option)
			this.radio_id = option.radioId
			this.comment_id = option.commentId
			this.getReplyList()
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
			jubao(id){
				uni.navigateTo({
					url: '../reporting/reporting?commentId='+id
				});
			},
			
			send() {
				 let data = {}
				data['token'] = this.token
				data['radio_id'] = this.radio_id
				data['comment_id'] = this.comment_id
				data['content'] = this.msgContent
				 this.api.addReplyComment(data).then(res => {
					  uni.showToast({
						title: '回复成功',
						icon: 'none'
					  })
					  this.hidden = !this.hidden
					  this.curpage = 1
					  this.getReplyList()
				 })
			},
			getReplyList(onlyOne = false) {
				let data = {};
				data["token"] = this.token
				data["comment_id"] = this.comment_id;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.loadingHidden = true;
				this.api.replyList(data,onlyOne).then(res => {
					 this.whiteScreen = false
					 if (this.curpage == 1) this.list = []
					 this.list = [...this.list,...res.datas.data]
					 this.hasmore = res.datas.has_more
					 this.curpage++
					 
				}).catch(err => {
					
				})
			},
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
		},
		onReachBottom() {
			if(this.hasmore) this.loadingHidden = false
			else{
				this.loadingHidden = true
				return;
			}
			this.getReplyList(true)
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
	.cotrol-box{
		display: flex;
		justify-content: space-between;
	}
   .cotrol-box image{
	   width: 34upx;
	   height: 34upx;
	   margin-left: 10upx;
   }
   .jubao{
	   vertical-align: center;
	  color: #999999;
	  font-size: 24upx;
	  display:flex;
	 align-items:center;

   }
	button {
		margin-left: 16upx;
		margin-right: 0;
		font-size: 14px;
		line-height: 2;
		background: #F74C44;
		 outline:none;
		 appearance: none;
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
   view {
	   line-height: 1;
   }
   .comment-rely{
	   padding-bottom: 90upx;
   }
   .comment-rely .rely-item {
   	display: flex;
   	padding: 23upx 32upx 0;
   	background: #FFFFFF;
   }
   .comment-rely .rely-item .portrait {
   	width: 60upx;
   	height: 60upx;
   	overflow: hidden;
   	border-radius: 50%;
   	margin-right: 15upx;
   }
   
   .comment-rely .rely-item .rely-info {
   	flex: 1;
   	padding-bottom: 25upx;
   	border-bottom: 1px solid #EEEEEE;
   
   }
   
   .comment-rely .rely-item .rely-info .name {
   	color: #333333;
   	font-size: 32upx;
   }
   
   .comment-rely .rely-item .rely-info .msg {
   	margin: 20upx 0;
   	color: #333333;
   	font-size: 30upx;
   }
   .comment-rely .rely-item .time {
   	color: #999999;
   	font-size: 24upx;
   }
   	.comment-rely .shadow-area {
   	position: fixed;
   	top: 0;
   	bottom: 0;
   	left: 0;
   	width: 100vw;
   	height: 100vh;
   	background: rgba(0,0,0,.3);
   	z-index: 9;
   }
   .comment-rely .area {
   	position: fixed;
   	left: 0;
   	width: 100vw;
   	background: #FFFFFF;
   	z-index: 10;
   }
   .comment-rely .write {
   	padding: 15upx;
   	width: 100vw;
   }
   .comment-rely .area .btn-group {
   	display: flex;
   	justify-content:  flex-end;
   	align-items: center;
    padding:0 15upx 15upx 0;
   }
   .comment-rely .footer-area {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   width: 100vw;
	   padding: 28upx;
	   box-sizing: border-box;
	   height: 90upx;
	   display: flex;
	   justify-content: space-between;
	   align-items: center;
	   background: #fff;
   }
   .comment-rely .footer-area .input-area {
	   width: 550upx;
	   height: 60upx;
	   border-radius: 27upx;
	   background: #EEEEEE;
   }
    .comment-rely .footer-area .text {
		color: #FC4E51;
		font-size: 28upx;
	}
</style>
