<template>
    <view>
		<pro :radius="radius" :percent="percent">
            <div class="dao-text">
              <!-- <p>{{endT|formatSeconds}}</p> -->
            </div>
          </pro>
        <button @tap="startRecord">开始录音</button>
        <button @tap="endRecord">停止录音</button>
        <button @tap="playVoice">播放录音</button>
        <button @tap="up">上传</button>
    </view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
// import pro from '../../components/pro/pro.vue'

export default {
    data() {
		return{
			 text: 'uni-app',
			voicePath: '',
			file:'',
			token:uni.getStorageSync('token'),
			tip:1,
			radius: "3.94rem",
		}
       
    },
    onLoad(option) {
        let self = this;
		console.log("第几次上传------->"+self.tip)
		if(option.tip==2){
			self.tip = 2
			
		}
        recorderManager.onStop(function (res) {
            console.log('recorder stop' + JSON.stringify(res));
			console.log(res)
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
				   	 uni.reLaunch({
					// url: '../soundSavue/soundSavue?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/?id=8888'),
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/cataudio.html?id=8888'),
				   	url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/iospage?token='+_this.token)
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/?token='+_this.token+'&userid='+_this.userid)
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://xiangyuecn.github.io/Recorder/')
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://www.weixinsxy.com/jssdk/')
					// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/Demo.html')
				});
				  console.log(res)
				// do something
			  }
			})
		}
    }, 
	computed: {
    percent() {
      return Math.min(1, this.endT / this.startT);
    }
  },
	// components:{
 //       pro
	// }
}
</script>

<style>

</style>
