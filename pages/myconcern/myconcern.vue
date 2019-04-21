<template>
	<view class="my-concern">
		<view class="concern-header">
			<view class="concern-header-item" :class="{active: active == 0}" @click="tab(0)">已关注</view>
			<view class="concern-header-item" :class="{active: active == 1}" @click="tab(1)">推荐</view>
		</view>
		<view class="concern-list">
			<view class="set-space">
				<view class="concern-item" v-for="(item,index) in list" :key="index">
					<navigator url="../persondetail/persondetail" class="concern-l" hover-class="none">
						<view class="info-area">
							<image :src="item.avatar" mode="" class="pic"></image>
							<view class="user-name">{{item.realname}}</view>
						</view>
						<view class="faculty">
							院系： {{item.collegename}}
						</view>
					</navigator>
					<view class="concern-r">
						<view class="already-concern" v-if="item.status == 1" @tap="dealConcern(item,index)">已关注</view>
						<view class="already-concern red" v-else  @tap='dealConcern(item,index)'>+关注</view>
						<!-- <view class="course">教授课程：毛概</view> -->
					</view>
				</view>
				
				  <view :hidden="hidden">
					<uni-load-more status="loading"></uni-load-more>
				</view>
			</view>
			<view class="empty-data" v-if="list.length <= 0">
				<image src="../../static/noData.png" mode="" class="pic"></image>
				<view class="text">暂无数据~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				active: 0,
				list: [],
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 10,
				token: uni.getStorageSync("token")
			};
		},
		onLoad() {
			this.getAttentionList();
		},
		methods: {
			tab(type) {
				this.active = type
				this.curpage = 1
				if (this.active) {
					this.getRecommendList()
				} else{
					this.getAttentionList()
				}
				
			},
			getAttentionList() {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.attentionList(data).then(res => {
					 if (this.curpage == 1) this.list = []
					 this.list = [...this.list,...res.datas.data]
					 this.hasmore = res.datas.has_more
					 this.curpage++
					 
				}).catch(err => {
					
				})
			},
			getRecommendList() {
				let data = {};
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.recommendList(data).then(res => {
					 if (this.curpage == 1) this.list = []
					 this.list = [...this.list,...res.datas.data]
					 this.hasmore = res.datas.has_more
					 this.curpage++
				}).catch(err => {
					
				})
			},
			onReachBottom() {
				if(this.hasmore) this.hidden = false
				else{
					this.hidden = true
					return;
				}
				if (this.active) {
					this.getRecommendList()
				} else{
					this.getAttentionList()
				}
				
			},
			dealConcern(item,index) {
				let data = {},status
				data['token'] = this.token
			    data['user_id'] = item.be_user_id
				if (item.status == 1) status = 2
				else status = 1
				data['attention_status'] = status
				this.api.addAttention(data).then(res => {
					if (item.status == 1) item.status = 2
					else item.status = 1
				})
			}
			
		},
		components: {
			uniLoadMore
		},
		
	}
</script>

<style>
	.my-concern .concern-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		display: flex;
		background: #FFFFFF;
	}
	.my-concern .concern-header .concern-header-item {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 66upx;
		font-size: 32upx;
	}
	.my-concern .concern-header .concern-header-item.active {
		color: #F74C44;
	}
	.my-concern .concern-header .concern-header-item.active:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 170upx;
		right: 170upx;
		height: 3px;
		background: #F74C44;
	}
	.my-concern .set-space {
		padding: 0 30upx;
		margin-top: 86upx;
		 background: #fff;
	}
  .my-concern .concern-list .concern-item {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 20upx 0;
	  border-bottom: 1px solid #EEEEEE;
  }
  .my-concern .concern-list .concern-item .concern-l {
	  flex: 1;
  }
    .my-concern .concern-list .concern-l .info-area {
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #333333;
	}
	 .my-concern .concern-list .info-area .pic{
		 display: block;
		 width: 62upx;
		 height: 62upx;
		 margin-right: 21upx;
		  border-radius: 50%;
		 overflow: hidden;
	 }
	 .my-concern .concern-list .faculty {
		 font-size: 22upx;
		 color: #999999;
	 } 
  .my-concern .concern-list .concern-item .concern-r {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-end;
  }
   .my-concern .concern-list .concern-r .already-concern {
	   display: flex;
	   justify-content: center;
	   align-items: center;
	   width: 110upx;
	   height: 50upx;
	   margin-bottom: 16upx;
	   border: 1px solid #CCCCCC;
	   font-size: 24upx;
	   color: #666666;
	   border-radius: 10upx;
   }
   .my-concern .concern-list .concern-r .already-concern.red {
	   border: 1px solid #F74C44;
	   color: #F74C44;
   }
   .my-concern .concern-list .concern-r .course {
	   font-size: 22upx;
	   color: #999999;
   }
</style>
