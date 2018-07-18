const db = require('../../services/mysql');

module.exports = function users(server) {
  server.get('/api/todo', (req, res, next) => {
    db.users().all().then((todos) => {
      res.send(todos);
      next();
    });
  });

  server.post('/api/todo', (req, res, next) => {
    const { name } = req.params;

    db.users().save(name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.put('/api/todo', (req, res, next) => {
    const { id, name } = req.params;

    db.users().update(id, name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.del('/api/todo', (req, res, next) => {
    const { id } = req.params;

    db.users().del(id).then((todo) => {
      res.send(todo);
      next();
    });
  });
};
