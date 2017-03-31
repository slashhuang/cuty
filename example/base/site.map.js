// site map for base


//middleware
const log = require('./log-middleware');
const view = require('./view-middleware');
const api = require('./api-middleware');
const static = require('./static-middleware');
const urlParser = require('./url-parser-middleware');

module.exports = {
    start:urlParser,
    controller:(ctx,next)=>{
        let { url } =ctx.req;
        if(url.match(/\.action/)){
            return api(ctx,next)
        }else if(url.match(/\./)){
            return static(ctx,next)
        }else{
            return view(ctx,next)
        }
    },
    end:log
}