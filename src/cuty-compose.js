
/*
 * @Author slashhuang
 * 17/3/31
 * cuty-compose
 */

 const util = require('util');
 const eventEmitter = require('events');
 // middleware eventEmitter
 const mixin= (middleware)=>{
     util.inherits(middleware,eventEmitter);
 }

 module.exports = (middlewareArray)=>{
        let { length } = middlewareArray;
        return (ctx)=>{
            let count = 0;
            let chain = Promise.resolve();
            while(count<length){
                //use thenable to queued to microtask
                let nextMiddleware = middlewareArray[count];
                mixin(nextMiddleware);
                chain = chain.then(()=>
                    Promise.resolve({
                        then:(resolve,reject)=>{
                            if(typeof nextMiddleware!=='function'){
                                reject(new TypeError(`${nextMiddleware} is not a function`))
                            }
                            // call resolve to the next promiseflow
                            // call reject to abort the flow to catch 
                            nextMiddleware(ctx,resolve,reject)
                        }
                }));
                count++;
            }
            return chain
        }
   }