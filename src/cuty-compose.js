
/*
 * @Author slashhuang
 * 17/3/31
 * cuty-compose
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
                                // call middleware interceptor first
                                if(typeof interceptor=='function'){
                                    Promise.resolve({
                                        then:(res,rej)=>{
                                            interceptor(ctx,res,rej)
                                        }
                                    }).then(()=>{
                                        nextMiddleware(ctx,resolve,reject)
                                    }).catch(()=>{
                                        resolve()
                                    })
                                }else{
                                    nextMiddleware(ctx,resolve,reject)
                                }
                                
                        }})
            });
        }
        return chain
};