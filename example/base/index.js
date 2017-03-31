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

//middleware
const log = require('./log-middleware');
const view = require('./view-middleware');
const static = require('./static-middleware');
const urlParser = require('./url-parser-middleware');

//[log]

app.use(urlParser);
app.useParallel([ view,static]);
app.use(log);

// start the app
server.on('request',app.callback());