<template>
	<view class="post-box">
		
		<view class="post-add-btn" @click="checkSession">
			<image src="../../static/icon/add.png" mode=""></image>
		</view> 
		<view class="post-content-item" v-for="item in post" :key='item.id' @click="toPostDetail(item.id)">
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
					{{item.summary}}
				</view>

			</view>
			<view class="line"></view>
		</view>
		<view class="">
				<u-loadmore :status="status" />
		</view>
		<u-back-top :scroll-top="scrollTop" icon="arrow-up" tips="返回"></u-back-top>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import * as api from "@/utils/api.js"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				scrollTop:0,
				status:'nomore',
				post: [],
				page:1
			}
		},
		onLoad() {
			this.getpostListByPage(this.page)
		},
		onReachBottom() {
			console.log('触底事件')
			this.page++
			this.getpostListByPage(this.page)
		},
		onPullDownRefresh() {
			this.getpostListByPage(this.page);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			checkSession() {
				const _this = this;
				//检查登录是否过期
				uni.checkSession({
					success() {
							
					},
					fail() {
						//过期自动重写授权
						_this.wxCode();
					}
				})

				//获取缓存信息 包含信息就跳转到表单页面
				uni.getStorage({
					key: 'userInfo',
					success() {
						uni.navigateTo({
							url: '../postAdd/postAdd'
						})
					},
					fail() {
						uni.switchTab({
							url: '../mine/mine'
						})
					}
				})
			},
			//获取帖子
			async getpostListByPage(page) {
				let res = await api.getpostListByPage(page)
				if (res.code === 200) {
					if(res.data.records.length===0){
						//展示没有更多数据
					}
					this.post = this.post.concat(res.data.records)
					
				}
			},
			// 跳转到详情页面
			toPostDetail(id) {
				uni.navigateTo({
					url:'../postDetail/postDetail?id='+id
				})

			},
			wxCode() {
				uni.login({
					provider: 'weixin',
					success(res) {
						console.log(res)
						if (res.code) {
							//请求后端接口生成  openId 、 session——key
							api.wxOS(res.code).then(res1 => {
								console.log(res1)
								if (res1.status === 200) {
									//将ticket 保存在小程序缓存当中
									uni.setStorage({
										key: 'LOGIN',
										data: res1.ticket,
										success() {

										},
										fail(err) {
											console.log(err)
										}
									})
								} else {
									console.log('授权失败')
								}
							})

						} else {
							console.log('调用失败')
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.post-box {
		

		.post-add-btn {
			position: fixed;
			right: 20px;
			bottom: 26px;
			width: 50px;
			height: 50px;
			border-radius: 50%;

			image {
				width: 50px;
				height: 50px;
			}
		}

		padding: 0 40rpx;

		.post-content-item {
			margin-bottom: 40rpx;
			margin-top: 30rpx;
			width: 100%;
			height: 300rpx;

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
</style>
