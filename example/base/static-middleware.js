

// static server test
const staticMiddleware = (ctx,next)=>{
    Promise.resolve({
        then:(res,rej)=>{
            setTimeout(()=>{
                ctx.body='it is a css';
                next()
            },1000)
        }
    })

}
staticMiddleware.interceptor = (ctx,flow,cross)=>{
	  let { url } =ctx.req;
      if(!url.match(/\.action/) && url.match(/\./)){
      	flow()
      }else{
      	cross()
      }
};
module.exports = staticMiddleware