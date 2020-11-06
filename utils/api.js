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

//获取 失物信息
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

// 帖子 获取详情内容
export const getPostDetail = (id) =>{
	return http.requestGet(baseUrl+'/lost/post/select/'+id)
}

//帖子 获取评论信息
///portal/comment/list/1279270699466227712/1/10
export const getPostComment = (id,page,size) =>{
	return http.requestGet(baseUrl+'/lost/comment/'+id+'/'+page+'/'+size)
}
// 获取帖子评论的数量
export const getCommentCount = (id) =>{
	return http.requestGet(baseUrl+'/lost/comment/count/'+id)
}
//帖子 评论发布/lost/comment/addComment/{key}

export const postComment = (key,lostComment) =>{
	return http.requestPost(baseUrl+'/lost/comment/addComment/'+key,lostComment)
}

//获取子评论数量
export const getParentCommentCount = (parentId) =>{
	return http.requestGet(baseUrl+'/lost/comment/replyCount/'+parentId)
}

//获取子评论列表
export const getReplyCommentList = (parentId) =>{
	return http.requestGet(baseUrl+'/lost/comment/replyList/'+parentId)
}

//发布失物招领
export const addLostArticle = (key,lostArticle) =>{
	return http.requestPost(baseUrl+'/lost/article/insert/'+key,lostArticle)
}

//http://localhost:8090/lost/article/selectByLF/1/5/2
//查询 丢失  拾到
export const getSelectByLF = (page,size,type) =>{
	return http.requestGet(baseUrl+'/lost/article/selectByLF/'+page+'/'+size+'/'+type);
}

//http://localhost:8090/lost/article/select/1323888565775499264
//查询 失物详情
export const getLostDetail = (id) =>{
	return http.requestGet(baseUrl+'/lost/article/select/'+id);
}


//查询 评论数量 getLostCommentCount 
 export const getLostCommentCount = (id) =>{
 	return http.requestGet(baseUrl+'/lost/comment/count/'+id);
 }
 
 //getCommentList
 //查询 评论列表 http://localhost:8090/lost/comment/423542/1/5
  export const getLostCommentList = (id) =>{
  	return http.requestGet(baseUrl+'/lost/comment/'+id+'/1/9999');
  }
  
  //获取在自己的帖子
  export const getMinePostList = (key) =>{
  	return http.requestGet(baseUrl+'/lost/user/getMinePost/'+key);
  }
  
  //获取自己的失物信息
  export const getMineLostList = (key) =>{
  	return http.requestGet(baseUrl+'/lost/user/getMineLost/'+key);
  }
  