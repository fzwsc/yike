<template>
	<view class="my-points">
		<view class="points-header">
			<view class="info">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="user-name">
					林小雅
				</view>
			</view>
			<view class="score">
				<text class="score-num">26</text> 积分
			</view>
		</view>
		<view class="points-container">
			<view class="points-item">
				<view class="answer">
					你正确回答了xx老师的问题
				</view>
				<view class="points-state">
					<view class="time">04-02 12:00</view>
					<view class="add-score">
						+5
					</view>
				</view>
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
  .my-points {}
  .my-points .points-header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 10upx 22upx 10upx 53upx;
	  color: #fff;
	  background: #F74C44;
  }
  .my-points .points-header .info {
	  display: flex;
	  align-items: center;
	  font-size: 30upx;
  }
  .my-points .points-header .info .pic {
	  display: block;
	  width: 100upx;
	  height: 100upx;
	  margin-right: 20upx;
	   border-radius: 50%;
	  overflow: hidden;
  }
  .my-points .points-header .score {
	  font-size: 24upx;
  }
  .my-points .points-header .score .score-num {
	  font-size: 36upx;
	  font-weight: bold;
	  margin-right: 3upx;
  }
  .my-points .points-container {
	  
  }
   .my-points .points-container .points-item {
	   padding: 36upx 33upx 16upx;
	   border: 1px solid #EEEEEE;
	   background: #fff;
   }
    .my-points .points-container .points-item .answer {
		font-size: 28upx;
		color: #333333;
	}
	.my-points .points-container .points-item .points-state {
		display: flex;
		justify-content: space-between;
	}
	 .my-points .points-container .points-item .time {
		 font-size: 24upx;
		 color: #666666;
	 }
	  .my-points .points-container .points-item .add-score {
		  font-size: 28upx;
		  color: #333333;
	  }
</style>
