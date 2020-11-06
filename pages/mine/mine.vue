<template>
	<view class="mine-box">

		<view class="user-box" v-if="islogin">
			<image :src="userInfo.avatarUrl" mode=""></image>
			<view class="user-info">
				<view class="user-name">{{userInfo.nickName}}</view>
				<view class="user-number">{{userInfo.gender===1 ? '男':'女'}}</view>
			</view>
		</view>

		<view class="user-login" v-else>
			<!-- <text @click="toLogin">登 录</text> -->
			 
			<button type="default" open-type="getUserInfo" style="background-color: #FFFFFF;"
			 @getuserinfo="toLogin">登 录</button>
			
			 
			
			
		</view>

		<view class="user-article" @click="toOwn">
			<view class="mine-issue-title" >
				<image src="../../static/icon/tianxie.png" mode=""></image>
				<text>我发布的内容</text>
			</view>
			<view class="forward">
				<uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
			</view>
		</view>
		<view class="user-great">
			<view class="mine-issue-title">
				<image src="../../static/icon/wodeshoucang.png" mode=""></image>
				<text>我的收藏</text>
			</view>
			<view class="forward">
				<uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
			</view>
		</view>
		<view class="edu-link" @click="toSoftNet">
			<view class="mine-issue-title">
				<image src="../../static/icon/lianjie.png" mode=""></image>
				<text>湖南软件职业学院</text>
			</view>
			<view class="forward">
				<uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
			</view>
		</view>
		<view class="au-link" @click="toYbkj">
			<view class="mine-issue-title">
				<image src="../../static/icon/wangluo.png" mode=""></image>
				<text>洋波科技</text>
			</view>
			<view class="forward">
				<uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
			</view>
		</view>
		<view class="about" @click="toAbout">
			<view class="mine-issue-title">
				<image src="../../static/icon/guanyu.png" mode=""></image>
				<text>关于</text>
			</view>
			<view class="forward">
				<uni-icons color="#a8a8a8" type="forward" size="24"></uni-icons>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你当前还未登录,为了更好的体验建议先登录账号哦!" message="你当前还未登录,为了更好的体验建议先登录账号哦!" :duration="2000"
			 :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import * as api from "@/utils/api.js"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},

		data() {
			return {
				islogin: false,
				userInfo:{
					nickName:'',
					gender:1,
					avatarUrl:''
				},
				key:''
				
			}
		},
		onLoad() {
			// // #ifdef APP-PLUS
			// this.checkUserLogin()
			// // #endif
			//检查 是否有缓存的用户信息
			this.checkUserInfoByStorage();
			
		},
		methods: {
			toAbout(){
				uni.navigateTo({
					url:'../about/about'
				})
			},
			toYbkj(){
				uni.navigateTo({
					url:'../ybkj/ybkj'
				})
			},
			toSoftNet(){
				uni.navigateTo({
					url:'../softNet/softNet'
				})
			},
			toOwn(){
				uni.navigateTo({
					url:'../ownArticle/ownArticle'
				})
			},
			//检查用户是否有i缓存的用户信息
			checkUserInfoByStorage(){
				const _this = this;
				uni.getStorage({
					key:'userInfo',
					success(user) {
						//存在则显示
						//接收信息展示
						console.log(user.data)
						_this.userInfo.nickName = user.data.nickName
						_this.userInfo.gender = user.data.gender
						_this.userInfo.avatarUrl = user.data.avatarUrl
						_this.islogin = true
					},
					fail() {
						
					}
				})
				//初始化key
				uni.getStorage({
					key:'LOGIN',
					success(LoginData) {
						_this.key = LoginData.data
					}
				})
				
			},
			
			// // #ifdef APP-PLUS
			// async checkUserLogin() {
			// 	let res = await api.checkUserLogin()
			// 	console.log(res)
			// 	if (res.code == 200) {
			// 		//已经登录 显示用户信息
					
			// 		this.islogin = true

			// 	} else {
			// 		//未登录
			// 		//提示，并跳转 到登录页面
			// 		this.$refs.popup.open()
			// 	}
			// },
			// // #endif

			toLogin() {
				
				const _this = this

				// // #ifdef APP-PLUS
				// uni.navigateTo({
				// 	url: '../login/login',
				// 	success() {

				// 	}
				// })
				// // #endif

				//调用微信接口登录
				//// #ifdef MP-WEIXIN
				console.log('微信')
				//
				uni.getUserInfo({
					provider: 'weixin',
					success(res) {
						console.log(res.userInfo)
						let user = res.userInfo
						// 保存在 小程序缓存当中
						uni.setStorage({
							key:'userInfo',
							data:res.userInfo
						})
						
						//接收信息展示
						_this.userInfo.nickName = user.nickName
						_this.userInfo.gender = user.gender
						_this.userInfo.avatarUrl = user.avatarUrl
						//注册
						api.registerWxUser(_this.key,_this.userInfo).then(registerRes=>{
							console.log('============================')
							console.log(registerRes)
						})
						//显示用户信息
						_this.islogin = true
					}
				})
				//// #endif

			},
			close(done) {
				done()
			},
			confirm(done) {

				//跳转
				uni.navigateTo({
					url:'../mine/mine'
				})
				done()
			}


		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #eeeeee;

		.mine-box {
			.user-login {
				padding: 20px 0;
				text-align: center;
				color: #007AFF;
				font-size: 34rpx;
				
				button{
					color: #007AFF;
					display: inline;
				}
				button::after {
					border: none;
				}
			}

			.user-box {
				background-color: #FFFFFF;
				// height: 200px;
				display: flex;
				padding: 0 20px;

				image {
					width: 60px;
					height: 60px;
					margin-right: 20px;
					border-radius: 6px;
				}

				.user-info {
					line-height: 32px;

					.user-name {
						font-weight: 600;
						font-size: 18px;
					}

					.user-number {
						color: #5d5d5d;
						font-size: 14px;
					}
				}
			}

			.user-article {
				padding: 0 20px;
				height: 50px;
				background-color: #FFFFFF;
				margin-top: 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mine-issue-title {
					height: 100%;
					align-items: center;
					display: flex;

					image {
						margin-right: 20px;
						width: 45rpx;
						height: 45rpx;
					}


				}

			}

			.user-great {
				padding: 0 20px;
				margin-top: 20px;
				height: 50px;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mine-issue-title {
					height: 100%;
					align-items: center;
					display: flex;

					image {
						margin-right: 20px;
						width: 45rpx;
						height: 45rpx;
					}

				}
			}

			.edu-link {
				padding: 0 20px;
				margin-top: 20px;
				height: 50px;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mine-issue-title {
					height: 100%;
					align-items: center;
					display: flex;

					image {
						margin-right: 20px;
						width: 45rpx;
						height: 45rpx;
					}

				}
			}

			.au-link {
				padding: 0 20px;
				margin-top: 20px;
				height: 50px;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mine-issue-title {
					height: 100%;
					align-items: center;
					display: flex;

					image {
						margin-right: 20px;
						width: 45rpx;
						height: 45rpx;
					}

				}
			}

			.about {
				padding: 0 20px;
				margin-top: 20px;
				height: 50px;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mine-issue-title {
					height: 100%;
					align-items: center;
					display: flex;

					image {
						margin-right: 20px;
						width: 45rpx;
						height: 45rpx;
					}

				}
			}


		}
	}
</style>
