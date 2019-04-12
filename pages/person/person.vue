<template>
	<view class="person">
		<view class="set-space">
			<view class="my-info">
				<navigator url="../personinfo/personinfo" class="pic-con" hover-class="none">
					<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				</navigator>
				<navigator url="../personinfo/personinfo" class="info-desc" hover-class="none">
					<view class="nickname">林小雅的专属</view>
					<view class="scholl-name">
					  南昌大学
					</view>
				</navigator>
				<view class="btn-fans">
					粉丝(99+)
				</view>
			</view>
		</view>
		<view class="follow-con">
			<view class="text">我的关注</view>
			<view class="follow-area">
				<view class="follow-list">
					<view class="follow-item">
						<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
						<view class="user-name">我的名字</view>
					</view>
				</view>
				<navigator url="../myconcern/myconcern" class="more" hover-class="none">更多</navigator>
			</view>
		</view>
	    <view class="type-list">
	    	<navigator url="../mypoints/mypoints" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的积分</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../mypraise/mypraise" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的点赞</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../mycomments/mycomments" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">我的评论</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../listen/listen" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">最近收听</view>
				<view class="arrow"></view>
			</navigator>
			<navigator url="../setting/setting" class="type-item" hover-class="none">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="text">设置</view>
				<view class="arrow"></view>
			</navigator>
	    </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
		}
	   }
	}
</script>

<style>
 .person {}
 .person .set-space {
	 padding: 0 30upx 0 40upx;
	  background: #fff;
 }
 .person .my-info {
	 display: flex;
	 align-items: center;
	 padding: 40upx 0 42upx 0;
	 border-bottom: 1px solid #EEEEEE;
	
 }
 .person .my-info .pic-con {
	 display: block;
	 width: 118upx;
	 height: 118upx;
	 margin-right: 31upx;
 }
.person .my-info .pic {
	display: block;
	 width: 100%;
	height: 100%;
}
.person .my-info .info-desc {
	flex: 1;
}
.person .my-info .info-desc .nickname{
	margin-bottom: 18upx;
	font-size: 32upx;
}
.person .my-info .info-desc .scholl-name {
	font-size: 24upx;
}
.person .my-info .btn-fans {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 166upx;
	height: 62upx;
	color: #fff;
	font-size: 23upx;
	border-radius: 31upx;
	background: #F74C44;
}
.person .follow-con {
	padding-top: 17upx;
	padding: 18upx 61upx 9upx 40upx;
	background: #fff;
}
.person .follow-con .follow-area {
	display: flex;
	align-items: center;
}
.person .follow-con .follow-list {
	flex: 1;
	display: flex;
	align-items: center;
}
.person .follow-con .follow-item {
	margin-right: 30upx;
}
.person .follow-con .follow-item .pic {
	display: block;
	width: 70upx;
	height: 70upx;
}
.person .follow-con .follow-item .user-name {
	margin-top: 7upx;
	font-size: 18upx;
}
.person .follow-con .follow-area .more {
	width: 54upx;
	font-size: 22upx;
}
.person .type-list {
	margin-top: 20upx;
	background: #fff;
	padding: 0 30upx;
}
.person .type-list .type-item {
	display: flex;
	align-items: center;
	padding: 22upx 0;
	border-bottom: 1px solid #EEEEEE;
}
.person .type-list .type-item .pic {
	display: block;
	width: 46upx;
	height: 46upx;
}
.person .type-list .type-item .text{
	flex: 1;
	font-size: 30upx;
	margin-left: 21upx;
}
.person .type-list .type-item .arrow {
	  width: 20upx;
	  height: 20upx;
	  border-top: 1px solid #C9C9C9;
	  border-right: 1px solid #C9C9C9;
	  transform: rotate(45deg);
}
</style>
