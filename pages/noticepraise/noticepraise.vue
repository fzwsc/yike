<template>
	<view class="notice-praise">
		<view class="notice-praise-item">
			<view class="notice-header">
				<image src="http://app.fjtogo.com/kjwwap/kjw/kjw.png" mode="" class="pic"></image>
				<view class="user-info">
					<view class="user-name">林小雅</view>
					<view class="time">04-02 16>:00</view>
				</view>
			</view>
			<view class="notice-rely">
				<image src="../../static/dianzanle.png" mode="" class="pic"></image>了这条评论
			</view>
			<view class="notice-con">
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
	.notice-praise .notice-praise-item {
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		background: #fff;
	}

	.notice-praise .notice-header {
		display: flex;
	}

	.notice-praise .notice-header .pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 13upx;
		overflow: hidden;
	}

	.notice-praise .notice-header .user-name {
		color: #333333;
		font-size: 28upx;
	}

	.notice-praise .notice-header .time {
		margin-top: 7upx;
		color: #666666;
		font-size: 20upx;
	}

	.notice-praise .notice-rely {
		display: flex;
		align-items: center;
		margin: 23upx 0 17upx;
	}

	.notice-praise .notice-rely .pic {
		width: 32upx;
		height: 27upx;
		margin: 0 10upx;
	}

	.notice-praise .comments-item {
		padding: 31upx 31upx 30upx 30upx;
		margin-bottom: 20upx;
		background: #F7F7F7;
	}

	.notice-praise .comments-item .user-info {
		display: flex;
	}

	.notice-praise .comments-item .user-info .pic {
		display: block;
		width: 100upx;
		height: 100upx;
		margin-right: 10upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.notice-praise .comments-item .user-info .user-name {
		color: #333333;
		font-size: 28upx;
	}

	.notice-praise .comments-item .user-info .content {
		margin-top: 10upx;
		font-size: 30upx;
	}

	.notice-praise .comments-item .user-state {
		display: flex;
		margin-top: 30upx;
	}

	.notice-praise .comments-item .user-state .play-num {
		display: flex;
		align-items: center;

	}

	.notice-praise .comments-item .user-state .text {
		font-size: 20upx;
		color: #666666;
	}

	.notice-praise .comments-item .user-state .timer {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 52upx;
	}

	.notice-praise .comments-item .user-state .time {
		font-size: 20upx;
		color: #666666;
	}

	.notice-praise .comments-item .user-state .pic {
		display: block;
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
	}
</style>
