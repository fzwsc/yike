<template>
    <view>
		<view class="timer-box">
		   <cmd-progress :width="180" :stroke-color="color" type="circle" :time='time' :percent="percent"></cmd-progress>
		</view>
		<view>
		    <view class="tip-text">录制时长范围：30秒至30分钟以内</view>
		</view>
		
		<view class="contr-box">
			<view class="start-box" v-if="isShow"  @tap="startRecord">
				<image class="img-log" src="../../static/luzhi.png" mode=""></image>
				<text class="text-colr">开始录制</text>
			</view>
			<view class="bt-gro" v-if="!isShow">
				<view class="bt-one" @tap="up">
					<image class="img-log" src="../../static/shiting.png" mode=""></image>
					<text  class="text-colr">试听</text>
				</view>
				<view class="bt-one play-class" @tap="pauseVoice" v-if="isPay">
					<image class="img-log" src="../../static/zanting.png" mode=""></image>
					<text  class="text-colr">暂停</text>
				</view>
				<view class="bt-one play-class" @tap="resumeVoice" v-if="!isPay">
					<image class="img-log" src="../../static/st.png" mode=""></image>
					<text  class="text-colr">继续录音</text>
				</view>
				<view class="bt-one" @tap="save">
					<image class="img-log" src="../../static/baocun.png" mode=""></image>
					<text  class="text-colr">保存</text>
				</view>
			</view>
		</view>
       <button @tap="startRecord">开始录音</button>
        <button @tap="endRecord">停止录音</button>
		<button @tap="pauseVoice">暂停录音</button>
		<button @tap="resumeVoice">继续录音</button>
        <button @tap="playVoice">播放录音</button>
		<button @tap="up" type="primary">上传</button>
    </view>
</template>

<script>
	import {API_URL} from '../../request/base.js'
	import cmdProgress  from '../../components/cmd-progress/cmd-progress.vue'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	 import {OSS} from "../../sdk/aliyun-oss-sdk.min.js"

export default {
    data(){
		return{
			voicePath: '',
			time: 0,
			maxTime: 600,  // 最大秒数
			percent: 0,
			timer: null,
			color: '#f5f5f5',
			isShow:true,
			isPay:true,
			token:uni.getStorageSync('token'),
			tipIos:1,
			agean:0, //继续录制的时间.记录上一次时间,
			
			accessid:'',
			policy:"",
			host:'',
			signature:'',
			expire:'',
			callback:'',
			dir:''
			
			
			
		}
        
    },
    onLoad(option) {
        let _this =this
		if(option.tip){
			_this.tipIos = option.tip
			console.log("不为空tip"+option.tip)
		}
		console.log(_this.tipIos+'-------')
		// 验证oss
		_this.getOssCode()
		_this.getAgainTime()
        recorderManager.onStop( (res) =>{
            console.log('recorder stop' + JSON.stringify(res));
			console.log("回调..................")
			 // let _this =this
            _this.voicePath = res.tempFilePath;
			console.log(_this.voicePath)
			console.log('---------'+_this.tipIos+'-------')
			uni.showLoading({})
			wx.uploadFile({
				url:'',
				filePath:res.tempFilePath,
				name:"file",
				formData:{
					policy:_this.policy,
					OSSAccessKeyId:_this.accessid,
					signature:_this.signature
					
				},success(res) {
				    console.log(res)	
				},
		         fail(err) {
		         	console.log(err)
		         }
				
			})
			
			// wx.uploadFile({
			//   url: API_URL+'/ygb/topic/audio_merge_ios', // 仅为示例，非真实的接口地址
			//   filePath: res.tempFilePath,
			//   name: 'audio_file',
			//   formData: {
			// 	"token": _this.token,
			// 	"first_status":_this.tipIos
			//   },success(res) {
			// 	     uni.showToast({
			// 	  	title:"complete",
			// 	  })
			// 	  uni.hideLoading()
			// 	   	 uni.reLaunch({
			// 	   	 url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
			// 	   	// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
			// 		// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://xiangyuecn.github.io/Recorder/')
			// 	});
			// 	  console.log(res)
			//   },fail:(res)=>{  
			//              uni.showToast({
			//            	title:"失败",
			//            })
			//        },  
			//        complete:(res)=>{  
			// 		   uni.hideLoading()
			//            uni.showToast({
			//           	title:"complete",
			//           })
			//        }  
			// })
        });
    },
    methods: {
		//暂停录音
		pauseVoice(){
			this.isPay = false;
			clearInterval(this.timer)
			recorderManager.pause()	
		},
		resumeVoice(){
			this.isPay = true;
		this.startAudio()
			recorderManager.resume()
		},
		start() {
				this.color = '#F74C44'
				this.startAudio()
			},
			stop() {
				clearInterval(this.timer)
			},
			startAudio() {
				 this.timer = setInterval(() => {
					 if(this.time>=6000){
						 clearInterval(this.timer)
						 return
					 }
					   this.time ++ 
						this.getPercent()
					},1000)
			},
			getPercent() {
				this.percent = this.time / this.maxTime * 100
			},
        startRecord() {
            console.log('开始录音');
			this.start()
            this.isShow = false
            recorderManager.start({
				duration:600000
			});
        },
        endRecord() {
			clearInterval(this.timer)
            console.log('录音结束');
			 recorderManager.stop()
        },
        playVoice() {
            console.log('播放录音');
            if (this.voicePath) {
                innerAudioContext.src = this.voicePath;
                innerAudioContext.play();
            }
        },
   		 up(){
   		   this.endRecord()
   		},
		//保存
		save(){
			uni.showModal({
				title:'提示',
				content:"确认提交录音么?",
				success() {
					
					
				}
			})
		},
		// 获取时间长
		getAgainTime(){
			let _this =this
			if(_this.tipIos == 1){
			   _this.time = 0	
			}else{
				let par = {}
				par.token = _this.token
				_this.yapi.getDuration(par).then(res=>{
					_this.time = res.datas
					_this.color = '#F74C44';
					_this.getPercent();
					_this.agean = res.datas
					console.log(res.datas)
				})
			}
		},
		getOssCode(){
			this.yapi.getOssdata({token:uni.getStorageSync('token')}).then(res=>{
				this.accessid = res.datas.accessid;
				this.host = res.datas.host;
				this.policy = res.datas.policy;
				this.signature = res.datas.signature;
				this.expire = res.datas.expire;
				this.callback = res.datas.callback;
				this.dir = res.datas.dir;
			}).catch(err=>{
				
			})
		},
	}
	,components:{
		cmdProgress 
	}
}
</script>

<style>
	.contr-box{
		margin-top: 230upx;
	}
	.text-colr{
		color: #666666;
		font-size: 26upx;
	}
	.start-box{
		text-align: center;
	}
	.bt-gro{
		display: flex;
		width: 100%;
		align-items: center;
		align-self: center;
	}
	.bt-gro .bt-one{
		flex: 1;
		text-align: center;
	}
	.img-log{
		margin: auto;
		display: block;
		width: 154upx;
		height: 154upx;
	}
	.tip-text{
	   text-align: center;
	   margin-top: 50upx;
	   color: #666666;
	}
	.timer-box{
		margin-top: 230upx;
	}
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
