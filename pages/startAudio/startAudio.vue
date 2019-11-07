<template>
    <view>
		<custom-header :title="title" :backBtnClass="backBtnClass" :showBack="showBack" :containerStyle="containerStyle" :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header>
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
			<!-- 	<view class="bt-one" @tap="save">
					<image class="img-log" src="../../static/baocun.png" mode=""></image>
					<text  class="text-colr">保存</text>
				</view> -->
			</view>
		</view>
     <!--  <button @tap="startRecord">开始录音</button>
        <button @tap="endRecord">停止录音</button>
		<button @tap="pauseVoice">暂停录音</button>
		<button @tap="resumeVoice">继续录音</button>
        <button @tap="playVoice">播放录音</button>
		<button @tap="up" type="primary">上传</button> -->
    </view>
</template>

<script>
	import {API_URL} from '../../request/base.js'
	import cmdProgress  from '../../components/cmd-progress/cmd-progress.vue'
	import customHeader from "../../components/custom-header/custom-header"
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;


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
			userid:uni.getStorageSync('userId'),
			accessid:'',
			policy:"",
			host:'',
			signature:'',
			expire:'',
			callback:'',
			dir:'',
			isPageUp:true,
			goon:2,
			title: '录音',
			showBack: true,
			backBtnClass: 'uni-icon uni-icon-back',
			containerStyle:'background:#F74C44',
			titleStyle: 'font-size:15px;color:#ffffff'
			
		}
        
    },
    onLoad(option) {
        let _this =this
		if(option.tip){
			_this.tipIos = option.tip
			console.log("不为空tip"+option.tip)
		}
		console.log(option)
		if(option.goon){
			// _this.startRecord()
			_this.goon = option.goon;
			if(_this.goon==1){
				_this.isShow =true
				_this.startRecord();
				// _this.tipIos =2
				console.log('继续录制------>---->'+option.goon)
			}
		}
		// 验证oss
		_this.getAgainTime()
        recorderManager.onStop( (res) =>{
            console.log('recorder stop' + JSON.stringify(res));
			console.log("回调..................")
            _this.voicePath = res.tempFilePath;
			console.log(_this.voicePath)
			console.log('---------'+_this.tipIos+'-------')
	        //文件上传
			wx.uploadFile({
			  url: API_URL+'/ygb/topic/audio_merge_ios', // 仅为示例，非真实的接口地址
			  // url: API_URL+'/ygb/topic/audio_merge', // 仅为示例，非真实的接口地址
			  filePath: res.tempFilePath,
			  name: 'audio_file',
			  formData: {
				"token": _this.token,
				"first_status":_this.tipIos
			  },success(res) {
				  if(_this.isPageUp){
					   uni.redirectTo({
					     	 // url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://kjw.wx.fzwsc.com/kjwwap/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
					     	url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
					     	// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://ygb.test.yikevr.com/h5/#/iospage?token='+_this.token+'&userid='+_this.userid)
					  	// url: '../soundRecording/soundRecording?url='+encodeURIComponent('https://xiangyuecn.github.io/Recorder/')
					  });
				  }else{
					  let par = {}
					  par.token = _this.token
					  _this.yapi.getOssdata(par).then(res=>{
					  	console.log(res)
					          // 上传到oss
							  let fileName = _this.voicePath.replace('wxfile://', '')
							  let dateTime = _this.dateFormat(new Date(), "yyyyMMddhhmmss"); // 当前时间
							  let randomStr = _this.randomString(4); //  4位随机字符串
							  let filePathMian = res.datas.dir+_this.userId+'/'+dateTime+randomStr+'.mp3'
					  		wx.uploadFile({
					  		url:res.datas.host,
					  		filePath:_this.voicePath,
					  		name:"file",
					  		formData:{
								'success_action_status': '200',
					  			policy:res.datas.policy,
					  			OSSAccessKeyId:res.datas.accessid,
					  			signature:res.datas.signature,
					  			key:filePathMian
					  		},success(res) {
					  		    console.log(res)	
					  		    console.log("成功oss~~~~");
								uni.navigateTo({
									url:`../soundSavue/soundSavue?id=${dateTime}${randomStr}.mp3`
								})
					  		},
					  	     fail(err) {
					  	     	console.log(err)
					  	     }
					  	})
					  }).catch(err=>{
					  })
				  }
			  },fail:(res)=>{  
			             uni.showToast({
			           	title:"失败",
			           })
			       },  
			       complete:(res)=>{  
					   uni.hideLoading()
			          //  uni.showToast({
			          // 	title:"complete",
			          // })
			       }  
			})
        });
    },
    methods: {
		backClick() {
			uni.switchTab({
				url:'../broadcast/broadcast'
			})
			
		},
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
			 clearInterval(this.timer)
            console.log('开始录音');
			this.start()
            this.isShow = false
            recorderManager.start({
				duration:600000,
				format:'mp3'
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
		// 试听上传
   		 up(){
		 clearInterval(this.timer)
		   this.isPageUp =true;
   		   this.endRecord()
   		},
		//保存录音
		save(){
			let _this  =this
			_this.isPageUp =false;
			uni.showModal({
				title:'提示',
				content:"确认提交录音么?",
				success(res) {
					if(res.confirm){
						 _this.endRecord()
						_this.isShow = true;
						_this.tipIos = 1;
						_this.time = 0;
						_this.isPay = true;
						_this.percent =0
						// _this.isPageUp =true
						clearInterval(_this.timer);
					
					}else{
						
					}
				
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
	randomString(num) {
      let chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      let res = "";
      for (let i = 0; i < num; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    },
    dateFormat(dateObj, format) {
      let date = {
        "M+": dateObj.getMonth() + 1,
        "d+": dateObj.getDate(),
        "h+": dateObj.getHours(),
        "m+": dateObj.getMinutes(),
        "s+": dateObj.getSeconds(),
        "q+": Math.floor((dateObj.getMonth() + 3) / 3),
        "S+": dateObj.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(
          RegExp.$1,
          (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? date[k]
              : ("00" + date[k]).substr(("" + date[k]).length)
          );
        }
      }
      return format;
    },
	
	}
	,components:{
		cmdProgress,customHeader
	}
}
</script>

<style>
	.uni-icon-back{
		color: #FFFFFF;
	}
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
