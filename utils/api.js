import http from "./http.js"

// const baseUrl = 'https://api.sunofbeach.net/shop'
const baseUrl = 'http://localhost:8090'

export const getTest = () =>{
	return http.requestGet(baseUrl+'/discovery/categories')
}

export const getpostListByPage = (page) =>{
	return http.requestGet(baseUrl+'/lost/post/'+page+'/5')
}

export const getGreatPostCount = (id) =>{
	return http.requestGet(baseUrl+'/lost/great/countGreate/'+id)
}

export const getLostByPage = (page) =>{
	return http.requestGet(baseUrl+'/lost/article/select/'+page+'/5')
}

export const checkUserLogin = () =>{
	return http.requestGet(baseUrl+'/user/check-token')
}

//登录
export const doLogin = (user,captcha) =>{
	return http.requestPost(baseUrl+'/user/login/'+captcha,user)
}

//微信code 请求后端
export const wxOS = (code) =>{
	return http.requestGet(baseUrl+'/lost/user/login/'+code)
}

//注册
export const registerWxUser = (key,userInfo) =>{
	return http.requestPost(baseUrl+'/lost/user/register?avatarUrl='
	+userInfo.avatarUrl+'&gender='+userInfo.gender+'&key='+key+'&nickName='+userInfo.nickName)
}

//帖子发布
export const addPost = (key,post) =>{
	return http.requestPost(baseUrl+'/lost/post/insert?key='+key,post)
}
