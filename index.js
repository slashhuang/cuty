/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */

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
    flow(){
        return Promise.resolve().then(()=>{



        })
    }
    // use same api as koa@next
    callback(){

        return (req,res)=>{
            this.flow().then(()=>{
                res.end('flow walked through')
            }).catch(()=>{
                res.end(Buffer.from('hello world'))
            })
        }

    }
}
module.exports=Cuty;
