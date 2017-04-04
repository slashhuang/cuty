// site map for base


//middleware
const log = require('./log-middleware');
const view = require('./view-middleware');
const api = require('./api-middleware');
const static = require('./static-middleware');
const urlParser = require('./url-parser-middleware');

module.exports = [
    urlParser,
    api,
    static,
    view,
    log
]