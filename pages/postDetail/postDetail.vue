<template>
	<view class="post-detail-box">
		<view class="post-title-ingo">
			<text style="font-weight: 600; ">int占几个字节啊？</text>
			<text class="tag">热门</text>
		</view>
		<view class="post-date-info">
			<text>发布时间：2020-10-25 </text>
			<view class="read-commend">
				<view class="view-box">
					<u-icon name="eye" size="28"></u-icon>
					<text>211</text>
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
			<text>建议把java的编程思想这边呢数开发环境但他看机会蛋
			糕iuds结晶硅加热即刻开放给i九二几位
			，昆明咖啡馆你惹我华国锋及JFKjk.kigfjewoj，看i额我很反感i任内阁
			飓风和我感觉囧和顾客热键iu人家给就</text>
		</view>
		<view class="comment-sum-box">
			<text>评论</text>
			<view class="">
			<text style="color: #f0674f; font-size: 16px;"> 6 </text>
			 <text>条回答</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			console.log(option.id)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.post-detail-box{
		padding: 20px;
		font-family: 微软雅黑;
		.post-title-ingo{
			.tag{
				font-size: 12px;
				margin-left: 20px;
				font-family: 微软雅黑;
				padding: 2px 8px;
				background-color: #f0674f;
				color: #FFFFFF;
				border-radius: 4px;
			}
		}
		.post-date-info{
			margin-top: 20px;
			color: #a7a9ad;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text{
				font-size: 12px;
			}
			.read-commend{
				display: flex;
				margin-right: 40px;
				font-size: 12px;
				.view-box{
					margin-right: 30px;
				}
			}
			
		}
		.post-content-box{
			line-height: 28px;
			font-size: 14px;
			padding-top: 24px;
			color: #4f4f4f;
			margin-bottom: 16px;
		}
		.comment-sum-box{
			border-top: 1px #EEEEEE solid;
			border-bottom: 1px #EEEEEE solid;
			padding-bottom: 20px;
			padding-top: 20px;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
