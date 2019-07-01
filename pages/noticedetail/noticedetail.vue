<template>
	<view class="notice-detail">
		<view class="notice-item" v-for="(item, index) in list" :key="index">
			<image :src="item.avatar" mode="" :class="[{ pic: true, 'pic-active': item.status == 1 }]"></image>
			<view class="notice-con" v-if="item.type == 1">
				<view class="title">{{ item.radio_title }}</view>
				<navigator :url="'../yundetails/yundetails?id=' + item.radio_id" class="link" hover-class="none">{{ item.radio_title }}</navigator>
			</view>
			<view v-if="item.type == 2">
				<view class="notice-con"  v-if="item.radio_status == 1">
					<view class="title">{{ item.radio_title }}</view>
					<view class="app-result" v-if="item.radio_status == 1">审批结果：已通过</view>
				</view>
				<view class="notice-con"  v-if="item.radio_status == 3">
					<view class="title">{{ item.radio_title }}</view>
					<view class="app-result" v-if="item.radio_status == 3">审批结果：不通过</view>
				</view>
				<view class=""  v-if="item.radio_status == 0">
					<view class="notice-con">
						<view>我上传了一个云广播</view>
						<navigator :url="'../yundetails/yundetails?id=' + item.radio_id" class="link" hover-class="none">{{ item.radio_title }}</navigator>
					</view>
					<view class="message-control">
						云广播审批:
						<view class="adopt" @click="adopt(item,1)">通过</view>
						<view class="refuse" @click="refuse(item,2)">拒绝</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-data" v-if="list.length <= 0">
			<image src="../../static/noData.png" mode="" class="pic"></image>
			<view class="text">暂无数据~</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	data() {
		return {
			token: uni.getStorageSync('token'),
			hidden: true,
			hasmore: true,
			curpage: 1,
			pagesize: 10,
			list: [],
			id: '',
			
		};
	},
	onLoad(option) {
		this.id = option.id;
		uni.setNavigationBarTitle({
			title: option.name
		});
		this.getMessageList();
	},
	methods: {
		adopt(item,status){  //云广播id  审核状态1成功2不成功
		let _this = this
            console.log("audit_status"+status);
			uni.showModal({
				title:'提示',
				content:"确定通过该条云广播么?",
				success(res) {
					if(res.confirm){
						_this.audioExamine(item,status)		
					}else{
						
					}
				
				}
			})
		},
		refuse(item,status){
			let _this = this
				uni.showModal({
				title:'提示',
				content:"确定拒绝该条云广播么?",
				success(res) {
					if(res.confirm){
						_this.audioExamine(item,status)		
					}else{
						
					}
				
				}
			})
			
		},
		// 审核云广播
		audioExamine(item,status){
			let data = {};
			data['radio_id'] = item.radio_id;
			data['audit_status'] = status;
			data['token'] = this.token;
			this.yapi.audioExamineurl(data).then(res=>{
				if(status==1){
					uni.showToast({
						title: '审核通过',
						icon: 'none'
					});
					
				}
				if(status==2){
						uni.showToast({
						title: '审核不通过',
						icon: 'none'
					});
				}
	               this.list=[]
					this.getMessageList();
				// item.audit_status = status
			}).catch(err=>{
				
			})
		},
		getMessageList(onlyOne = false) {
			let data = {};
			data['origin_user_id'] = this.id;
			data['token'] = this.token;
			data['curpage'] = this.curpage;
			data['pagesize'] = this.pagesize;
			this.hidden = true;
			this.api
				.messageList(data, onlyOne)
				.then(res => {
					if (this.curpage == 1) this.list = [];
					this.list =  [...this.list, ...res.datas.data];
					this.hasmore = res.datas.has_more;
					this.curpage++;
				})
				.catch(err => {});
		}
	},
	onReachBottom() {
		if (this.hasmore) this.hidden = false;
		else {
			this.hidden = true;
			return;
		}
		this.getMessageList(true);
	},
	components: {
		uniLoadMore
	}
};
</script>

<style>
.notice-detail {
}
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
	background: #ffffff;
	border-radius: 5px;
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
	border-color: #f2f2f2 #ffffff #f2f2f2 #f2f2f2;
}
.notice-con .notice-item .title {
	color: #333333;
	font-size: 30upx;
}
.notice-con .app-result {
	color: #999999;
}
.notice-detail .notice-item .link {
	margin-top: 57upx;
	font-size: 30upx;
	color: #5c82a8;
	text-decoration: underline;
}
.notice-item {
	position: relative;
}
.notice-item .pic-active::after {
	position: absolute;
	width: 10upx;
	height: 10upx;
	background: #f74c44;
	border-radius: 50%;
	content: '';
	top: 40upx;
	left: 40upx;
}
.message-control {
	display: flex;
	font-size: 24upx;
	align-items: center;
	color: #666666;
	margin-top: 30upx;
}
.message-control .adopt {
	background: #16cb15;
	color: #ffffff;
	margin: 0 25upx;
	padding: 3upx 35upx;
	border-radius: 10upx;
}
.message-control .refuse {
	background: ##999999;
	border: 1upx solid rgba(153, 153, 153, 1);
	padding: 3upx 35upx;
	border-radius: 10upx;
}
</style>
