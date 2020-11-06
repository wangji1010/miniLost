<template>
	<view class="container">
		<u-toast ref="uToast" />
		<textarea style="height: 230px;
			 padding: 10px;
			   width: 670rpx;
				background-color: #CCCCCC;" placeholder="文明评论,完成后点击下方按钮提交,请勿违规"
		 focus v-model="lostComment.content" />
		<button type="primary" @tap="submit">发 布</button>
			
	 </view>
</template>

<script>
	import * as api from '@/utils/api'
	export default {
		data() {
			return {
				placeholder:' 添加评论，完成后点击下方提交按钮,请勿发违规内容',
				lostComment:{
					postId:'',
					content:''
				},
				key:''
			}
		},
		onLoad(option) {
			const _this = this;
			this.lostComment.postId = option.id
			uni.getStorage({
				key:'LOGIN',
				success(res) {
					_this.key = res.data
				}
			})
		},
		methods: {
			submit(){
				const _this = this;
				api.postComment(this.key,this.lostComment).then(res=>{
					console.log(res)
					if(res.code===200){
						_this.$refs.uToast.show({
							title: res.message,
							type: 'success',
							// url:'pages/postDetail/postDetail'
							callback:function(){
								uni.navigateBack({
									  delta: 1,
									    animationType: 'pop-out',
									    animationDuration: 200
								})
							} 
						})
					}else{
						_this.$refs.uToast.show({
							title: res.message,
							type: 'error'
						})
					}
					
					
				})
			},
			showErrorToast() {
				
			},
			showSuccessToast() {
				
			}
		}
	}
</script>

<style>
  .container {
        padding: 10px;
    }
	
	
	
   

    button {
        margin-top: 10px;
    }
</style>
