/*
 * Cuty main logic
 * @Author slashhuang
 * 17/3/31
 */


class Cuty {


    // use same api as koa@next
    callback(){

        return (req,res)=>{




            res.end(Buffer.from('hello world'))



        }

    }



}




module.exports=Cuty;