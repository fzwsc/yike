const network = require('./network.js');
export default{
    // 登录
    Login(data) {
        return network.post("/ygb/user/login",data)
    },
	// 获取消息点赞列表
	belikeList(data) {
		return network.post('/ygb/like/belike_list',data)
	},
	// 获取消息评论列表
	recedList(datda) {
		return network.post('/ygb/comment/get_reced_list',data)
	},
	// 获取消息回复列表
	answerList(data) {
		return network.post('/ygb/comment/get_answered_list',data)
	},
	//
	ygbComment(data) {
		
	},
	// 评论列表
	commentList(data) {
		return network.get('/ygb/topic/comment_list',data)
	},
	// 回复列表
	replyList(data) {
	  return network.get('/ygb/topic/reply_list',data) 	
	},
	// 消息列表
	messageList(data) {
		return network.post('/ygb/message/get_user_message_list',data)
	},
	// 播放区
	playArea(data) {
		return network.get('/ygb/index/play_area',data)
	},
	// 学生详情
	studentDetail(data) {
		return network.get('/ygb/user/student_detail',data)
	},
	// 老师详情
	teacherDetail(data) {
		return network.get('/ygb/user/teacher_detail',data)
	},
	// 老师动态
	teacherDynamic(data) {
		return network.get('/ygb/user/teacher_dynamic',data)
	},
	// 教师个人中心
	teacherInfo(data) {
		return network.get('/ygb/user/teacher_info',data)
	},
	// 个人中心
	myInfo(data) {
		return network.get('/ygb/user/my_info',data)
	},
	// 学生个人中心
	studentInfo(data) {
		return network.get('/ygb/user/student_info',data)
	},
	// 我的积分
	scoreList(data) {
		return network.post('/ygb/user/get_scorelist',data)
	},
	// 我的点赞
	myLikeList(data) {
		return network.post('/ygb/like/like_list',data)
	},
	// 我的评论
	myRecedList(data) {
		return network.post('/ygb/comment/get_my_reced_list',data)
	},
    // 我的粉丝
    myfans(data) {
       return network.post("/ygb/user/fans_list",data);
    },
	// 已关注
	attentionList(data) {
		return network.post('/ygb/user/attention_list',data)
	},
	// 推荐列表
	recommendList(data) {
		return network.post('/ygb/user/recommend_list',data)
	},
	// 最近收听
	historyList(data) {
		return network.post('/ygb/user/history_list',data)
	}

}