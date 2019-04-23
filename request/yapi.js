const network = require('./network.js');
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
	}
	
	
}