const db = require('../services/mysql');

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('home');
    next();
  });

  server.get('/todo', (req, res, next) => {
    db.todos().all().then((todos) => {
      res.send(todos);
      next();
    });
  });

  server.post('/todo', (req, res, next) => {
    const { name } = req.params;

    db.todos().save(name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.put('/todo', (req, res, next) => {
    const { id, name } = req.params;

    db.todos().update(id, name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.del('/todo', (req, res, next) => {
    const { id } = req.params;

    db.todos().del(id).then((todo) => {
      res.send(todo);
      next();
    });
  });
};

module.exports = routes;
