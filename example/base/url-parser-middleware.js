
// url parser
module.exports=(ctx,next)=>{
    let { method } = ctx;
    if(method=='post' || method =='put'){
         Promise.resolve({
            then:(res,rej)=>{
                let body = '';
                ctx.request.on('data',(chunk)=>{
                    body += chunk;
                }).on('end',()=>{
                    ctx.request.body = body;
                    next();
                })
                setTimeout(()=>{
                    ctx.body='it is a html';
                    next()
                },1000)
            }
        })
     }else{
        next()
     }
}
