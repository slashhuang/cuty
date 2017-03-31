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
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        context.onerror = context.onerror.bind(context);
        context.originalUrl = request.originalUrl = req.url;
        context.cookies = new Cookies(req, res, {
          keys: this.keys,
          secure: request.secure
        });
        context.accept = request.accept = accepts(req);
        context.state = {};
        return context;
   }
   flow(ctx,next){
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
            flow().then(()=>{
                res.end('flow walked through')
            }).catch(()=>{
                res.end(Buffer.from('hello world'))
            })
        }

    }
}
module.exports=Cuty;
