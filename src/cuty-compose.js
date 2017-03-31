
/*
 * @Author slashhuang
 * 17/3/31
 * cuty-compose
 */


 module.exports = (middlewareArray)=>{
        let { length } = middlewareArray;
        return (ctx)=>{
            let count = 0;
            let chain = Promise.resolve();
            while(count<length){
                //use thenable to queued to microtask
                let nextMiddleware = middlewareArray[count];
                console.log(nextMiddleware.toString())
                chain = chain.then(()=>
                    Promise.resolve({
                        then:(resolve,reject)=>{
                            if(typeof nextMiddleware!=='function'){
                                reject(new TypeError(`${nextMiddleware} is not a function`))
                            }
                            nextMiddleware(ctx,resolve)
                        }
                }));
                count++;
            }
            return chain
        }
   }