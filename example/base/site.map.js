// site map for base


//middleware
const log = require('./log-middleware');
const view = require('./view-middleware');
const api = require('./api-middleware');
const static = require('./static-middleware');
const urlParser = require('./url-parser-middleware');

module.exports = {
    root:urlParser,
    controller:(ctx,next)=>{
        let { url } =ctx;
        if(url.match('\.action')){
            return api
        }else if(url.match('\.')){
            return static
        }else{
            return view
        }
    },
    end:log
}