<template>
	<view>
		
	  <view class="mian-box">
		  <view class="title-text"><text>积分规则</text> </view>
		  <view class="rule-box" v-if="role==1" >
			 <view class="line-text" v-for="(item,index) in ruleList" :key="index">{{index+1}}.{{item}}</view>
			
		  </view>
		    <view class="rule-box" v-if="role==2">
		  			  <view class="line-text" v-for="(item,index) in ruleList" :key="index">{{index+1}}.{{item}}</view>
		  	
		  </view>
	  </view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role:uni.getStorageSync('role'),//1 学生 2老师
				ruleList:[]
			}
		},
		onLoad() {
			this.getRuleList()
		},
		methods: {
			getRuleList(){
				let parm = {}
				parm['token'] = uni.getStorageSync('token');
				this.yapi.getRoleCont(parm).then(res=>{
					if(res.code==200){
						this.ruleList = res.datas
						
					}
					
				}).catch(err=>{
					
				})
			}
			
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
		
	.mian-box{
		padding: 80upx 15px;
		
	}
	.title-text {
		text-align: center;
		margin-bottom: -30upx;
	}
	.title-text text{
		font-size: 32upx;
		background: #FFFFFF;
		color: #F74C44;
		border-bottom: 2px solid #F74C44;
		border-left: 2px dashed #F74C44;;
		border-right:2px dashed #F74C44; ;
		border-top: 2px solid #F74C44;
		border-radius: 15upx;
		padding: 10upx 36upx;
	}
	.rule-box{
		border:2px solid #F74C44;
		border-radius: 15px;
		padding: 80upx 15upx 50upx 15upx;
		
	}
	.line-text{
		margin-bottom: 25upx;
		color: #333333;
	}

</style>
