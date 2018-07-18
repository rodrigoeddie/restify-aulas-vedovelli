const todo = require('./modules/todo');
const users = require('./modules/users');

const restify = require('restify');
const path = require('path');
const db = require('../services/mysql');

const routes = (server) => {

  todo(server);
  users(server);

  server.post('/autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.body
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get('/*', restify.plugins.serveStatic({
    directory: path.resolve(__dirname, '../public'),
    default: 'index.html',
  }));

};

module.exports = routes;
