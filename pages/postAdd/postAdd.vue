<template>
	<view class="post-add-box">
		<u-toast ref="uToast" />
		<u-form-item label="标题">
			<input focus type="text" value="" v-model="post.title" placeholder="请输入帖子标题" />
		</u-form-item>

		<text>描述</text>
		<textarea style="border-radius: 4px; margin-bottom: 20px; border: 1px solid #EEEEEE; height: 70px; width: 100%; padding-left: 10px; padding-top: 10px; "
		 placeholder="内容描述" v-model="post.summary" />

		<text>内容</text>
		<textarea 
		style="border-radius: 4px; margin-bottom: 20px; border: 1px solid #EEEEEE; width: 100%; padding-left: 10px; padding-top: 10px; " 
		placeholder-style="color:#F76260" 
		placeholder="主题内容" v-model="post.content"/>
		<u-button type="success" ripple @click="addPost()">发 布</u-button>
		
	</view>
</template>

<script>
	import * as api from "@/utils/api.js"
	export default {
		data() {
			return {
				post:{
					title:'',
					summary:'',
					content:''
				},
				key:''
			}
		},
		onLoad() {
			
		},
		methods: {
			addPost(){
				const _this = this;
				//获取当前的key
				uni.getStorage({
					key:'LOGIN',
					success(resLogin) {
						_this.key = resLogin.data;
					}
				})
				//发布帖子
				api.addPost(_this.key,_this.post).then(res=>{
					console.log(res)
					if(res.code!==200){
						this.$refs.uToast.show({
						title: res.message,
						type: 'error'
					})
					}else{
						this.$refs.uToast.show({
							title: '发布成功',
							type: 'success',
							isTab:true,
							url:'pages/post/post'
						})
					}
					
				})
			},
			showToast() {
				
			}

		}
		
		
	}
</script>

<style lang="scss">
	.post-add-box {
		margin: 14px 20px;
		text{
			display: block;
			margin-top: 20px;
			margin-bottom: 20px;
		}

		
	}
</style>
