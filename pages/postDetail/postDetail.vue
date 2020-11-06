<template>
	<view class="post-detail-box">
		<view class="comment-add" @click="toComment">
			<image src="../../static/icon/comment.png" mode=""></image>
		</view>
		<view class="post-title-ingo">
			<text style="font-weight: 600; ">{{post.title}}</text>
			<text v-if="post.viewCount>10" class="tag">热门</text>
		</view>
		<view class="post-date-info">
			<text>{{post.createTime }} </text>
			<view class="read-commend">
				<view class="view-box">
					<u-icon name="eye" size="28"></u-icon>
					<text>{{post.viewCount}}</text>
				</view>
				<view class="thumb-box">
					<u-icon name="thumb-up" size="28"></u-icon>
					<text>125</text>
				</view>
				<view class="thumb-box" v-if="false">
					<u-icon name="thumb-up-fill" size="28">
					</u-icon><text>126</text>
				</view>
			</view>
		</view>
		<view class="post-content-box">
			<text>{{post.content}}</text>
		</view>
		<view class="comment-sum-box">
			<text>评论</text>
			<view class="">
				<text style="color: #f0674f; font-size: 16px;"> {{count}} </text>
				<text>条回答</text>
			</view>
		</view>
		<view v-if="count>0"
		@click="toCommentDetail(item)"
		 class="comment-parent-item" v-for="item in comment" :key='item.id'>
			<view class="comment-user-info">
				<image :src="item.userAvatar" mode=""></image>
				<view class="user-info">
					<view class="">
						<text class="username" style="display: block;">{{item.userName}}</text>
						<text class="createTime" style="display: block;">{{item.createTime}}</text>
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
				id: '',
				post: {},
				page:1,
				size:5,
				comment:[],
				count:0,
				parentId:[]
			}
		},
		filters: {
			//过滤器 用于格式化时间
			formatData(data) {
				const nDate = new Date(data)
				const year = nDate.getFullYear()
				const month = nDate.getMonth().toString().padStart(2, 0)
				const day = nDate.getDay().toString().padStart(2, 0)
				return year + '-' + month + '-' + day
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getPostDetail(this.id);
			this.getPostComment(this.id,this.page,this.size);
			this.getCommentCount(this.id);
		},
		onShow() {
			const _this = this;
			//下拉刷新
			uni.startPullDownRefresh({
				success() {
					_this.getPostComment(_this.id,_this.page,_this.size);
					_this.getCommentCount(_this.id);
					setTimeout(function(){
						uni.stopPullDownRefresh()
					},1000)
				}
			})
		},
		onPullDownRefresh() {
			this.getPostComment(this.id,this.page,this.size);
			this.getCommentCount(this.id);
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			getReplyCount(){
				for(var i=0;i<=this.parentId-1;i++){
					console.log(this.parentId[i])
				}
			},
			toCommentDetail(item1){
				
				const _this = this;
				uni.navigateTo({
					url:'../commentDetail/commentDetail?username='+item1.userName+'&id='+item1.id+
					'&content='+item1.content+'&createTime='+item1.createTime
				})
			},
			async getCommentCount(id){
				let res = await api.getCommentCount(id)
				this.count = res.data
			},
			
			async getPostComment(id,page,size){
				 let res = await api.getPostComment(id,page,size)
				 this.comment = res.data.records
				 // for(var i=0;i<=this.comment.length-1;i++){
					//  var response = this.comment[i];
					//  this.parentId.push( response.id)
				 // }
				
				 
				 // console.log()
					// this.getReplyCount();
				
			},
			async getPostDetail(id) {
				let res = await api.getPostDetail(id)
				this.post = res.data

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
	.post-detail-box {
		padding: 20px;
		font-family: 微软雅黑;

		.comment-add {
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

		.post-title-ingo {
			.tag {
				font-size: 12px;
				margin-left: 20px;
				font-family: 微软雅黑;
				padding: 2px 8px;
				background-color: #f0674f;
				color: #FFFFFF;
				border-radius: 4px;
			}
		}

		.post-date-info {
			margin-top: 20px;
			color: #a7a9ad;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				font-size: 12px;
			}

			.read-commend {
				display: flex;
				margin-right: 40px;
				font-size: 12px;

				.view-box {
					margin-right: 30px;
				}
			}

		}

		.post-content-box {
			line-height: 28px;
			font-size: 14px;
			padding-top: 24px;
			color: #4f4f4f;
			margin-bottom: 16px;
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
