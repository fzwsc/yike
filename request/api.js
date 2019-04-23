const network = require('./network.js');
export default{
    // 登录
    Login(data) {
        return network.post("/ygb/user/login",data)
    },
	// 学校列表
	schoolList(data) {
		return network.get('/ygb/user/school_list',data)
	},
	// 获取消息点赞列表
	belikeList(data,onlyOne) {
		return network.post('/ygb/like/belike_list',data,onlyOne)
	},
	// 获取消息评论列表
	recedList(data,onlyOne) {
		return network.post('/ygb/comment/get_reced_list',data,onlyOne)
	},
	// 获取消息回复列表
	answerList(data,onlyOne) {
		return network.post('/ygb/comment/get_answered_list',data,onlyOne)
	},
	// 点赞云广播
	likeygb(data) {
		 return network.post('/ygb/like/add_ygb_like',data)
	},
	// 点赞评论
	likeComment(data) {
		 return network.post('/ygb/like/add_comment_like',data)
	},
	// 关注/取消关注
	addAttention(data) {
	   return network.post('/ygb/user/attention',data)
	},
	// 答题
	answerSubject(data) {
		return network.post('/ygb/topic/answer_subject',data)
	},
	// 消息已读
	updateMsgStatus(data) {
		return network.get('/ygb/message/update_msg_status',data)
	},
	// 评论列表
	commentList(data,onlyOne) {
		return network.get('/ygb/topic/comment_list',data,onlyOne)
	},
	// 评论云广播
	addYgbComment(data) {
		return network.post('/ygb/comment/add_ygb_comment',data)
	},
	// 回复评论
	addReplyComment(data) {
		return network.post('/ygb/comment/add_reply_comment',data)
	},
	// 回复列表
	replyList(data) {
	  return network.get('/ygb/topic/reply_list',data) 	
	},
	// 消息列表
	userMessageList(data,onlyOne) {
		return network.post('/ygb/message/get_user_message_list',data,onlyOne)
	},
	// 消息内容列表
	messageList(data,onlyOne) {
		return network.post('/ygb/message/get_message_list',data,onlyOne)
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
	teacherDynamic(data,onlyOne) {
		return network.get('/ygb/user/teacher_dynamic',data,onlyOne)
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
	scoreList(data,onlyOne) {
		return network.post('/ygb/user/get_scorelist',data,onlyOne)
	},
	// 我的点赞
	myLikeList(data,onlyOne) {
		return network.post('/ygb/like/like_list',data,onlyOne)
	},
	// 我的评论
	myRecedList(data,onlyOne) {
		return network.post('/ygb/comment/get_my_reced_list',data,onlyOne)
	},
    // 我的粉丝
    myfans(data,onlyOne) {
       return network.post("/ygb/user/fans_list",data,onlyOne);
    },
	// 已关注
	attentionList(data,onlyOne) {
		return network.post('/ygb/user/attention_list',data,onlyOne)
	},
	// 推荐列表
	recommendList(data,onlyOne) {
		return network.post('/ygb/user/recommend_list',data,onlyOne)
	},
	// 最近收听
	historyList(data,onlyOne) {
		return network.post('/ygb/user/history_list',data,onlyOne)
	}

}