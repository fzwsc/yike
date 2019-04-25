<template>
    <view>
		<view>
				<cmd-progress :width="180" :stroke-color="color" type="circle" :time='time' :percent="percent"></cmd-progress>
		</view>
        <button @tap="startRecord">开始录音</button>
        <button @tap="endRecord">停止录音</button>
        <button @tap="playVoice">播放录音</button>
		<button @tap="up"type="primary">上传</button>
    </view>
</template>

<script>
	import cmdProgress  from '../../components/cmd-progress/cmd-progress.vue'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;

export default {
    data(){
		
		return{
			voicePath: ''
		}
        
    },
    onLoad() {
        let self = this;
        recorderManager.onStop(function (res) {
            console.log('recorder stop' + JSON.stringify(res));
            self.voicePath = res.tempFilePath;
        });
    },
    methods: {
        startRecord() {
            console.log('开始录音');

            recorderManager.start();
        },
        endRecord() {
            console.log('录音结束');
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

	}
	,components:{
		cmdProgress
	}
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
