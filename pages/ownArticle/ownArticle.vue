<template>
	<view class="own-box">
		<!-- 帖子 -->
		<view class="post" v-if="content[0].active">
			<view class="post-content-item" v-for="item in postData" :key='item.id' @click="toPostDetail(item.id)">
				<view class="post-user-info">
					<image :src="item.userAvatar" mode=""></image>
					<view class="user-name-date">
						<view class="username">{{item.userName}}</view>
						<view class="date">{{item.createTime}}</view>
					</view>
					<view class="post-title">
						{{item.title}}
					</view>
					<view class="post-content">
						{{item.content}}
					</view>
			
				</view>
				<view class="line"></view>
			</view>
		</view>
		<!-- 失物 -->
		<view class="lost" v-if="content[1].active">
			<view @click="toLostDetail(item.id)" class="lost-content-item" v-for="item in lostData" :key="item.id">
				<view class="lost-info">
					<image :src="item.userAvatar" mode=""></image>
					<view class="user-info">
						<view class="username">
							{{item.userName}}
						</view>
						<view class="createTime">
							{{item.createTime}}
						</view>
					</view>
					<view class="type-tag">
						<uni-tag v-if="item.type===2" text="丢失" type="error" size="small"></uni-tag>
						<uni-tag v-if="item.type===1" text="拾到" type="success" size="small"></uni-tag>
					</view>
				</view>
				<view class="lost-title">
					{{item.title}}
				</view>
				<view class="lost-summary">
					{{item.summary}}
				</view>
				<view class="lost-img" v-if="item.cover!==''">
					<image :src="'http://localhost:8090/lost/image/'+item.cover" mode=""></image>
				</view>
			
			</view>
		</view>
		<!-- 评论 -->
		<view class="comment" v-if="content[2].active">
			评论
		</view>
		
		<uni-fab :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import * as api from "@/utils/api.js"
	export default {
		components: {
			uniFab
		},
		onLoad() {
			
			//获取自己的帖子//获取自己的失物
			this.getMinePostLost()
			
			
		},
		data() {
			return {
				key:'',
				postData:[],
				lostData:[],
				
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#d4237a',
					buttonColor: "#d4237a"
				},
				content: [{
						iconPath: '/static/icon/jiandao.png',
						selectedIconPath: '/static/icon/jiandaoSelect.png',
						text: '拾到',
						active: true
					},
					{
						iconPath: '/static/icon/lost.png',
						selectedIconPath: '/static/icon/lostSelect.png',
						text: '丢失',
						active: false
					},
					{
						iconPath: '/static/icon/bianxie.png',
						selectedIconPath: '/static/icon/bianxieSelect.png',
						text: '评论',
						active: false
					}
				]
			}
		}, 
		methods: {
			toPostDetail(id){
				uni.navigateTo({
					url:'../postDetail/postDetail?id='+id
				})
			},
			toLostDetail(id){
				uni.navigateTo({
					url:'../LostDeatil/LostDeatil?id='+id
				})
			},
			  getMinePostLost(){	
				 const _this = this;
				 //获取当前的token
				 uni.getStorage({
				 	key:'LOGIN',
				 	success:function(res){ 
				 		let key = res.data;
						_this.key = key;
						  api.getMinePostList(key).then(resPost=>{
							  console.log(resPost)
							  _this.postData = resPost.data
						  })
						  api.getMineLostList(key).then(resLost=>{
							  console.log(resLost)
							  _this.lostData = resLost.data
						  })
						 
				 	}
				 })
						
				
				 
			},
			 
			trigger(e) {
				console.log(e);
				if (e.index === 0) {
					//其他的 设置为false
					this.content[0].active = true;
					this.content[1].active = false;
					this.content[2].active = false;
					this.type = 1;
					this.page = 1
					this.lost = []
					this.getSelectByLF()

				} else if (e.index === 1) {
					this.content[1].active = true;
					this.content[0].active = false;
					this.content[2].active = false;
					this.type = 2;
					this.page = 1
					this.lost = []
					this.getSelectByLF()
				} else if (e.index === 2) {
					this.content[2].active = true;
					this.content[1].active = false;
					this.content[0].active = false;
					this.page = 1
					this.lost = []
					this.getLostByPage()

				} else if (e.index === 3) {
					//添加
					this.toAddLost()
				}

			}
		}
	}
</script>

<style lang="scss">
	.own-box{
		padding: 10px;
		background-color: #FFFFFF;
		.post{
			.post-content-item {
				padding: 10px;
				margin-bottom: 20rpx;
				margin-top: 20rpx;
				width: 100%;
				
			
				// background-color: #aaaaff;
				.post-user-info {
					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}
			
					.user-name-date {
						line-height: 38rpx;
						display: inline-block;
			
						.username {
							font-size: 24rpx;
						}
			
						.date {
							font-size: 18rpx;
						}
					}
			
					.post-title {
						font-size: 30rpx;
						margin-top: 20rpx;
					}
			
					.post-content {
						color: #667074;
						margin-top: 26rpx;
						line-height: 40rpx;
						font-size: 24rpx;
					}
			
					.post-bottom-info {
						margin-top: 30rpx;
						display: flex;
						justify-content: flex-end;
			
						.thumb-box {
							font-size: 30rpx;
							margin-right: 50rpx;
						}
			
						.comment-box {
							font-size: 30rpx;
							margin-right: 50rpx;
						}
			
					}
				}
			
				.line {
					margin-top: 20rpx;
					background-color: #007AFF;
					height: 4rpx;
			
				}
			}
		}
		.lost{
			.lost-content-item {
				overflow: hidden;
				position: relative;
				margin-top: 20rpx;
				border-radius: 18rpx;
				// height: 400rpx;
				padding: 20rpx 45rpx;
				background-color: #FFFFFF;
				box-shadow: 0 0 3px 3px rgba(0, 0, 0, .1);
			
				.lost-info {
					display: flex;
					justify-content: start;
					vertical-align: middle;
					line-height: 30rpx;
					padding-top: 30rpx;
			
					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 4rpx;
					}
			
					.user-info {
						margin-left: 20rpx;
			
						.username {
							font-size: 24rpx;
						}
			
						.createTime {
							font-size: 18rpx;
						}
					}
			
					.type-tag {
						position: absolute;
						height: 20px;
						line-height: 20px;
						text-align: center;
						width: 74px;
						background-color: #ff5722;
						color: #fff;
						transform: rotate(45deg);
						right: -20px;
						top: 6px;
					}
			
				}
			
				.lost-title {
					margin-top: 20rpx;
					line-height: 40rpx;
					font-size: 30rpx;
				}
			
				.lost-summary {
					margin-top: 4rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
				}
			
				.lost-img {
					display: flex;
					justify-content: space-around;
			
					image {
						// margin-right: 60rpx;
						width: 120rpx;
						height: 120rpx;
					}
				}
			
			}
		}
		.comment{
			
		}
	}
	
</style>
