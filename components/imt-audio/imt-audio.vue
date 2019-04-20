<template>
	<view class="imt-audio">
		<view class="audio-wrapper">
			<slider class="audio-slider" :activeColor="color" block-size="16" backgroundColor="rgba(255,255,255,0.3)" :value="current" :max="duration" @changing="changing"
			 @change="change"></slider>
			 <view class="audio-num-line">
				 <view class="audio-number">{{currentTime}}</view>
				 <view class="audio-number">{{durationTime}}</view>
			 </view>
		</view>
		<view class="audio-control-wrapper" :style="{color:color}">
			<!-- <view class="audio-control audio-control-prev" v-if="control" :style="{borderColor:color}" @click="prev">&#xe61b;</view> -->
			<view class="audio-control audio-control-switch" :class="{audioLoading:loading}" :style="{borderColor:'rgba(255,255,255,0.3)'}" @click="operation">{{loading?'&#xe606;':(paused?'&#xe619;':'&#xe611;')}}</view>
			<!-- <view class="audio-control audio-control-next" v-if="control" :style="{borderColor:color}" @click="next">&#xe61b;</view> -->
		</view>
	</view>
</template>

<script>
	// const audio = uni.createInnerAudioContext(); //创建音频
	export default {
		data() {
			return {
				currentTime: '', //当前播放时间
				durationTime: '', //总时长
				current: '', //slider当前进度
				loading: false, //是否处于读取状态
				paused: true, //是否处于暂停状态
				seek: false,//是否处于拖动状态
				flag: true,
				audio: null
			}
		},
		props: {
			src: String, //音频链接
			autoplay: {
				type:Boolean,
				default:false
			}, //是否自动播放
			duration: Number, //总时长（单位：s）
			control: {
				type:Boolean,
				default:true
			}, //是否需要上一曲/下一曲按钮
			continue:Boolean,//播放完成后是否继续播放下一首，需定义@next事件
			isNext: {
				type: Boolean,
				default: false
			},
			color: {
				type:String,
				default:'#fff'
			} //主色调
		},
		methods: {
			//返回prev事件
			prev() {
				this.$emit('prev')
			},
			//返回next事件
			next() {
				this.$emit('next')
			},
			getaudio(audio) {
				this.$emit('getaudio',audio)
			},
			audioEnd(end) {
				this.$emit('end',end)
			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//播放/暂停操作
			operation() {
				if (this.audio.paused) {
					this.audio.play()
					this.loading = true
				} else {
					this.audio.pause()
				}
			},
			//完成拖动事件
			change(e) {
				if (this.flag) this.audio.seek(e.detail.value)
			},
			// 正在拖动事件
			changing(e) {
				console.log(this.isNext);
				if (!this.isNext) {
					if(this.current < e.detail.value) {
						this.flag = false;
						return;
					}
				}
				
				this.flag = true;
				this.seek = true
				this.current= e.detail.value
			}
		},
		created() {
			this.audio = uni.createInnerAudioContext();
			this.audio.src = this.src
			this.current = 0
			this.durationTime = this.format(this.duration)
			this.audio.obeyMuteSwitch = false
			this.audio.autoplay = this.autoplay
			this.getaudio(this.audio)
			//音频进度更新事件
			this.audio.onTimeUpdate(() => {
				if (!this.seek) {
					this.current = this.audio.currentTime
				}
			})
			//音频播放事件
			this.audio.onPlay(() => {
				this.paused = false
				this.loading = false
			})
			//音频暂停事件
			this.audio.onPause(() => {
				this.paused = true
			})
			//音频结束事件
			this.audio.onEnded(() => {
				console.log("endendend---",this.continue);
			
				if (this.continue) {
					this.next()
				} else {
				    this.audioEnd(true)
					this.paused = true
					this.current = 0
				}
			})
			//音频完成更改进度事件
			this.audio.onSeeked(() => {
				this.seek = false
			})
		},
		watch: {
			//监听音频地址更改
			src(e) {
				this.audio.src = e
				this.current = 0
				this.audio.play()
				this.loading = true
			},
			//监听总时长改变
			duration(e) {
				this.durationTime = this.format(e)
			},
			//监听当前进度改变
			current(e) {
				this.currentTime = this.format(e)
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_1104838_0tjidg07yrg.ttf') format('truetype');
	}

	.imt-audio {
		display: flex;
		align-items: center;
		padding: 0 53upx 20upx;
		/* background: #fff; */
		border-radius: 20upx;
	}

	.audio-wrapper {
		flex: 1;
		margin-right: 38upx;
	}
    .audio-wrapper .audio-num-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		margin-top: 13upx;
	}
	.audio-number {
		font-size: 24upx;
		line-height: 1;
		color: #fff;
	}

	.audio-slider {
		flex: 1;
		/* margin: 0 30upx; */
		margin:0 0 0 8upx;
	}

	.audio-control-wrapper {
		/* margin-top: 20upx; */
		font-family: "iconfont" !important;
	}

	.audio-control {
		font-size: 40upx;
		line-height: 1;
		border: 4upx solid;
		border-radius: 50%;
		padding: 10upx;
	}

	.audio-control-prev {
		transform: rotate(180deg);
	}

	.audio-control-switch {
		font-size: 60upx;
		/* margin: 0 40upx; */
	}

	.audioLoading {
		animation: loading 2s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes loading {
		to {
			transform: rotate(360deg);
		}
	}
</style>