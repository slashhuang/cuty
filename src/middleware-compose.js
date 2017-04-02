
/*
 * @Author slashhuang
 * 17/3/31
 * cuty-compose
 */

 const util = require('util');
 const eventEmitter = require('events');
 const middlewarePromise = require('./middleware');

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
                let nextMiddleware = middlewareArray[count];
                mixin(nextMiddleware);
                chain = chain.then(()=>middlewarePromise(ctx)(nextMiddleware));
                count++;
            }
            return chain
        }
   }