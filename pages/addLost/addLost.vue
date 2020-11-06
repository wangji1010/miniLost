<template>
	<view class="post-add-box">
		<u-toast ref="uToast" />
		<u-form-item label="名称">
			<input focus type="text" value="" v-model="lostArticle.title" placeholder="请输入失物名称" />
		</u-form-item>

		<text>描述</text>
		<textarea style="border-radius: 4px; margin-bottom: 20px; border: 1px solid #EEEEEE; height: 70px; width: 100%; padding-left: 10px; padding-top: 10px; "
		 placeholder="简单描述一下吧  ( 如:丢失手机,白色,小米10 )" v-model="lostArticle.summary" />

		<u-radio-group v-model="value" @change="radioGroupChange">
		 			<u-radio 
					
					active-color="green"
		 				name=1
		 			>
		 				拾到
		 			</u-radio>
					<u-radio
					
						active-color="red"
						name=2
					>
						丢失
					</u-radio>
		</u-radio-group>
		
		<u-form-item label="联系">
			<input type="number" value="" v-model="lostArticle.contact" placeholder="请输入联系方式" />
		</u-form-item>
		
		<text>图片</text>
		<u-upload
		@child="getImageUrl"
		:header=header
		 :action="'http://localhost:8090/lost/image/'+key"
		 :max-size="1 * 1024 * 1024" 
		 max-count="1" ></u-upload>
		 
		<!-- <m-upload
		 :header=headers
		 :max-size="1 * 1024 * 1024" 
		 max-count="1"
		  :action="'http://localhost:8090/lost/image/'+key">
		  </m-upload> -->
		  <!-- <upload></upload> -->
		
		<text>内容</text>
		<textarea 
		style="border-radius: 4px; margin-bottom: 20px; border: 1px solid #EEEEEE; width: 100%; padding-left: 10px; padding-top: 10px; " 
		placeholder-style="color:#F76260" 
		placeholder="详细内容" v-model="lostArticle.content"/>
		
		<u-button type="success" ripple @click="addPost">发 布</u-button>
		
		 
		
	</view>
</template>

<script>
	import m_upload from '@/components/m-upload/m-upload'
	import upload from '@/components/upload/upload'
	import * as api from '@/utils/api'
	export default {
		components:{m_upload,upload},
		data() {
			return {
				value:1,
				state:'success',
				key:'',
				headers: { 'Content-Type': 'multipart/form-data' },
				lostArticle:{
					id:'',
					title:'',
					categoryId:'',
					summary:'',
					type:1,
					contact:'',
					content:'',
					cover:''
				}
			}
		},
		onLoad() {
			const _this = this;
			uni.getStorage({
				key:'LOGIN',
				success:function(res){
					_this.key = res.data
				}
			})
		},
		methods: {
			//发布失物招领
			async addPost(){
				//检查必备数据
				if(this.lostArticle.title===''){
					this.$refs.uToast.show({title: '标题为空',type: 'error'})
					return
				}
				if(this.lostArticle.summary===''){
					this.$refs.uToast.show({title: '描述为空',type: 'error'})
					return
				}
				if(this.lostArticle.contact===''){
					this.$refs.uToast.show({title: '联系方式为空',type: 'error'})
					return
				}
				if(this.lostArticle.content===''){
					this.$refs.uToast.show({title: '详细内容为空',type: 'error'})
					return
				}
				let res = await api.addLostArticle(this.key,this.lostArticle)
				if(res.code===200){
					//提示，提到转到 失物招领页面
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						url:'pages/lost/lost',
						isTab:true
					})
				}else{
					this.$refs.uToast.show({
						title: res.message,
						type: 'error'
					})
				}
			},
			radioGroupChange(e){
				console.log(e)
				this.lostArticle.type = e
			},
			
			beforeUpload(index,list) {
				this.beforeAvatarUpload(list)  
			},
			beforeAvatarUpload(file) {
				let param = {};
				param.imgType = "lung";
				param.visitId = uni.getStorageSync("visitorItem").id;
				uni.uploadFile({
					url: 'http://localhost:8090/lost/image/'+this.key,//你上传接口
					filePath:file[0].url,
					success: (res) => {
									console.log(res)
									
								},
								fail: (err) => {
									console.log(err)
								}
					});
				},
				getImageUrl(data){
					this.lostArticle.cover = data;
					
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
