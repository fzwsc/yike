<template>
	<view class="setting">
		<view class="setting-list">
	<!-- 		<view class="setting-item">
				<view class="text">
					推送设置
				</view>
				
				<view class="arrow">
					
				</view>
			</view> -->
			<view class="setting-item" @tap="unBind()">
				<view class="text">
					微信解绑
				</view>
				<view class="arrow">
				</view>
			</view>
		</view>
		<view @click="checkOut()" open-type="reLaunch" class="log-out">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:uni.getStorageSync('token'),
			};
		},
		methods:{
			checkOut(){
				 // uni.removeStorage({
					//  key:'usn'
				 // })
				 //   uni.removeStorage({
				 //   key:'role'
				 // })
				 //  uni.removeStorage({
					//  key:'token'
				 // })
				 //   uni.removeStorage({
				 //      key:'flag'
				 // })
				 uni.clearStorage()
				 uni.reLaunch({
					url:'../login/login'
				}) 
				
			},
			unBind(){
				let _this = this
				uni.showModal({
					title:'提示!!',
					content:"确定解除微信绑定么?",
					success(res) {
						if(res.confirm){
							let par={}
							par["token"] = _this.token
						 _this.yapi.changePwdUnBind(par).then(res=>{
							 if(res.code==200){
								 // uni.removeStorage({
									//  key:'usn'
								 // })
								 //  uni.removeStorage({
								 //      key:'flag'
								 // })
								 //  uni.removeStorage({
								 // 	   key:'token'
								 // })
								 //   uni.removeStorage({
								 // 	   key:'role'
								 // })
								 uni.clearStorage()
								 uni.reLaunch({
									url:'../login/login'
								}) 
							 }
						 }).catch(err=>{
							 
						 })
									
						
						}else{
							
						}
					
					}
				})
			}
		},
		onUnload() {
			uni.setStorageSync("flag",true)
		}
	}
</script>

<style>
  .setting {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  height: 100vh;
  }
  .setting .setting-list {
	  
  }
  .setting .setting-list .setting-item {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 31upx;
	  background: #fff;
  }
   .setting .setting-list .setting-item .text {
	   font-size: 28upx;
   }
  .setting .setting-list .setting-item .arrow {
	  width: 20upx;
	  height: 20upx;
	  border-top: 1px solid #C9C9C9;
	  border-right: 1px solid #C9C9C9;
	  transform: rotate(45deg);
  }
  .setting .log-out {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 370upx;
	  height: 80upx;
	  margin: 0 auto 55upx;
	  font-size: 31upx;
	  color: #fff;
	  background: #F74C44;
	  border-radius: 31upx;
  }
</style>
