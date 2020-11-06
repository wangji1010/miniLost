<template>
	<view class="lost-box">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
			</view>
		</u-navbar>
		<!-- 	<view class="status_bar">
			<mnavbar></mnavbar>
		</view> -->



		<view @click="toLostDetail(item.id)" class="lost-content-item" v-for="item in lost" :key='item.id'>
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
		<!-- <view class="addLost" @click="toAddLost">
			<image src="../../static/icon/add.png" mode=""></image>
		</view> -->

		<uni-fab :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import * as api from "@/utils/api.js"
	export default {
		components: {
			uniTag,
			uniFab

		},
		data() {
			return {
				page: 1,
				size: 5,
				type: 1,
				lost: [],
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
						active: false
					},
					{
						iconPath: '/static/icon/lost.png',
						selectedIconPath: '/static/icon/lostSelect.png',
						text: '丢失',
						active: false
					},
					{
						iconPath: '/static/icon/all.png',
						selectedIconPath: '/static/icon/allSelect.png',
						text: '全部',
						active: true
					},
					{
						iconPath: '/static/icon/bianxie.png',
						selectedIconPath: '/static/icon/bianxieSelect.png',
						text: '添加',
						active: false
					}
				]

			}
		},
		onPullDownRefresh() {
			this.lost = []
			this.page = 1
			this.content[0].active = false;
			this.content[1].active = false;
			this.content[2].active = true;
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
			this.getLostByPage()
		},
		onReachBottom() {
			this.page++
			this.getLostByPage()
			
			console.log('lost触底')
		},
		onShow() {
			const _this = this;
			//下拉刷新
			uni.startPullDownRefresh({
				success() {

					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 1000)
				}
			})

		},
		onLoad() {
			this.getLostByPage()
		},
		methods: {
			toLostDetail(id){
				uni.navigateTo({
					url:'../LostDeatil/LostDeatil?id='+id
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
					this.lost=[]
					this.getSelectByLF()

				} else if (e.index === 1) {
					this.content[1].active = true;
					this.content[0].active = false;
					this.content[2].active = false;
					this.type = 2;
					this.page = 1
					this.lost=[]
					this.getSelectByLF()
				} else if (e.index === 2) {
					this.content[2].active = true;
					this.content[1].active = false;
					this.content[0].active = false;
					this.page = 1
					this.lost=[]
					this.getLostByPage()
					
				}else if (e.index === 3) {
					//添加
					this.toAddLost()
				}

			},
			async getLostByPage() {
				let res = await api.getLostByPage(this.page)
				console.log(res)
				if (res.code === 200) {
					// this.lost = res.data.records
					this.lost = this.lost.concat(res.data.records)
				}
			},
			getSelectByLF() {
				api.getSelectByLF(this.page, this.size, this.type).then(res => {
					console.log(res)
					this.lost = this.lost.concat(res.data.records) 
				})
			},
			toAddLost() {
				// uni.navigateTo({
				// 	url:'../addLost/addLost'
				// })
 
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
							url: '../addLost/addLost'
						})
					},
					fail() {
						uni.switchTab({
							url: '../mine/mine'
						})
					}
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
	.lost-box {
		padding: 0 40rpx;

		.slot-wrap {
			display: flex;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 30rpx;
		}

		.status_bar {
			display: flex;
			align-items: center;
			// height: var(--status-bar-height);
			height: 66px;
			width: 100%;

		}

		.addLost {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			position: fixed;
			bottom: 106px;
			right: 20px;
			background-color: #FFFFFF;

			image {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}

		}

		uni-nav-bar {}

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
</style>
