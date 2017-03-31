/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */

class Cuty {
    constructor(){
        this.middleware=[];

    }
    useParallel(){


    }
    use(middleware){
        this.middleware.push(middleware)
    }
    // use same api as koa@next
    callback(){

        return (req,res)=>{

            res.end(Buffer.from('hello world'))


        }

    }
}
module.exports=Cuty;
