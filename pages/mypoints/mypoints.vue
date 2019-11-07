<template>
	<view class="my-points">
		<view class="points-header">
			<view class="box-flex score">
				<image :src="userInfo.avatar" mode="" class="pic"></image>
				<!-- <view class="user-name">{{ userInfo.name }}</view> -->
			</view>
			<view class="box-flex score-num-flex">
				<text class="score-num">{{ userInfo.scoreTotal == null ? '0' : userInfo.scoreTotal }}</text>
				<!-- <view>积分</view> -->
			</view>
			<view class="box-flex-picker">
				<view @click="gotoScore()">
					积分规则
					<image class="score-img" src="../../static/jfen.png" mode="" ></image>
				</view>
				<!-- 	<view @click="showSinglePicker()">
					{{pickerText}}
				</view> -->
			</view>
		</view>

		<view class="infor">
			<view class="box-flex score">
				<view class="user-name">{{ userInfo.name }}</view>
			</view>
			<view class="box-flex score-num-flex"><view>积分</view></view>
			<view class="box-flex-picker box-flex-picker-picker" @click="showSinglePicker()">
				<view class="picker-text">{{ pickerText }} <image class="down-ico" src="../../static/shanglaa.png" mode=""></image></view>
			</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:showPicker="showPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>

		<view class="points-container">
			<view class="points-item" v-for="(item, index) in list" :key="index">
				<view class="answer">{{ item.content }}</view>
				<view class="points-state">
					<view class="time">{{ item.createtime }}</view>
					<view class="add-score">+{{ item.score }}</view>
				</view>
			</view>
			<view class="empty-data" v-if="list.length <= 0">
				<image src="../../static/noData.png" mode="" class="pic"></image>
				<view class="text">暂无数据~</view>
			</view>
			<view :hidden="hidden"><uni-load-more status="loading"></uni-load-more></view>
		</view>
	</view>
</template>

<script>
import mpvuePicker from '"../../components/mpvue-picker/mpvuePicker.vue';
export default {
	data() {
		return {
			list: [],
			userInfo: {},
			hidden: true,
			hasmore: true,
			curpage: 1,
			pagesize: 11,
			token: uni.getStorageSync('token'),
			SemesterArray: [],
			dataItem: [],
			SemesterId: '',
			indexNum: 0,

			themeColor: '#F74C44',
			pickerText: '请选择',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			showPicker: false,
			optionList: []
		};
	},
	onLoad() {
		this.getScoreList();
		this.getSemester();
	},
	methods: {
		showSinglePicker() {
			this.pickerValueArray = this.optionList;
			console.log();
			if (this.pickerValueArray.length == 0) {
				return;
			}
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.showPicker = !this.showPicker;
		},
		onConfirm(e) {
			this.pickerText = e.name;
			this.showPicker = !this.showPicker;
			this.SemesterId = e.id;
			this.getScoreList();
		},

		onCancel(e) {
			console.log(e);
			this.showPicker = false;
		},
		gotoScore() {
			uni.navigateTo({
				url: '../scorerule/scorerule'
			});
		},
		// 获取学期
		getSemester() {
			let data = {};
			data['token'] = this.token;
			this.yapi.getSemester(data).then(res => {
				if (res.datas.length > 0) {
					this.optionList = res.datas;
					// this.pickerText = res.datas[0].name;
					// this.SemesterArray = res.datas
				}
			});
		},
		getScoreList(onlyOne = false) {
			let data = {};
			data['token'] = this.token;
			data['curpage'] = this.curpage;
			data['pagesize'] = this.pagesize;
			data['term_id'] = this.SemesterId;
			this.hidden = true;
			this.api
				.scoreList(data, onlyOne)
				.then(res => {
					this.userInfo = res.datas.data.user_info;
					if (this.curpage == 1) this.list = [];
					this.list = [...this.list, ...res.datas.data.scorelist];
					this.hasmore = res.datas.has_more;
					this.curpage++;
				})
				.catch(err => {});
		}
	},
	onReachBottom() {
		if (this.hasmore) this.hidden = false;
		else {
			this.hidden = true;
			return;
		}
		this.getScoreList(true);
	},
	components: {
		// uniLoadMore,
		mpvuePicker
	}
};
</script>

<style>
	.down-ico{
		width: 10upx;
		height: 5upx;
		vertical-align: middle;
	}
.box-flex-picker-picker {
	position: relative;
}
.picker-text {
	font-size: 22upx;
	position: absolute;
	right: 10rpx;
	top: 50%;
	transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	-o-transform: translateY(-50%);
}
.down-ico {
	width: 16upx;
	height: 9upx;
	vertical-align: middle;
}
.box-flex {
	flex: 1;
	text-align: center;
	align-items: center;
}
.box-flex-picker {
	flex: 1;
	text-align: right;
}
.chose-semster {
	font-size: 24upx;
}
.score-num-flex {
	text-align: center;
}
.score-num {
	font-size: 100upx;
	text-align: center;
}

.score-img {
	width: 30upx;
	height: 33upx;
	vertical-align: middle;
	padding-left: 10upx;
}
.my-points .points-header {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	padding: 10upx 22upx 20upx 10upx;
	color: #fff;
	box-sizing: border-box;
	background: #f74c44;
}
.infor {
	position: fixed;
	top: 150rpx;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	color: #fff;
	box-sizing: border-box;
	background: #0000000000;
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
.my-points .points-header .score image {
	width: 100upx;
	height: 100rpx;
	border-radius: 100%;
}
.my-points .points-header .score .score-num {
	font-size: 206upx;
	font-weight: bold;
	margin-right: 3upx;
}
.my-points .points-container {
	margin-top: 210upx;
}
.my-points .points-container .points-item {
	padding: 36upx 33upx 16upx;
	border: 1px solid #eeeeee;
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
