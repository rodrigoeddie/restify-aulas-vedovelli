const restify = require('restify');

const server = restify.createServer();
const routes = require('../http/routes');
const cors   = require('./cors');

server.pre(cors.preflight); // middleware para Access-Control-Allow-Origin
server.use(cors.actual);
server.use(restify.plugins.bodyParser()); // é necessário pra passar os params via post

routes(server);

module.exports = server;
