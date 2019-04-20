<template>
	<!-- 搜索界面 -->
	<view>
		<vuesearch :mode='2' :show="false" @search="search($event,1)"></vuesearch>
		<!-- 数据界面 -->
		<view class="cont-box">
			<view class="tab-box">
				<view :class="[{'active':index==itemIndex},'tan-nav']" @click="chose(index)" v-for="(item,index) in tabList" :key='item.toString'>{{item}}</view>
			</view>
			<view class="yun-box">
				<!-- 云广播 -->
				<view class="yun-cont" v-for="item in contData" :key='item.toString' v-if="show">
					<image :src="item.avatar" mode="" class="user-img"></image>
					<view class="user-box">
						<view class="name">
							{{item.name}}
						</view>
						<view class="time">
							{{item.createtime}}
						</view>
					</view>
					<view class="yun-nei-ro">
						{{item.title}}
					</view>
				</view>
				<!-- 老师 -->
				<view class="teacher-cont" v-for="item in maincont" :key='item.toString' v-if="!show">
					<view class="left-box">
						<view class="user"><image :src="item.avatar" mode=""></image>{{item.name}}</view>
						<view class="courtyard">{{item.collegename}}</view>
					</view>
					<view class="right-box">
					<template>
						<!-- 1已关注2未关注 -->
							<view class="follow" v-if="item.attention_status==1" @click="follow(item,index)"><text>已关注</text></view>
					</template>
					<template>
						<view class="no-follow" v-if="item.attention_status==2" @click="follow(item,index)"><text>+关注</text></view>
					</template>
						<view class="courtyard">教授课程：毛概</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 没有数据界面 -->

		<view class="no-data" v-show="noData">
			<image src="../../static/no_data.png" mode=""></image>
			<view class="tip-color">抱歉，未找到相关结果。</view>
		</view>
	</view>
</template>

<script>
	import vuesearch from '../../components/search/mehaotian-search.vue'
	export default {
		data() {
			return {
				tabList:['动态','老师'],
				itemIndex:0,
				contData:[],
				contDataTeach:[],
				maincont:[],
				show:true,
				noData:false
			};
		},
		methods:{
		 search(e, val) {
            console.log(e, val);
			if(e==''){
				this.noData = false
			}
			let par = {}
			par['token'] = uni.getStorageSync('token')
			par['words'] = e
			this.yapi.search(par).then(res=>{
				 if(res.datas.radio_list==0){
					    this.noData = true
				}
				this.contData = res.datas.radio_list
				this.contDataTeach = res.datas.teacher_list
			}).catch(err=>{
				
			})
			
		  },
		  chose(index){
			  this.itemIndex = index
			  if(this.itemIndex==0){
				  this.maincont = this.contData
				  this.show =true
				  if(this.contData==0){
					  this.noData = true
				  }
			  }else{
				  this.maincont = this.contDataTeach
				  this.show =false
				  if(this.contDataTeach==0){
				  		this.noData = true
				  }
				  
			  }
		  }
		},
		components:{
			vuesearch
		}
	}
</script>

<style>
	.teacher-cont{
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
	}
	.teacher-cont .courtyard{
		margin-top: 10upx;
		color: #999999;
		font-size: 22upx;
	}
	.teacher-cont .user{
		display: flex;
		justify-content: center;
		line-height:60rpx;

	}
	.teacher-cont .user image{
		height: 60upx;
		width: 60upx;
	}
	.teacher-cont .follow{
		padding:7rpx 13rpx;
		border:1rpx solid #f74c44;
		border-radius:10rpx;
		color:#f74c44;
		text-align: center;
		font-size: 24upx;
	}
	.teacher-cont .no-follow{
		font-size: 24upx;
		padding:7rpx 13rpx;
		border:1rpx solid #cccccc;
		border-radius:10rpx;
		color:#666666;

	}
	.yun-box{
		background: #FFFFFF;
	}
	.yun-box .yun-cont{
		position: relative;
		border-bottom: 1upx solid #EEEEEE;
		padding: 22upx 30upx 10upx 30upx;
	}
	.yun-box .yun-cont .user-img{
		height: 100upx;
		width: 100upx;
		border-radius: 50%;
		border: 2upx solid #EEEEEE;
		position: absolute;
	}
	.yun-box .yun-cont  .user-box{
		margin-left: 112upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 104upx;
	}
	.yun-box .yun-cont  .user-box .name{
		font-size: 28upx;
		color: #333333;
	}
	.yun-box .yun-cont  .user-box .time{
		color: #666666;
		font-size: 20upx;
	}
	.yun-box .yun-cont .yun-nei-ro{
		color: #333333;
	}
	
	
	.cont-box .tab-box{
		display: flex;
		justify-content: center;
		background: #FFFFFF;
		margin: 20upx 0;
		height: 66upx;
	
	}
	.cont-box .tab-box .tan-nav{
		line-height: 66upx;
		flex: 1;
		width: 100%;
		text-align: center;
	}
	.tab-box .active{
		position: relative;
		color: #FC4E51;
	}
	.tab-box .active::after{
		position: absolute;
		bottom: 0upx;
		left: 50%;
		transform: translate(-50%,50%);
		content: "";
		height: 6upx;
		width: 40upx;
		border-radius: 4upx;
		background: #FC4E51;
		
	}

	.no-data{
		position: absolute;
		text-align: center;
		margin-top: 179upx;
		width: 100%;
		
	}
	.no-data image{
		width: 377upx;
		height: 239upx;
		margin: auto;
	}
	.no-data .tip-color{
		color: #666666;
		margin-top: 91upx;
		text-align: center;
	}

</style>
