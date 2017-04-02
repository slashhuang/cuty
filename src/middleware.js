/*
 * flow middleware
 * @Author slashhuang
 * 17/4/2
 */

module.exports = ctx=>middleware=>{
	//use thenable to queued to microtask to avoid autorun sync
	return Promise.resolve({
	            then:(resolve,reject)=>{
	                if(middleware.listenerCount('start')>0){
	                	 middleware.emit('start',{ ctx,resolve,reject})
	                };
	                middleware(ctx,resolve,reject)
	        }}).then(()=>{
	    		// do nothing but emit end evnet
	         	if(middleware.listenerCount('end')>0){
		          // sync call start
		           middleware.emit('end',{ ctx,resolve,reject})
		       };
	    })
}

 			