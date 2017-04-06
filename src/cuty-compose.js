
/*
 * @Author slashhuang
 * 17/3/31
 * github.com/slashhuang/cuty
 */

 const util = require('util');
 const eventEmitter = require('events');

 module.exports = middlewareArray=>ctx=>{
        let chain = Promise.resolve();
        for (let nextMiddleware of middlewareArray){
            chain = chain.then(()=>{
                return  Promise.resolve({
                            then:(resolve,reject)=>{
                                let { interceptor } = nextMiddleware;
                                // middleware have its own error handling
                                if(typeof interceptor=='function'){
                                    Promise.resolve({
                                        then:(res,rej)=>{
                                            // call middleware interceptor first
                                            interceptor(ctx,res,rej)
                                        }
                                    }).then(()=>{
                                        nextMiddleware(ctx,resolve,reject)
                                    }).catch((error)=>{
                                        if(error){
                                            // throw interceptor and middleware error
                                            reject(error)
                                        }else{
                                             // go to next middleware
                                            resolve()
                                        }
                                    })
                                }else{
                                    nextMiddleware(ctx,resolve,reject)
                                }

                        }})
            });
        }
        return chain
};