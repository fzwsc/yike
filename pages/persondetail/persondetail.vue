<template>
	<view class="person-detail">
		<template v-if="!whiteScreen">
			<template v-if="isTeacher">
				<view class="detail-header">
					<image :src="teacher.avatar" mode="" class="pic"></image>
					<view class="flex">
						<view class="info">
							<view class="name">{{teacher.realname}}</view>
							<view class="concern">{{teacher.total_fans_num}}人关注</view>
						</view>
						<view class="already-concern" v-if="teacher.attention_status == 1" @click="dealConcern(teacher)">
							 已关注
						</view>
						<view class="already-concern" v-else @click="dealConcern(teacher)">
							 +关注
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="detail-header">
					<image :src="student.avatar" mode="" class="pic"></image>
					<view class="flex">
						<view class="info">
							<view class="name">{{student.realname}}</view>
							<view class="concern">{{student.total_fans_num}}人关注</view>
						</view>
						<view class="already-concern" v-if="student.attention_status == 1" @click="dealConcern(student)">
							 已关注
						</view>
						<view class="already-concern" v-else @click="dealConcern(student)">
							 +关注
						</view>
					</view>
				</view>
			</template>
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
									学校：{{teacher.schoolname}}
								</view>
								<view class="scholl-item">
									组织(学院/行政部门)：{{teacher.collegename}}
								</view>
							</view>
						</template>
						<template v-else>
							<scroll-view scroll-y class="scroll-view" @scrolltolower="lower">
								<view class="teacher-list">
									<view class="teacher-item" v-for="(item,index) in teacherList" :key="index">
										<view class="title">{{item.title}}</view>
										<view class="user-state">
											<view class="play-num">
												<image src="../../static/bf.png" mode="" class="pic"></image>
												<view class="text">{{item.title}}次</view>
											</view>
											<view class="timer">
												<image src="../../static/shijian.png" mode="" class="pic"></image>
												<view class="text">{{item.duration}}</view>
											</view>
											<view class="time">
												{{item.createtime}}
											</view>
										</view>
									</view>
									<view :hidden="hidden">
										<uni-load-more status="loading"></uni-load-more>
									</view>
								</view>
							</scroll-view>
						</template>
					</view>
				</template>
				<template v-else>
					<view class="scholl-list">
						<view class="scholl-item">
							学校：{{student.schoolname}}
						</view>
						<view class="scholl-item">
							组织(学院)：{{student.collegename}}
						</view>
						<view class="scholl-item">
							专业：{{student.profession}}
						</view>
						<view class="scholl-item">
							年级：{{student.enteryear}}
						</view>
						<view class="scholl-item">
							班级：{{student.classname}}
						</view>
					</view>
				</template>
			</view>
		</template>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				isTeacher: true,
				active: 0,
				userId: '',
				student: {},
				teacher: {},
				teacherList: [],
				hidden: true,
				hasmore: true,
				curpage: 1,
				pagesize: 10,
				user_id: '',
				token: uni.getStorageSync('token'),
				whiteScreen: true
			};
		},
		onLoad(option) {
			// console.log(option);
			let role = option.role - 0;
			this.user_id = option.userId
			if (role == 1){
			  this.isTeacher = false
			  this.studentInfo()
			}else{
				this.isTeacher = true
				this.teacherInfo()
			}
		},
		methods: {
			tab(type) {
				this.active = type
				this.curpage = 1
				if(! this.active) this.teacherInfo()
				else this.getTeacherDynamic()
			},
			lower(e) {
				if(this.hasmore) this.hidden = false
				else{
					this.hidden = true
					return;
				}
				this.getTeacherDynamic(true)
			},
			studentInfo() {
				let data = {};
				data['user_id'] = this.user_id
				data['token'] = this.token
				this.api.studentDetail(data).then(res => {
					this.whiteScreen = false
					this.student = res.datas;
				})
			},
			teacherInfo() { 
				let data = {};
				data['user_id'] = this.user_id
				data['token'] = this.token
				this.api.teacherDetail(data).then(res => {
					this.whiteScreen = false
					this.teacher = res.datas;
				})
				
			},
			getTeacherDynamic(onlyOne = false) {
				let data = {};
				data['token'] = this.token
				data['user_id'] = this.user_id;
				data['curpage'] = this.curpage;
				data['pagesize'] = this.pagesize
				this.api.teacherDynamic(data,onlyOne).then(res => {
					if (this.curpage == 1) this.teacherList = []
					this.teacherList = [...this.teacherList,...res.datas.data]
					this.hasmore = res.datas.has_more
					this.curpage++
				})
				
			},
			dealConcern(role) {
				let data = {},status
				data['token'] = this.token
				data['user_id'] = role.user_id
				if (role.attention_status == 1) status = 2
				else status = 1
				data['attention_status'] = status
				this.api.addAttention(data).then(res => {
					if (role.attention_status == 1) role.attention_status = 2
					else role.attention_status = 1
				})
			}
		},
		components: {
			uniLoadMore
		},
	}
</script>

<style>
	page {}

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
		border-radius: 50%;
		overflow: hidden;
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
		background: #F74C44;
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

	.person-detail .teacher-list {
		padding: 0 30upx;
	}

	.person-detail .teacher-list .teacher-item {
		padding: 32upx 0;
		border-bottom: 1px solid #EEEEEE;
	}

	.person-detail .teacher-item .title {
		color: #333333;
		font-size: 28upx;
	}

	.person-detail .teacher-item .user-state {
		display: flex;
		margin-top: 15upx;

	}

	.person-detail .teacher-item .user-state .play-num {
		display: flex;
		align-items: center;

	}

	.person-detail .teacher-item .user-state .text {
		font-size: 20upx;
		color: #666666;
	}

	.person-detail .teacher-item .user-state .timer {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 52upx;
	}

	.person-detail .teacher-item .user-state .time {
		font-size: 20upx;
		color: #666666;
	}

	.person-detail .teacher-item .user-state .pic {
		display: block;
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
	}
</style>
