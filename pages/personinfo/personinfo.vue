<template>
	<view class="person-info">
		<view class="info-list">
			<view class="info-item">
				<view class="text">头像：</view>
			    <image :src="info.avatar" mode="" class="pic"></image>
			</view>
			<view class="info-item">
				<view class="text">用户名：</view>
			    <view class="response">{{info.realname}}</view>
			</view>
			<view class="info-item">
				<view class="text">性别：</view>
			   <view class="response">{{info.gender == 0 ? '男' : '女'}}</view>
			</view>
			<view class="info-item" v-if="info.birthday">
				<view class="text">出生日期：</view>
			     <view class="response">{{info.birthday}}</view>
			</view>
			<view class="info-item">
				<view class="text">学校：</view>
			    <view class="response">{{info.schoolname}}</view>
			</view>
			
			<template v-if="isTeacher">
				<view class="info-item">
					<view class="text">组织(学院/行政部门)：</view>
				    <view class="response">{{info.collegename}}</view>
				</view>
				
			</template>
			<template v-if="!isTeacher">
<!-- 				<view class="info-item" v-if="info.college">
					<view class="text">学院：</view>
				    <view class="response">{{info.college}}</view>
				</view> -->
				<view class="info-item" v-if="info.collegename">
					<view class="text">组织(学院)：</view>
				    <view class="response">{{info.collegename}}</view>
				</view>
				<view class="info-item" v-if="info.profession">
					<view class="text">专业：</view>
				    <view class="response">{{info.profession}}</view>
				</view>
				<view class="info-item">
					<view class="text">年级：</view>
				    <view class="response">{{info.enteryear}}</view>
				</view>
				<view class="info-item" v-if="info.classname">
					<view class="text">班级：</view>
				    <view class="response">{{info.classname}}</view>
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
			   info: {},
			   token: uni.getStorageSync('token')
			}
		},
		onLoad(option) {
			let role = option.role - 0;
			if (role == 1) {
				this.isTeacher = false
				this.studentInfo()
			}else {
				this.isTeacher = true
				this.teacherInfo()
			} 
		},
		methods: {
			studentInfo() {
				let data = {};
				data['token'] = this.token
				this.api.studentInfo(data).then(res => {
					this.info = res.datas;
				})
			},
			teacherInfo() {
				let data = {};
				data['token'] = this.token
				this.api.teacherInfo(data).then(res => {
					this.info = res.datas;
				})
				
			}
		},
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
