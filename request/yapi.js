const network = require('./network.js');
import {API_URL} from './base'
export default{
	// 专题tab
	specialTab(data){
		 return network.get("/ygb/topic/topic_list",data)
	   
	},
	// 专题List
	specialList(data){
		return network.get("/ygb/topic/topic_radio_list",data)
	},
	// 首页Tab
	getHoneTab(data){
		return network.get("/ygb/index/tags_list",data)
	},
	// 首页List
    getHoneList(data){
    	return network.get("/ygb/index/tags_radio_list",data)
    },
	// 云广播详情
	getYunDetils(data){
	    return network.get('/ygb/topic/radio_detail',data)
	},
	// 添加云广播专题页面加载接口
	getAddYunCont(data){
		return network.get('/ygb/topic/add_radio_before',data)
		
	},
	// 添加云广播
	addYunCont(data){
		return network.post('/ygb/topic/add_radio',data)
	},
	// 点赞
	addLike(data){
		return network.post('/ygb/like/add_ygb_like',data)
	},
	// 页面搜索
	search(data){
		return network.post("/ygb/index/search",data)
	},
	// 收听云广播
	listenAudo(data){
		return network.post("/ygb/topic/listen_radio",data)
	},
	// 答题
	subAnser(data){
		return network.post("/ygb/topic/answer_subject",data)
	},
	// 获取时长
	getDuration(data){
		return network.get("/ygb/topic/get_audio_duration",data)
	},
	getOssdata(data){
		return network.get('/ygb/Topic/get_oss_signature',data)
	},
	// 获取音频文件流
	getMusicFile(data){
		return network.post('/ygb/topic/get_audio_stream',data)
	},
	// 获取编辑的表单
	getEditFrom(date){
		return network.post('/ygb/topic/reedit_radio',date)
	},
	// 解绑重置密码
	changePwdUnBind(data){
		return network.post('/ygb/user/unbind',data)
	},
	changePwd(data){
		return network.post('/ygb/user/resetPassword',data)
	},
	uploadImg:API_URL+"/ygb/upload/upload",
	//获取审判音频
	getAudioStateList(data){
		return network.get("/ygb/topic/my_radio_list",data)
	},
	// 二次直接登录
	autoLogin(data){
		return network.post("/ygb/user/isBind",data)
	},
	// 举报类型
	reportItem(data){
		return network.get("/ygb/topic/report_item",data)
	},
	// 举报
	reporting(data){
		return network.post("/ygb/topic/report",data)
	},
	// 云广播审核
	audioExamineurl(data){
		return network.post("/ygb/topic/radio_audit",data)
	} 
	

}