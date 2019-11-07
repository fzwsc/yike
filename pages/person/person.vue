<template>
	<view class="person">
		<template v-if="!whiteScreen">
			<view class="set-space">
				<view class="my-info">
					<navigator :url="'../personinfo/personinfo?role='+userInfo.role_type" class="pic-con" hover-class="none">
						<image :src="userInfo.avatar" mode="" class="pic"></image>
					</navigator>
					<navigator :url="'../personinfo/personinfo?role='+userInfo.role_type" class="info-desc" hover-class="none">
						<view class="nickname">{{userInfo.realname}} <image :src="userInfo.gender == 0 ? '../../static/nan.png' : '../../static/nv.png'" mode="" class="sex"></image></view>
						<view class="scholl-name">
							{{userInfo.schoolname}}
						</view>
					</navigator>
					<navigator url="../myfans/myfans" class="btn-fans" hover-class="none" v-if="userInfo.role_type == 2">
						粉丝({{userInfo.total_fans_num > 99 ? '99+':userInfo.total_fans_num }})
					</navigator>
				</view>
			</view>
			<view class="follow-con" v-if="concernList.length > 0">
				<view class="text">我的关注</view>
				<view class="follow-area">
					<view class="follow-list">
						<navigator :url="'../persondetail/persondetail?role='+item.role_type+'&userId='+item.user_id" class="follow-item" hover-class="none" v-for="(item,index) in concernList" :key="index">
							<image :src="item.avatar" mode="" class="pic"></image>
							<view class="user-name">{{item.realname}}</view>
						</navigator>
					</view>
					<navigator url="../myconcern/myconcern" class="more" hover-class="none">更多</navigator>
				</view>
			</view>
			<view class="type-list">
				<navigator url="../mysubaudio/mysubaudio" class="type-item" hover-class="none" v-if="role==2">
					<image src="../../static/audio.png" mode="" class="pic"></image>
					<view class="text">我发布的云广播</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../mypoints/mypoints" class="type-item" hover-class="none">
					<image src="../../static/jife.png" mode="" class="pic"></image>
					<view class="text">我的积分</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../mypraise/mypraise" class="type-item" hover-class="none">
					<image src="../../static/dianzan.png" mode="" class="pic"></image>
					<view class="text">我的点赞</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../mycomments/mycomments" class="type-item" hover-class="none">
					<image src="../../static/my-pinglun.png" mode="" class="pic"></image>
					<view class="text">我的评论</view>
					<view class="arrow"></view>
				</navigator>
				<navigator url="../listen/listen" class="type-item" hover-class="none">
					<image src="../../static/shouting.png" mode="" class="pic"></image>
					<view class="text">最近收听</view>
					<view class="arrow"></view>
				</navigator>
		<!-- 		<view class="type-item">
					<image src="../../static/shezhi.png" mode="" class="pic"></image>
					<view class="text">设置</view>
					<view class="arrow"></view>
				</view> -->
				
				<navigator url="../setting/setting" class="type-item" hover-class="none">
					<image src="../../static/shezhi.png" mode="" class="pic"></image>
					<view class="text">设置</view>
					<view class="arrow"></view>
				</navigator>
			</view>
			
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				userInfo: {},
				concernList: [],
				whiteScreen: true,
				role:uni.getStorageSync('role')//1 学生 2老师
			}
		},
		onShow() {
			this.token = uni.getStorageSync("token");
			this.role = uni.getStorageSync('role');
			this.myInfo()
		},
		onLoad() {
			this.token = uni.getStorageSync("token");
			this.myInfo()
		},
		methods: {
			myInfo() {
				let data = {}
				data['token'] = this.token
// 				uni.showLoading({
// 					title: '加载中',
// 					mask: true
// 				});
				this.api.myInfo(data).then(res => {
					this.whiteScreen = false
					this.userInfo = res.datas.user
					this.concernList = res.datas.fans_list
				})
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
		overflow: hidden;
		border-radius: 50%;
	}

	.person .my-info .pic {
		display: block;
		width: 100%;
		height: 100%;
	}

	.person .my-info .info-desc {
		flex: 1;
	}

	.person .my-info .info-desc .nickname {
		display: flex;
		align-items: center;
		margin-bottom: 18upx;
		font-size: 32upx;
	}
	.person .my-info .info-desc .nickname .sex {
		width: 24upx;
		height: 24upx;
		margin-left: 9upx;
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
		margin-top: 17upx;
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
		text-align: center;
		
	}

	.person .follow-con .follow-item .pic {
		display: block;
		width: 70upx;
		height: 70upx;
		margin: 0 auto;
		border-radius: 50%;
		overflow: hidden;
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

	.person .type-list .type-item .text {
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
