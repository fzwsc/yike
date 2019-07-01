<!-- 举报界面 -->
<template>
	<view>
		<view class="list">
			<!-- <view @click="checkAll">.</view> -->
			<view class="checkList" v-for="item in List" :key="item">
				<view class="chose-cont"  @click="checkOne(item.id)">
						<image v-show=" Listids.indexOf(item.id) >= 0" src="../../static/chose.png" mode=""></image>
						<image src="../../static/nochose.png" v-show=" !(Listids.indexOf(item.id) >= 0)" mode=""></image>
						<view class="check" :class="{ isChecked: Listids.indexOf(item.id) >= 0 }">{{item.name}}</view>
				</view>
			</view>
		</view>
			<button class="bt-login" @click="subJubao()" >
			 确认提交
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			List: [],
			Listids: [],
			isCheckAll: false,
			cont:[],
			commentId:''
		};
	},
	onLoad(option) {
		this.commentId = option.commentId
		this.getlist()
		
	},
	methods: {
		getlist(){
			let par = {}
			par["token"] = uni.getStorageSync('token');
			this.yapi.reportItem(par).then(res=>{
				this.List = res.datas
			}).catch(err=>{
				
				
			})
		},
		subJubao(){
			let par = {}
			par["token"] = uni.getStorageSync('token');
			par["comment_id"] = this.commentId;
			par["report_content"] = this.cont.toString();
			if(this.cont.length==0){
				uni.showToast({
				title: '请勾选举报内容!!',
				icon: 'none'});
				return
				
			}
			this.yapi.reporting(par).then(res=>{
				    if(res.code==200){
						uni.showToast({
						title: res.msg,
						icon: 'none'})
					}else{
						
					}
				
				
			}).catch(err=>{
				
				
			})
			
		},
		  checkOne(id){
              var ids = this.Listids.indexOf(id);
			  console.log(id)
              if(ids>=0){
                  //如果包含了该ID，则删除（单选按钮由选中变为非选中状态）
                  this.Listids.splice(ids,1);
				   this.cont.splice(this.List[id-1].name,1)
              }else{
                  //选中该按钮
                  this.Listids.push(id);
				  this.cont.push(this.List[id-1].name)
              }
              // console.log(this.Listids);
              console.log(this.cont);
          },
          checkAll(){
              //全选
              let that = this;
              that.isCheckAll = !that.isCheckAll;
              if(that.isCheckAll){
                  that.Listids=[];
                  that.List.forEach(function(elm){
                      that.Listids.push(elm.id)
                  })
              }else{
                  that.Listids=[];
              }
              console.log(this.Listids);
          }
	}
};
</script>

<style>
	.list{
		display: flex;
		flex-wrap: wrap;
		margin: 60upx 30upx;
		
		align-items: center;
	}
	.list 
	.checkList{
		width: 50%;
		margin-bottom: 15px;
		
	}
	.check{
		display: inline-block;
		color: #333333;
	}
	page{
		background: #FFFFFF;
	}
	
	image{
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
	}
	.bt-login{
		width: 630upx;
		margin: 533upx auto;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50upx;
		color: #FFFFFF;
		background: #F74C44;
		box-shadow: 10px 1px 5upx #F74C44;
		font-size: 32upx;
	}
</style>
