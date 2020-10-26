export default{
	//get
	 requestGet(url,params={}){
	    return new Promise(((resolve, reject) => {
			uni.request({
				url:url,
				data:params,
				method:'GET',
				success(res) {
					resolve(res.data)
				},
				fail(err){
					reject(err)
				}
			})
	    }))
	  },
	  requestPut(url,params={}){
	     return new Promise(((resolve, reject) => {
	  			uni.request({
	  				url:url,
	  				data:params,
	  				method:'PUT',
	  				success(res) {
	  					resolve(res.data)
	  				},
	  				fail(err){
	  					reject(err)
	  				}
	  			})
	     }))
	   },
	   requestPost(url,params={}){
	      return new Promise(((resolve, reject) => {
	   			uni.request({
	   				url:url,
	   				data:params,
	   				method:'POST',
	   				success(res) {
	   					resolve(res.data)
	   				},
	   				fail(err){
	   					reject(err)
	   				}
	   			})
	      }))
	    },
		requestDelete(url,params={}){
		   return new Promise(((resolve, reject) => {
					uni.request({
						url:url,
						data:params,
						method:'DELETE',
						success(res) {
							resolve(res.data)
						},
						fail(err){
							reject(err)
						}
					})
		   }))
		 },
}