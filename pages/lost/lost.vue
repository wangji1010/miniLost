<template>
	<view class="lost-box">
		<view class="lost-content-item" v-for="item in lost" :key='item.id'>
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
					<uni-tag v-if="item.type===1" text="丢失" 
					type="error" size="small" 
					></uni-tag>
					<uni-tag v-if="item.type===2" text="拾到"
					type="success" size="small" 
					></uni-tag>
				</view>
			</view>
			<view class="lost-title">
				{{item.title}}
			</view>
			<view class="lost-summary">
				{{item.summary}}
			</view>
			<view class="lost-img">
				<image  :src="item.cover" mode=""></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import mnavbar from "@/components/mnavbar/mnavbar.vue"
	import * as api from "@/utils/api.js"
	export default {
		components: {uniTag,uniNavBar,mnavbar},
		data() {
			return {
				 page:1,
				 lost:[]
			}
		},
		 onLoad(){
		          this.getLostByPage()
		        },
		methods: {
			async getLostByPage(){
				let res = await api.getLostByPage(this.page)
				console.log(res)
				if(res.code===200){
					this.lost = res.data.records
				}
			}
		}
	}
</script>

<style lang="scss">
	.lost-box{
		padding: 0 40rpx;
			
				uni-nav-bar{
					
				}
			
			.lost-content-item{
				overflow: hidden;
				position: relative;
				margin-top: 20rpx;
				border-radius: 18rpx;
				// height: 400rpx;
				padding: 20rpx 45rpx;
				background-color: #FFFFFF;
				box-shadow: 0 0 3px 3px rgba(0,0,0,.1);
				.lost-info{
					display: flex;
					justify-content: start;
					vertical-align: middle;
					line-height: 30rpx;
					padding-top: 30rpx;
					image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 4rpx;
						}
					.user-info{
						margin-left: 20rpx;
						.username{
							font-size: 24rpx;
						}
						.createTime{
							font-size: 18rpx;
						}
					}	
					.type-tag{
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
				.lost-title{
					margin-top: 20rpx;
					line-height: 40rpx;
					font-size: 30rpx;
				}
				.lost-summary{
					margin-top: 4rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
				}
				.lost-img{
					display: flex;
					justify-content: space-around;
					image{
						// margin-right: 60rpx;
						width: 120rpx;
						height: 120rpx;
					}
				}
				
			}
	}
	
</style>
