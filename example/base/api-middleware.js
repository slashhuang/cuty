

// api server test
module.exports=(ctx,next)=>{

    Promise.resolve({
        then:(res,rej)=>{
            setTimeout(()=>{
                ctx.body='it is a api from backend';
                next()
            },1000)
        }
    })

}