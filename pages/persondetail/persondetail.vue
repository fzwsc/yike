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
						<scroll-view scroll-y class="scroll-view" @scrolltolower="lower">
							<view class="teacher-list">
								<view class="teacher-item" v-for="item in 30" :key="item">
									<view class="title">中共十九大重要通知</view>
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
								</view>
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
				isTeacher: true,
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
