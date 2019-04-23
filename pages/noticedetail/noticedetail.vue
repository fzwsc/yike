<template>
	<view class="notice-detail">
		<view class="notice-item" v-for="(item,index) in list" :key="index">
			<image :src="item.avatar" mode="" class="pic"></image>
			<view class="notice-con">
				<view class="title">我发表了一个动态</view>
				<navigator :url="'../yundetails/yundetails?id='+item.radio_id" class="link" hover-class="none">{{item.radio_title}}</navigator>
			</view>
		</view>
		<view class="empty-data" v-if="list.length <= 0">
			<image src="../../static/noData.png" mode="" class="pic"></image>
			<view class="text">暂无数据~</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				token: uni.getStorageSync("token"),
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 10,
				list: [],
				id: ''
			};
		},
		onLoad(option) {
			this.id = option.id
			uni.setNavigationBarTitle({
				title: option.name
			});
			this.getMessageList()
		},
		methods: {
			getMessageList(onlyOne = false) {
			    let data = {};
				data['origin_user_id'] = this.id;
				data["token"] = this.token;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.hidden = true;
				this.api.messageList(data,onlyOne).then(res => {
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
			this.getMessageList(true)
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
   .notice-detail {}
   .notice-detail .notice-item {
	   display: flex;
	   padding: 33upx 130upx 20upx 34upx;
   }
   .notice-detail .notice-item .pic {
	   display: block;
	   width: 100upx;
	   height: 100upx;
	   margin-right: 21upx;
	    border-radius: 50%;
	   overflow: hidden;
   }
   .notice-detail .notice-item .notice-con {
	   position: relative;
	   width: 454upx;
	   padding: 30upx 0 30upx 26upx;
	   background: #FFFFFF;
	   border-radius:5px;
	   
   }
    .notice-detail .notice-item .notice-con:after {
		content: '';
		position: absolute;
		top: 40upx;
		left: -24upx;
		width: 0;
		height: 0;
		border-width: 15rpx;
		border-style: solid;
		border-color: #F2F2F2 #FFFFFF #F2F2F2 #F2F2F2;
	}
	.notice-con .notice-item .title {
		color: #333333;
		font-size: 30upx;
	}
   .notice-detail .notice-item .link {
	   margin-top: 57upx;
	   font-size: 30upx;
	   color: #5C82A8;
	   text-decoration: underline;
   }
</style>
