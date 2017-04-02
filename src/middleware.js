/*
 * flow middleware
 * @Author slashhuang
 * 17/4/2
 */

module.exports = ctx=>middleware=>{
	return Promise.resolve({
            then:(resolve,reject)=>{
                if(typeof middleware!=='function'){
                    reject(new TypeError(`${middleware} is not a function`))
                }
                // call resolve to the next promiseflow
                // call reject to abort the flow to catch 
                if(middleware.listenerCount('start')>0){
                	// sync call start
                	 middleware.emit('start',{ ctx,resolve,reject})
                };
                middleware(ctx,resolve,reject).then(()=>{
                	// do nothing but emit end evnet
                	if(middleware.listenerCount('end')>0){
	                	// sync call start
	                	 middleware.emit('end',{ ctx,resolve,reject})
	                };

                })

        }
    })
}

 			