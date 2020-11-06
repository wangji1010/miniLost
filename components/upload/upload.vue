<template>
	<view class="upload" >
		<view class="upload-box" @click="uploadImg">
			<view class="upload-icon">+</view>
			<view class="upload-title">
				上传图片
			</view>
		</view>
		<view v-if="url!==''" class="show-image">
			<image :src="url" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				listFile:[],
				key:''
			};
		},
		onLoad() {
			const _this = this;
			uni.getStorage({
				key:'LOGIN',
				success:function(res){
					console.log(res.data)
					_this.key = res.data
				}
			})
		},
		methods:{
			uploadImg(){
				const _this = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFiles));
						_this.listFile = res.tempFiles
						console.log(_this.listFile)
						uni.uploadFile({
							
							url:'http://localhost:8090/lost/image/WX_LOGINLOGINd9d9516ff9601045f343ac1ad4df477eWX',
							name:'cover',
							filePath:_this.listFile[0].path,
							header: {
							'content-type': 'multipart/form-data'
							},
							success:function(upRes){
								console.log(upRes)
							},fail:function(error){
								console.log(error)
							}
						})
						
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload{
		.upload-box{
		width: 120px;
		height: 120px;
		border-radius: 6px;
		background-color: #f4f5f6;
		margin: 10rpx;
		text-align: center;
		vertical-align: middle;
		.upload-icon{
			font-size: 30px;
			color: #606266;
			padding: 20px 0;
		}
		.upload-title{
			padding: 20rpx;
			color: #606266;
		}
	}
	}
	
</style>
