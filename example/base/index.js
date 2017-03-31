/*
 * @Author slashhuang
 */


// base app for cuty
const path =require('path');
const Cuty = require(path.resolve(process.cwd(),'index'));
const app = new Cuty();

// app structure
const http = require('http');
const server = http.createServer().listen(3000);

// integrate middleware structure into app
const middlewareMap = require('./site.map.js');
app.use(middlewareMap);

// start the app
server.on('request',app.callback());