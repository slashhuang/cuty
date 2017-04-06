/*
 * Cuty main logic
 * @Author slashhuang
 * github.com/slashhuang/cuty
 */
const Cookies = require('cookies');
const debug = require('debug')
const cutyCompose = require('./cuty-compose');
const response = require('./response');
const context = require('./context');
const request = require('./request');
const accepts = require('accepts');

class Cuty {
    constructor(){
        this.middlewareArr=[];
        this.env = process.env.NODE_ENV || 'development';
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    use(middleware){
        if(Array.isArray(middleware)){
             this.middlewareArr = this.middlewareArr.concat(middleware)
        }else{
            if(typeof middleware!=='function'){
                throw TypeError(`cuty's middleware should be a function or function array`)
            };
            this.middlewareArr.push(middleware)
        }
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
        context.originalUrl = request.originalUrl = req.url;
        context.cookies = new Cookies(req, res, {
          keys: this.keys,
          secure: request.secure
        });
        request.ip = request.ips[0] || req.socket.remoteAddress || '';
        context.accept = request.accept = accepts(req);
        context.state = {};
        return context;
   }
    // use same api as koa@next
    callback(){
        let flow = cutyCompose(this.middlewareArr)
        return (req,res)=>{
            let ctx = this.createContext(req,res);
            flow(ctx).then(()=>{
                res.end(ctx.body)
            }).catch((error)=>{
                res.end(error.stack)
            })
        }

    }
}
module.exports=Cuty;
