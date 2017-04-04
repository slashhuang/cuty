
// view server test
const viewMiddleware = (ctx,next)=>{
    Promise.resolve({
        then:(res,rej)=>{
            setTimeout(()=>{
                ctx.body='it is a html';
                next()
            },1000)
        }
    })

}
viewMiddleware.interceptor = (ctx,flow,cross)=>{
	  let { url } =ctx.req;
	  if(!url.match(/\.action/) && !url.match(/\./)){
      	flow()
      }else{
      	cross()
      }
};
module.exports = viewMiddleware