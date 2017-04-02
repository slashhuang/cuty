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

// integrate middleware structure into app
const middlewareMap = require('./site.map.js');
console.log(middlewareMap)
app.use(middlewareMap);
console.log(app)

// start the app
server.on('request',app.callback());
server.listen(3000,()=>{
    process.stdout.write(`server listening on ${Port} `)
});