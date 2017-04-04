/*
 * @Author slashhuang
 */


// base app for cuty
const path =require('path');
const Cuty = require(path.resolve(process.cwd(),'src/cuty'));
const app = new Cuty();
const Port = 3000;
// app structure
const http = require('http');
const server = http.createServer()
//middleware
const log = require('./log-middleware');
const view = require('./view-middleware');
const api = require('./api-middleware');
const static = require('./static-middleware');
const urlParser = require('./url-parser-middleware');

app.use([
    urlParser,
    api,
    static,
    view,
    log
]);
// start the app
server.on('request',app.callback());
server.listen(3000,()=>{
    process.stdout.write(`server listening on ${Port} `)
});