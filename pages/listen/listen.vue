<template>
	<view class="my-comments">
		<view class="comments-item">
			<view class="user-info">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="">
					<view class="user-name">林小雅</view>
					<view class="content">
						中共十九大重要通知
					</view>
				</view>
			</view>
			<view class="user-state">
				<view class="play-num">
					<image src="../../static/bf.png" mode="" class="pic"></image>
					<view class="text">2954次</view>
				</view>
				<view class="timer">
					<image src="../../static/shijian.png" mode="" class="pic"></image>
					<view class="text">4'20'</view>
				</view>
				<view class="time">
					04-02 12:00
				</view>
			</view>
			<view class="notice">
				收听时间：2019-04-02  12:00
			</view>
		</view>
		<view class="comments-item">
			<view class="user-info">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="">
					<view class="user-name">林小雅</view>
					<view class="content">
						中共十九大重要通知
					</view>
				</view>
			</view>
			<view class="user-state">
				<view class="play-num">
					<image src="../../static/bf.png" mode="" class="pic"></image>
					<view class="text">2954次</view>
				</view>
				<view class="timer">
					<image src="../../static/shijian.png" mode="" class="pic"></image>
					<view class="text">4'20'</view>
				</view>
				<view class="time">
					04-02 12:00
				</view>
			</view>
			<view class="notice">
				收听时间：2019-04-02  12:00
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
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
		  .my-comments .comments-item .notice .pic{
			 
		  }
</style>
