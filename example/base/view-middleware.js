
// view server test
module.exports=(ctx,next)=>{

    Promise.resolve({
        then:(res,rej)=>{
            setTimeout(()=>{
                ctx.body='it is a html';
                next()
            },1000)
        }
    })

}