/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */
const Cookies = require('cookies');
const debug = require('debug')

class Cuty {
    constructor(){
        this.middlewareTree={};
    }
    use(middlewareTree){
        let {start,end,controller} = middlewareTree;
        if(!start || !end || !controller){
            // throw Error(`cuty's middlewareTree requires start,key,controller to signal data flow `)
        }
        this.middlewareTree = middlewareTree
    }
    createContext(req, res) {
        context.req = req;
        context.res = res;
        //shape for last output
        context.cookies = new Cookies(req, res, {
          keys: this.keys,
          secure: request.secure
        });
        //requse response context
        context.req.ctx={}
        context.res.ctx={}
        //last output
        context.body=''
        return context;
   }
   parallel(controller){

   }
   composeChain(middlewareArray){
        let { length } = middlewareArray;
        return (ctx)=>{
            let count = 0;
            let chain = Promise.resolve();
            while(count>length){
                //use thenable to queued to microtask
                let nextMiddleware = middlewareArray[count];
                chain = chain.then(()=>
                    Promise.resolve({
                        then:(resolve,reject)=>{
                            if(typeof nextMiddleware!=='function'){
                                reject(new TypeError(`${nextMiddleware.name} is not a function`))
                            }
                            nextMiddleware(ctx,resolve)
                        }
                }));
                count++;
            }
            return chain
        }
   }
   flow(){
        let {start,end,controller} = this.middlewareTree;
        return this.composeChain([
                    start,
                    this.parallel(controller),
                    end
                ])
    }
    // use same api as koa@next
    callback(){
        let flow =  this.flow();
        return (req,res)=>{
            let ctx = this.createContext(req,res);
            flow(ctx).then(()=>{
                res.end('flow walked through')
            }).catch(()=>{
                res.end(Buffer.from('hello world'))
            })
        }

    }
}
module.exports=Cuty;
