<template>
	<view class="index-box">
		<view class="index-box-top">
			<view class="top-content">
				<image src="../../static/logo.png" mode=""></image>
				<view class="top-title">
					<view class="title-content">
						<view class="t1">校园帮 v2.0</view>
						<view class="t2">----校园助手</view>
					</view>
				</view>
			</view>
			<view class="bottom-title">
				不忘初心 、牢记使命
			</view>

		</view>
		
		<view class="index-box-midlle">
			<view class="midlle-title">
				<text>学院公告</text>
				<text>更多</text>
			</view>
			<view class="line"></view>
			<view class="content-item" v-for="item in 4" >
				2020-2021学年 第一学期第六周安排表45645
			</view>
		</view>
		<view class="index-box-bottom">
			<view class="midlle-title">
				<text>app公告</text>
				<text>更多</text>
			</view>
			<view class="line"></view>
			<view class="content-item" v-for="item in 4" >
				2020-2021学年 第一学期第六周安排表45645
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你当前还未登录,为了更好的体验建议先登录账号哦!" message="你当前还未登录,为了更好的体验建议先登录账号哦!" :duration="2000"
			 :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.testLogin()
			this.checkLogin()
		},
		methods: {
				testLogin(){
					const _this = this
					uni.getStorage({
						key:'userInfo',
						success:function(res){
							
							console.log(res.data)
							
						},fail() {
							_this.$refs.popup.open()	
							console.log('没有数据')
						}
					})
					
				},
				checkLogin(){
					
					//检查 是否允许获取信息
					uni.getStorage({
						key:'userInfo',
						success:function(){
							
						},fail() {
							this.$refs.popup.open()	
						}
					})
					
				},
				close(done) {
					
					done()
				},
				confirm(done) {
					//跳转
					uni.switchTab({
						url:'../mine/mine'
					})
					done()
				}
		}
	}
</script>

<style lang="scss">
	.index-box {
		// width: 730rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		
		.index-box-top {
			border-radius: 24rpx;
			margin-top: 20rpx;
			width: 100%;
			height: 320rpx;
			background-color: #ffffff;
			// border: 1px solid #cccccc;
			box-shadow: 0 0 3px 3px rgba(0,0,0,.1);

			.top-content {
				text-align: center;
				padding-top: 15%;

				image {
					width: 120rpx;
					height: 120rpx;
				}

				.top-title {
					margin-left: 30rpx;
					display: inline-block;
					.title-content{
						
						line-height: 70rpx;
						.t1{
							font-size: 50rpx;
						}
						.t2{
							color: #c6c6c6;
							font-size: 20rpx;
							text-align: left;
						}
					}
				}
			}
			.bottom-title{
				padding-top: 20rpx;
				text-align: center;
				color: #8a8a8a;
				font-size: 25rpx;
				}

		}
		
		
		.index-box-midlle {
			border-radius: 24rpx;
			margin-top: 20rpx;
			width: 100%;
			height: 320rpx;
			background-color:#0199cb;
			.midlle-title{
				padding: 20rpx 20rpx 12rpx 20rpx;
				color: #FFFFFF;
				font-weight: 550;
				font-size: 28rpx;
				font-family: 微软雅黑;
				display: flex;
				justify-content: space-between;
				}
				.line{
					margin: 0 20rpx;
					height: 2rpx;
					background-color: #eeeeee;
				}
				.content-item{
					padding: 10rpx 20rpx;
					color: #fff;
					font-size: 26rpx;
					overflow: hidden;
					}
		}

		.index-box-bottom {
			border-radius: 24rpx;
			margin-top: 20rpx;
			width: 100%;
			height: 320rpx;
			background-color:#0199cb;
			.midlle-title{
				padding: 20rpx 20rpx 12rpx 20rpx;
				color: #FFFFFF;
				font-weight: 550;
				font-size: 28rpx;
				font-family: 微软雅黑;
				display: flex;
				justify-content: space-between;
				}
				.line{
					margin: 0 20rpx;
					height: 2rpx;
					background-color: #eeeeee;
				}
				.content-item{
					padding: 10rpx 20rpx;
					color: #fff;
					font-size: 26rpx;
					overflow: hidden;
					}
		}
	}
</style>
