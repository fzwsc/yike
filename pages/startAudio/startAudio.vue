<template>
    <view>
			<view class="content">
		    
			<view class="circleprogress">
				<view class="progresstext">{{progresstext}}%</view>
				<view class="wrapper">
					<view class="leftprogress" :style="{ transform: leftprogress}"></view>
				</view>
				<view class="wrapper">
					<view class="rightprogress" :style="{ transform: rightprogress}"></view>
				</view>
			</view>
			<!-- <view class="section section_gap">
		        <text class="section__title">设置最小/最大值</text>
		        <view class="body-view">
		            <slider @changing="sliderchange" @change="sliderchange" min="0" max="1000"/>
		        </view>
		    </view> -->
		</view>
	<!-- 	<view class="yuan-box">
			<cmd-progress type="circle" :percent="time" :showInfo="false" class='yuan' :stroke-width="10" show-info="false"  stroke-color="#F74C44"></cmd-progress>
			<view class="">
				{{time}}
			</view>
		</view> -->
       <button @tap="startRecord">开始录音</button>
        <button @tap="endRecord">停止录音</button>
        <button @tap="playVoice">播放录音</button>
        <button @tap="up">试听</button>
    </view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;

import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"

export default {
    data() {
		return{
			 text: 'uni-app',
			voicePath: '',
			file:'',
			token:uni.getStorageSync('token'),
			tip:1,
			radius: "3.94rem",
			userid:'',
			time:0,
			more:600,
			timeDao:null,
			bb:0,
			leftprogress: 'rotate(-45deg)',
			rightprogress: 'rotate(45deg)',
			progresstext:'0',
			aa:0
		}
       
    },
    onLoad(option) {
        let self = this;
		
		console.log("第几次上传------->"+self.tip)
		self.userid =   uni.getStorageSync('userId') //option.userid
		if(option.tip==2){
			self.tip = 2
			
		}
        recorderManager.onStop(function (res) {
            console.log('recorder stop' + JSON.stringify(res));
			console.log(res)
            self.voicePath = res.tempFilePath;
			
        });
		// self.getTime()
		self.tran()
    },
    methods: {
		    tran(){
				let _this = this
				console.log(_this.aa)
					_this.aa = setInterval(function(){
							_this.aa++
							if(_this.aa > 100){
								clearInterval(_this.aa)
								return
							}
								console.log(_this.aa)
							 // _this.dao()
						},1000)
					},
			dao(){
				let _this = this
				console.log(_this.aa)
				_this.progresstext = _this.aa;
				var deg = _this.aa/100*360;
				if(deg<=180)
				{
					_this.rightprogress = 'rotate('+(45+deg)+'deg)'
					_this.leftprogress = 'rotate('+(-45)+'deg)'
				}else
				{
					_this.rightprogress = 'rotate('+(45+180)+'deg)'
					_this.leftprogress = 'rotate('+(-45+(deg-180))+'deg)'
				}
			},
		getTime(){
			let par = {}
			par.token = uni.getStorageSync('token');
			this.yapi.getDuration(par).then(res=>{
				if(res.code=200){
					this.time = res.datas;
				
					
				}
			}).catch(err=>{
				
			})
		},
        startRecord() {
            console.log('开始录音');
			this.percent()
			let _this = this
			_this.timeLod = setInterval(function(){
				if(_this.time==600){
					clearInterval(_this.timeLod)
					return
				}
				console.log(_this.time)
				_this.time++
			},1000)
            recorderManager.start();
        },
        endRecord() {
            console.log('录音结束');
			clearInterval(this.timeLod)
            recorderManager.stop();
        },
        playVoice() {
            console.log('播放录音');
            if (this.voicePath) {
                innerAudioContext.src = this.voicePath;
                innerAudioContext.play();
            }
        },
		up(){
			
			let _this = this
// 			const tempFilePaths = res.tempFilePaths
// 			console.log(res)
			console.log(_this.voicePath)
			wx.uploadFile({
			  url: 'https://ygb.yikevr.com/ygb/topic/audio_merge_ios', // 仅为示例，非真实的接口地址
			  filePath: _this.voicePath,
			  name: 'audio_file',
			  formData: {
				"token": _this.token,
				"first_status":_this.tip
			  },
			  success(res) {
				     uni.showToast({
				  	title:"complete",
				  })
				   	 uni.reLaunch({
					// url: '../soundSavue/soundSavue?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/?id=8888'),
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/cataudio.html?id=8888'),
				   	// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
				   	url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/?token='+_this.token+'&userid='+_this.userid)
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://xiangyuecn.github.io/Recorder/')
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://www.weixinsxy.com/jssdk/')
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/Demo.html')
				});
				  console.log(res)
				// do something
			  }
			  ,  
                fail:(res)=>{  
                      uni.showToast({
                    	title:"失败",
                    })
                },  
                complete:(res)=>{  
                    uni.showToast({
                   	title:"complete",
                   })
                }  
			})
		},
		percent() {
			this.time = Math.min(1, this.time / 600)
		  return this.time;
		}
    }, 
	computed: {
		
  },
    components: {cmdProgress}
}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.yuan-box{
		position: relative;
		height: 300upx;
		margin-top: 50upx;
	}
   .yuan{
	   position: absolute;
	   left: 50%;
	   transform: (-50%,-50%);
   }
   
   
   
   .content {
   	width: 100%;
   	height: 100%;
   	display: flex;
   	justify-content: center;
   	flex-flow: wrap;
   	align-items: center;
   	border-radius: 50%;
   	text-align: center;
   	height: 400upx;
   	padding-top: 50px;
   }
   .circleprogress{
   	width: 100%;
   	height: 200px;
   	display: flex;
   	justify-content: center;
   	
   }
   .circleprogress .progresstext{
   	position: absolute;
   	font-size: 40px;
   	width: 200px;
   	height: 200px; 
   	display: flex;
   	justify-content: center;
   	align-items: center;
   	z-index: 10;
   	color: #008000;
   }
   .circleprogress .wrapper{
   	width: 100px;
   	height: 200px;
   	overflow: hidden;
   }
   .circleprogress .leftprogress,.rightprogress{
   	width: 160px;
   	height: 160px;
   	border:20px solid rgba(238, 238, 238, 1);
   	border-bottom:20px solid #F74C44;
   	border-radius: 50%;
   	
   }
   .circleprogress .leftprogress{
   	border-right:20px solid #F74C44;
   }
   .circleprogress .rightprogress{
   	border-left:20px solid #F74C44;
   	margin-left: -100px;
   }
   .section{
   	width: 80%;
   	margin-top: 50px;
   }
   
</style>
