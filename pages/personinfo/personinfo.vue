<template>
	<view class="person-info">
		<view class="info-list">
			<view class="info-item">
				<view class="text">头像：</view>
			    <image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
			</view>
			<view class="info-item">
				<view class="text">用户名：</view>
			    <view class="response">蔡</view>
			</view>
			<view class="info-item">
				<view class="text">性别：</view>
			   <view class="response">男</view>
			</view>
			<view class="info-item">
				<view class="text">出生日期：</view>
			     <view class="response">1989/10/19</view>
			</view>
			<view class="info-item">
				<view class="text">学校：</view>
			    <view class="response">南昌大学</view>
			</view>
			<view class="info-item">
				<view class="text">学院：</view>
			    <view class="response">马克思主义学院</view>
			</view>
			<view class="info-item" v-if="isTeacher">
				<view class="text">部门：</view>
			     <view class="response">行政部</view>
			</view>
			<template v-if="!isTeacher">
				<view class="info-item">
					<view class="text">院系：</view>
				    <view class="response">思政系</view>
				</view>
				<view class="info-item">
					<view class="text">专业：</view>
				    <view class="response">马格思主义原理</view>
				</view>
				<view class="info-item">
					<view class="text">年级：</view>
				    <view class="response">2017级</view>
				</view>
				<view class="info-item">
					<view class="text">班级：</view>
				    <view class="response">一班</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   isTeacher: false	
			}
		}
	}
</script>

<style>
  .person-info .info-list {
	   padding: 0 30upx;
	    background: #fff;
  }
  .person-info .info-list .info-item {
	  display: flex;
	  align-items: center;
	  padding: 29upx 0;
	   font-size: 30upx;
	  border-bottom: 1px solid #EEEEEE;
	 
  }
  .person-info .info-list .info-item .text {
	  margin-right: 23upx;
	  color: #999999;
  }
   .person-info .info-list .info-item .pic {
	   display: block;
	   width: 62upx;
	   height: 62upx;
	   border-radius: 50%;
	   overflow: hidden;
   }
</style>
