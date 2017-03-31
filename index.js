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
        if(!start || !end !controller){
            throw Error(`cuty's middlewareTree requires start,key,controller to signal data flow `)
        }
        this.middlewareTree = middlewareTree
    }
    parallel(){

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
   flow(ctx){
        let {start,end,controller} = this.middlewareTree;
        return Promise.resolve().then(()=>{
            return start(ctx,next).then(()=>{
                return this.parallel(controller)
            }).then(()=>{
                return end()
            })
        })
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
