/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */
const Cookies = require('cookies');
const debug = require('debug')
const cutyCompose = require('./middleware-compose');
class Cuty {
    constructor(){
        this.middlewareArr=[];
    }
    use(middleware){
        if(Array.isArray(middleware)){
             this.middlewareArr = this.middlewareArr.concat(middleware)
        }else{
            if(typeof middleware!=='function'){
                throw TypeError(`cuty's middlewareTree requires start,key,controller AS middlewareTree `)
            };
            this.middlewareArr.push(middleware)
        }
    }
    createContext(req, res) {
        let context = {};
        context.req = req;
        context.res = res;
        //shape for last output
        context.cookies = new Cookies(req, res, {
          keys: this.keys,
          secure: req.secure
        });
        //requse response context
        context.req.ctx={}
        context.res.ctx={}
        //last output
        context.body=''
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
