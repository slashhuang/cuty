

// api server test
const apiMiddleware = (ctx,next)=>{
    Promise.resolve({
        then:(res,rej)=>{
            setTimeout(()=>{
                ctx.body='it is a api from backend';
                next()
            },1000)
        }
    })

}
apiMiddleware.interceptor = (ctx,flow,cross)=>{
	  let { url } =ctx.req;
      if(url.match(/\.action/)){
      	flow()
      }else{
      	cross()
      }
}
module.exports=apiMiddleware