<template>
	<view class="my-concern">
		<view class="concern-list">
			<view class="title">
				<view class="radius"></view>已关注
			</view>
			<view class="set-space">
				<view class="concern-item">
					<view class="concern-l">
						<view class="info-area">
							<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
							<view class="user-name">林小雅</view>
						</view>
						<view class="faculty">
							院系： 马格思主义院系
						</view>
					</view>
					<view class="concern-r">
						<view class="already-concern">已关注</view>
						<view class="course">教授课程：毛概</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐列表 -->
		<view class="concern-list">
			<view class="title">
				<view class="radius"></view>推荐
			</view>
			<view class="set-space">
				<view class="concern-item">
					<view class="concern-l">
							<view class="info-area">
								<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
								<view class="user-name">林小雅</view>
							</view>
							<view class="faculty">
								院系： 马格思主义院系
							</view>
						</view>
						<view class="concern-r">
							<view class="already-concern red">+关注</view>
							<view class="course">教授课程：毛概</view>
						</view>
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
	.my-concern .set-space {
		padding: 0 30upx;
		 background: #fff;
	}
  .my-concern .concern-list .title {
	  display: flex;
	  align-items: center;
	  padding-left: 30upx;
	  border-bottom: 1px solid #EEEEEE;
	  background: #fff;
	  font-size: 28upx;
  }
   .my-concern .concern-list .title .radius {
	   width: 10upx;
	   height: 10upx;
	   margin-right: 8upx;
	   border-radius: 50%;
	   background: #F74C44 ;
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
