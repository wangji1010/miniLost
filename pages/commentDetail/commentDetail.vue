<template>
	<view class="commentDetail-box">
		<u-toast ref="uToast" />
		<view class="user">
			{{parentComment.userName}}
		</view>
		<view class="createTime">
			<text>{{parentComment.createTime}}</text>
			<u-icon name="chat"></u-icon>
			<text style="font-size: 13px; padding-left: 4px;">12</text>
		</view>
		<view class="parentContent">
			{{parentComment.content}}
		</view>
		<view class="line"></view>
		<view class="reply-count">
			<text style="color: #FF0000;">{{count}}</text>条回复
		</view>
		<view v-if="count>0" class="reply-item" v-for="item in sonCommentList" :key='item.id'>
			<view class="">
				<view class="username">
					{{item.userName}}
				</view>
				<view class="createTime">
					{{item.createTime}}
				</view>
			</view>
			<view class="reply-content">
				{{item.content}}
			</view>
		</view>
		<view class="reply-input-box">
			<input focus confirm-type='send' type="text" v-model="TbLostComment.content" placeholder="请输入回复" />
			<button size="mini" type="primary" @click="addReplyComment">回复</button>
		</view>


	</view>
</template>

<script>
	import * as api from '@/utils/api'
	export default {
		data() {
			return {
				parentComment: {
					id: '',
					userName: '',
					createTime: '',
					content: ''
				},
				count: 0,
				sonCommentList: [],
				TbLostComment: {
					content: '',
					parentContent:''
				},
				key: ''

			};
		},
		onLoad(option) {
			const _this = this
			uni.getStorage({
			    key: 'LOGIN',
			    success: function (res) {
			       _this.key = res.data;
			    }
			});
			this.parentComment.id = option.id
			this.parentComment.userName = option.username
			this.parentComment.createTime = option.createTime
			this.parentComment.content = option.content
			this.TbLostComment.parentContent = option.id
			console.log(this.parentComment)
			//清空回复框
			this.TbLostComment.content = '';
			//获取评论数量
			this.getCount(option.id)
			//获取子评论列表
			this.getCommentList(option.id)
			
			

		},
		methods: {
			async addReplyComment() {
				//检查数据
				if (this.TbLostComment.content === '') {
					this.$refs.uToast.show({
						title: '回复内容为空',
						type: 'error'
					})
					return
				}
				//回复
				let res = await api.postComment(this.key, this.TbLostComment)
				console.log(res)
				if(res.code===200){
					this.$refs.uToast.show({
						title: '回复成功',
						type: 'success'
					})
					//查询数量
					this.getCount(this.parentComment.id)
					//查询内容 
					this.getCommentList(this.parentComment.id)
					
				}else{
					this.$refs.uToast.show({
						title: '回复失败,请检查网络',
						type: 'error'
					})
				}

			},
			//获取评论数量
			getCount(id){
				//获取父亲评论下的子评论数量
				api.getParentCommentCount(id).then(res => {
					this.count = res.data
				})
			},
			getCommentList(id){
				api.getReplyCommentList(id).then(res => {
					console.log(res)
					this.sonCommentList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.commentDetail-box {
		padding: 10PX;

		.user {
			font-weight: 300;
			font-size: 18px;
		}

		.createTime {
			padding-top: 10px;
			padding-bottom: 10px;
			font-size: 14px;
			color: #999999;
		}

		.parentContent {
			line-height: 24px;
			font-size: 15px;
		}

		.line {
			margin-top: 20px;
			margin-bottom: 20px;
			height: 1px;
			background-color: #CCCCCC;
		}

		.reply-count {
			font-size: 15px;

		}

		.reply-item {
			padding-top: 20px;

			.reply-content {
				font-size: 14px;

			}
		}

		.reply-input-box {

			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			margin-bottom: 6px;
			margin-top: 10px;
			width: 710rpx;
			border-top: 1px solid #CCCCCC;
			align-items: center;
			display: flex;
			justify-content: space-between;

			input {
				border-radius: 4px;
				padding: 16px 0px;
				width: 300px;
				display: inline-block;
			}

			button {
				display: inline-block;
				margin-left: 0px;
				margin-right: 0px;
			}
		}
	}
</style>
