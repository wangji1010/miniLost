<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录助校园</view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="账号" prop="username">
					<u-input focus type="text" v-model="form.username" placeholder="请输入用户名或邮箱" />
				</u-form-item>
				<u-form-item label="密码">
					<u-input v-model="form.password" type="password" placeholder="请输入密码" />
				</u-form-item>
				<!-- <u-form-item label="验证" class="test">
					<view class="">
						<u-input  v-model="form.captcha" type="text" placeholder="请输验证码"/>
					</view>
					
					<image src="../../static/logo.png" mode=""></image>
				</u-form-item> -->
				<view class="captcha">
					<view class="iput-cap">
						<text class="yanzheng">验证</text>
						<u-input height="120" v-model="captcha" type="text" placeholder="请输验证码"></u-input>
					</view>
					<image @click="updateCaptchaCode" :src="captchaPath" mode=""></image>
				</view>
				<view class="line"></view>

			</u-form>
			<!-- <view class="tips">未注册的手机号验证后自动创建美团账号</view> -->
			<u-button ripple shape='circle' type="success" @click="submit">登 录</u-button>
			<view class="alternative">
				<view class="password">没有账号？注册</view>
				<view class="issue">忘记密码？</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon">
						<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					QQ
				</view>
			</view>

		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from "@/utils/api.js"
	export default {
		data() {
			return {
				isLogin: true,
				captchaPath: 'http://localhost:8090/user/captcha',
				captcha:'',
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		
		onLoad() {

		},
		methods: {
			updateCaptchaCode() {
				this.captchaPath = 'http://localhost:8090/user/captcha?captcha_key=' +
					"&random" + Date.parse(new Date());
			},
			submit() {
				//检查数据
				if(this.form.username===''){
					this.$refs.uToast.show({
						title:'账号为空',
						type:'error'
					})
					return
				}
				if(this.form.password===''){
					this.$refs.uToast.show({
						title:'密码为空',
						type:'error'
					})
					return
				}
				if(this.captcha===''){
					this.$refs.uToast.show({
						title:'验证码为空',
						type:'error'
					})
					return
				}
				api.doLogin(this.form,this.captcha).then(res=>{
					console.log(res)
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			u-button {
				margin-top: 20px;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}
			.test{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.captcha {
				display: flex;
				justify-content: space-between;
				align-items: center;
				

				.iput-cap {
					display: flex;
					align-items: center;
					justify-content: space-between;

					text {
						
						padding-right: 20px;
					}
				}

			}
			.line{
				margin-bottom: 20px;
				height: 1rpx;
				background-color: #f4f4f5;
			}

			image {
				width: 100px;
				height: 40px;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(85, 170, 0);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 220rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
