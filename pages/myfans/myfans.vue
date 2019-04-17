<template>
	<view class="my-fans">
	  <view class="fans-item">
	  	<navigator url="../persondetail/persondetail" class="fans-t" hover-class="none">
	  		<view class="info-area">
	  			<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
	  			<view class="user-info">
	  					<view class="user-name">林小雅</view>
	  					<view class="user-ide">
	  						学生
	  					</view>
	  				</view>
	  		</view>
	  			<!-- <view class="already-fans red">已关注</view> -->
	  		
	  	</navigator>
	  	<view class="fans-b">
	  		<view class="faculty">
	  			院系： 马格思主义院系
	  		</view>
	  		<view class="course">教授课程：毛概</view>
	  	</view>
	  </view>
	  <view class="fans-item">
	  	<navigator url="../persondetail/persondetail" class="fans-t" hover-class="none">
	  		<view class="info-area">
	  			<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
	  			<view class="user-info">
					<view class="user-name">林小雅</view>
					<view class="user-ide">
						学生
					</view>
				</view>
	  		</view>
			<view class="already-fans red">已关注</view>
	  		
	  	</navigator>
	  	<view class="fans-b">
	  		<view class="faculty">
	  			院系： 马格思主义院系
	  		</view>
	  		<view class="course">教授课程：毛概</view>
	  	</view>
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
				hidden: true
			};
		},
		onLoad() {
          this.fansList()
		},
		methods: {
			fansList() {
				let data = {};
				this.api.myfans(data).then(res => {
		             this.list = res.datas
				}).catch(err => {
					
				})
			}
		},
		onReachBottom() {
			
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style>
	.my-fans {
		padding: 0 30upx;
		 background: #fff;
	}
    .my-fans .fans-item {
   	  padding: 20upx 0;
   	  border-bottom: 1px solid #EEEEEE;
   }
   .my-fans .fans-item .fans-t {
   	  display: flex;
	  justify-content: space-between;
	  align-items: center;
   }
   .my-fans .user-ide {
	   font-size: 24upx;
	   color: #999999;
   }
     .my-fans .fans-t .info-area {
   		display: flex;
   		align-items: center;
   		font-size: 30upx;
   		color: #333333;
   	}
   	 .my-fans .info-area .pic{
   		 display: block;
   		 width: 62upx;
   		 height: 62upx;
   		 margin-right: 21upx;
		  border-radius: 50%;
		 overflow: hidden;
   	 }
   	 .my-fans .faculty {
   		 font-size: 22upx;
   		 color: #999999;
   	 } 
   .my-fans .fans-item .fans-b {
   	  display: flex;
   	  justify-content: space-between;
	  align-items: center;
   }
    .my-fans .already-fans {
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
    .my-fans .already-fans.red {
   	   border: 1px solid #F74C44;
   	   color: #F74C44;
    }
    .my-fans .course {
   	   font-size: 22upx;
   	   color: #999999;
    }
</style>
