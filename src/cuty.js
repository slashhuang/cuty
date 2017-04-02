/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */
const Cookies = require('cookies');
const debug = require('debug')
const cutyCompose = require('./cuty-compose');
class Cuty {
    constructor(){
        this.middlewareTree={};
    }
    use(middlewareTree){
        let {start,end,controller} = middlewareTree;
        if(!start || !end || !controller){
            throw TypeError(`cuty's middlewareTree requires start,key,controller AS middlewareTree `)
        }
        this.middlewareTree = middlewareTree
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
        let {start,end,controller} = this.middlewareTree;
        let flow = cutyCompose([start,controller,end])
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
