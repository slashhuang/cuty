
/*
 * @Author slashhuang
 * 17/3/31
 * cuty-compose
 */

 const util = require('util');
 const eventEmitter = require('events');

 module.exports = (middlewareArray)=>{
        let { length } = middlewareArray;
        return (ctx)=>{
            let count = 0;
            let chain = Promise.resolve();
            while(count<length){
                let nextMiddleware = middlewareArray[count];
                chain = chain.then(()=>{
                    return  Promise.resolve({
                                then:(resolve,reject)=>{
                                    nextMiddleware(ctx,resolve,reject)
                            }})
                });
                count++;
            }
            return chain
        }
   }