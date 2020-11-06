<template>
	<view class="Lost-Detail-box">
		<view class="comment-add" @click="toComment">
			<image src="../../static/icon/comment.png" mode=""></image>
		</view>
		 <view class="lost-title">
		 	<text style="font-weight: 600; ">{{lostDetail.title}}</text>
		 	<text v-if="lostDetail.type===2"  class="tag-lost">丢失</text>
		 	<text v-else class="tag-now">拾到</text>
		 </view>
		 <view class="lost-date">
		 	<text>{{lostDetail.createTime}}</text>
		 </view>
		 <view class="phone">
		 	联系：<text> {{lostDetail.contact}} </text>
		 </view>
		 <view class="lost-content">
		 	<text>
				{{lostDetail.content}}
			</text>
		 </view>
		 <view @click="preViewImage" v-if="lostDetail.cover!==''" class="lost-image">
		 	<image style="width: 100%;"
			 :src="'http://localhost:8090/lost/image/'+lostDetail.cover" mode="aspectFill"></image>
		 </view>
		<view class="comment-sum-box">
			<text>评论</text>
			<view class="">
				<text style="color: #f0674f; font-size: 16px;"> {{count}} </text>
				<text>条回答</text>
			</view>
		</view>
		
		<view
		 class="comment-parent-item" v-for="item in lostCommentList" :key='item.id'>
			<view class="comment-user-info">
				<image :src="item.userAvatar" mode=""></image>
				<view class="user-info">
					<view class="">
						<text class="username" style="display: block;">
						{{item.userName}}
						</text>
						<text class="createTime" style="display: block;">
								{{item.createTime}}
							</text>
					</view>
					<view class="comment-count" >
						<u-icon name="chat"></u-icon>
						<text style="font-size: 13px; padding-left: 4px;">12</text>
					</view>
		
				</view>
			</view>
		
			<view class="comment-content">
				<text>
						{{item.content}}
				</text>
		
			</view>
		</view>
		<view class="nullData" v-if="count<=0">
			<image style="padding-top: 20px; padding-left: 34px;" src="../../static/icon/nulldata.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import * as api from '@/utils/api'
	export default {
		data() {
			return {
				id:'',
				lostDetail:{},
				count:0,
				lostCommentList:[]
			}
		},
		onPullDownRefresh() {
			this.getCommentList()
			this.getCommentCount()
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1000)
			
			
		},
		onShow() {
			//开启下拉
			uni.startPullDownRefresh({
				
			})
			
		},
		onLoad(options) {
			this.id = options.id;
			//获取失物详情
			this.getLostDetail()
			//获取评论的数量
			this.getCommentCount()
			//获取 评论列表
			this.getCommentList()
		},
		methods: {
			preViewImage(){
				console.log('预览')
				const _this = this;
				uni.previewImage({
					urls:'http://localhost:8090/lost/image/'+_this.lostDetail.cover
				})
			},
			async getCommentList(){
				let res = await api.getLostCommentList(this.id);
			
				this.lostCommentList = res.data.records
			},
			async getCommentCount(){
				let res = await api.getLostCommentCount(this.id)
				this.count = res.data
			},
				async getLostDetail(){
					 let res = await api.getLostDetail(this.id)
					 console.log(res)
					 this.lostDetail = res.data
				},
				toComment() {
					uni.navigateTo({
						url: '../addComment/addComment?id='+this.id
					})
				}
			
		}
	}
</script>

<style lang="scss">
	.Lost-Detail-box{
		padding: 20rpx;
		.comment-add{
			background-color: #FFFFFF;
			position: fixed;
			bottom: 30px;
			right: 30px;
			image {
				width: 36px;
				height: 36px;
				border-radius: 50%;
			}
		}
		.lost-title{
			.tag-lost {
				font-size: 12px;
				margin-left: 20px;
				font-family: 微软雅黑;
				padding: 2px 8px;
				background-color: #f0674f;
				color: #FFFFFF;
				border-radius: 4px;
			}
			.tag-now {
				font-size: 12px;
				margin-left: 20px;
				font-family: 微软雅黑;
				padding: 2px 8px;
				background-color: #00aa00;
				color: #FFFFFF;
				border-radius: 4px;
			}
		}
		.lost-date{
			padding-top: 10px;
			font-size: 12px;
			color: #999999;
		}
		.phone{
			padding-top: 10px;
			
		}
		.lost-content{
			padding-top: 10px;
			padding-bottom: 10px;
			text{
				font-size: 13px;
				
			}
		}
		.lost-image{
			padding-top: 10px;
			image{
				border-radius: 6px;
			}
		}
		.comment-sum-box {
			border-top: 1px #EEEEEE solid;
			border-bottom: 1px #EEEEEE solid;
			padding-bottom: 20px;
			padding-top: 20px;
			display: flex;
			justify-content: space-between;
		}
		
		.comment-parent-item {
		
			padding-top: 20px;
			padding-bottom: 10px;
			border-bottom: 1px #EEEEEE solid;
		
			.comment-user-info {
				display: flex;
				align-items: center;
		
				image {
					width: 30px;
					height: 30px;
					border-radius: 50%;
				}
		
				.user-info {
					margin-left: 14px;
					display: flex;
		
					.comment-count {
						font-size: 14px;
						color: #999999;
						padding-top: 32rpx;
						padding-left: 322rpx;
					}
		
					.username {
						font-size: 16px;
					}
		
					.createTime {
						padding-top: 3px;
						font-size: 10px;
						color: #8c887d;
					}
				}
			}
		
			.comment-content {
				padding-top: 15px;
		
				text {
					font-size: 14px;
					color: #757575;
				}
			}
	}
	}
</style>
