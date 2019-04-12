<template>
	<view class="person-detail">
		<view class="detail-header">
		  <image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
		  <view class="flex">
			  <view class="info">
			  	<view class="name">林小雅</view>
			  	<view class="concern">454人关注</view>
			  </view>
			  <view class="already-concern">
				  +关注
			  </view>
		  </view>
		</view>
		<view class="detail-container">
			<template v-if="isTeacher">
				<view class="tab-list">
					<view class="tab-item" :class="{active: active == 0}" @click="tab(0)">
						<text class="text">简介</text>
					</view>
					<view class="tab-item" :class="{active: active == 1}" @click="tab(1)">
						<text class="text">动态</text>
					</view>
				</view>
				<view class="tab-con">
				   <template v-if="!active">
				   	<view class="scholl-list">
				   		<view class="scholl-item">
				   			学校：南昌大学
				   		</view>
				   		<view class="scholl-item">
				   			学院：马克思主义学院
				   		</view>
				   		<view class="scholl-item">
				   			部门：行政部
				   		</view>
				   	</view>
				   </template>
					<template v-else>
						<scroll-view scroll-y class="scroll-view"  @scrolltolower="lower">
							<view class="" v-for="(item,index) in 30" :key="index">
								text
							</view>
						</scroll-view>
					</template>
				</view>
			</template>
			<template v-else>
				<view class="scholl-list">
					<view class="scholl-item">
						学校：南昌大学
					</view>
					<view class="scholl-item">
						学院：马克思主义学院
					</view>
					<view class="scholl-item">
						院系：西政吸
					</view>
					<view class="scholl-item">
						专业：软件学校
					</view>
					<view class="scholl-item">
						年级：2017级
					</view>
					<view class="scholl-item">
						班级：一班
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isTeacher: false,
				active: 0
		   };
		},
		methods: {
			tab(type) {
				this.active = type
			},
			lower(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
  page{
	  
  }
  .person-detail {
	  display: flex;
	  flex-direction: column;
	  height: 100vh;
	  overflow: hidden;
	  -webkit-overflow-scrolling: touch;
  }
  .person-detail .detail-header {
	  height: 122upx;
	  flex: 0 0 122upx;
	  display: flex;
	  align-items: center;
	  padding: 0 50upx 0 53upx;
	  color: #fff;
	  background: #F74C44;
  }
  .person-detail .detail-header .pic {
	  display: block;
	  width: 100upx;
	  height: 100upx;
	  margin-right: 24upx;
  }
  .person-detail .detail-header .flex {
	  flex: 1;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
   .person-detail .detail-header .name {
	   font-size: 30upx;
   }
   .person-detail .detail-header .concern {
	   font-size: 20upx;
   }
   .person-detail .detail-header .already-concern {
	   display: flex;
	   justify-content: center;
	   align-items: center;
	   width: 110upx;
	   height: 50upx;
	   font-size: 24upx;
	   border-radius: 10upx;
	   border: 1px solid #fff;
   }
   .person-detail .detail-container {
	   background: #FFFFFF;
   }
   .person-detail .detail-container .tab-list {
	   display: flex;
	   border: 1px solid #CCCCCC;
   }
   .person-detail .detail-container .tab-list .tab-item {
	   position: relative;
	   flex: 1;
	   display: flex;
	   justify-content: center;
	   align-items: center;
	   height: 66upx;
	   font-size: 30upx;
   }
    .person-detail .detail-container .tab-list .tab-item.active {
		color: #F74C44;
		font-weight: bold;
	}
	.person-detail .detail-container .tab-item.active:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 170upx;
		right: 170upx;
		height: 2px;
		background: #F74C44 ;
	}
	   .person-detail .detail-container .scroll-view {
	  		  height: calc(100vh - 122upx - 66rpx);
	  		 flex: 1;
             overflow: hidden;
             -webkit-overflow-scrolling: touch;
	  		  
	  }
	  .person-detail .detail-container .scholl-list {
		  padding: 0 0 40upx 31upx;
	  }
	   .person-detail .detail-container .scholl-item {
		   margin-top: 20upx;
		   font-size: 28upx;
		   color: #333333;
	   }
</style>
