<script>
	import * as api from "@/utils/api.js"
	export default {
		onLaunch: function() {
			console.log('App onLaunch')
			uni.login({
				provider:'weixin',
				success(res) {
					console.log(res)
					if(res.code){
						//请求后端接口生成  openId 、 session——key
						 api.wxOS(res.code).then(res1=>{
							 console.log(res1)
							 if(res1.status===200){
								 //将ticket 保存在小程序缓存当中
								 uni.setStorage({
								 	key:'LOGIN',
									data:res1.ticket,
									success() {
										
									},fail(err) {
										console.log(err)
									}
								 })
							 }else{
								 console.log('授权失败')
							 }
						 })
						 
					}else{
						console.log('调用失败')
					}
				}
			})
			
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
