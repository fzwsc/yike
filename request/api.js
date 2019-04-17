const network = require('./network.js');
export default{
    // 成功案例列表
    CaseList(data) {
        return network.post("/mobile/index.php?act=kjw_common&op=successcase_list",data)
    },
    // 成功案例详情
    CaseListDetail(data) {
       return network.post("/mobile/index.php?act=kjw_common&op=successcase_info",data);
    },
    // 低价资讯列表
    LowList(data) {
       return network.get("/mobile/index.php?act=kjw_common&op=lowcostnews_list",data)
    },
    // 低价资讯详情
    LowListDetail(data) {
       return network.get("/mobile/index.php?act=kjw_common&op=lowcostnews_info",data);
    },
    // 砍价师列表
    BarginList(data) {
        return network.post("/mobile/index.php?act=kjw_bargainer&op=bargainer_list",data)
    },
    // 砍价师详情
    BarginDetail(data) {
        return network.post("/mobile/index.php?act=kjw_bargainer&op=bargainerinfo",data)
    },
    // 砍价师评价明细
    BarginEvaluate(data) {
        return network.post('/mobile/index.php?act=kjw_bargainer&op=bargainer_allpraise',data)
    },
   // 砍价王用户登录
   Login(data) {
       return network.post('/mobile/index.php?act=connect_xcx&op=wxLogin',data)
   },
   // 发送验证码
   SendCode(data) {
       return network.post('/mobile/index.php?act=member_account&op=bind_mobile_step1',data)
   },
   // 注册手机号码
   RegisterPhone(data) {
       return network.post('/mobile/index.php?act=member_account&op=bind_mobile_step2',data);
   },
   // 获取个人信息
   GetPersonInfo(data) {
       return network.get('/mobile/index.php?act=kjw_member&op=wx_user_info',data);
   },
   // 城市3级列表
    AreaLevel() {
      return network.get('/mobile/index.php?act=kjw_area&op=area3level',{});
    },
   // 图片上传
    PictureUpload(filePath,name,data) {
      return network.pic('/mobile/index.php?act=kjw_task&op=upload_image',filePath,name,data);  
    },
    // 发布任务
    PublishTask(data) {
        return network.post("/mobile/index.php?act=kjw_task&op=task_add",data);
    },
    // 获取经纬度
    myfans(data) {
       return network.get("/ygb/user/attention_list",data);
    }

}