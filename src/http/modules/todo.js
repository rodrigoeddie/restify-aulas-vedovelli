const db = require('../../services/mysql');

module.exports = function todo(server) {
  server.get('/api/todo/', (req, res, next) => {
    db.todos().all().then((todos) => {
      res.send(todos);
      next();
    });
  });

  server.post('/api/todo/', (req, res, next) => {
    const { name } = req.params;

    db.todos().save(name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.put('/api/todo/', (req, res, next) => {
    const { id, name } = req.params;

    db.todos().update(id, name).then((todo) => {
      res.send(todo);
      next();
    });
  });

  server.del('/api/todo/', (req, res, next) => {
    const { id } = req.params;

    db.todos().del(id).then((todo) => {
      res.send(todo);
      next();
    });
  });
};
