const db = require('../../services/mysql');

module.exports = function users(server) {
  server.get('/api/user', (req, res, next) => {
    db.users().all().then((users) => {
      res.send(users);
      next();
    });
  });

  server.post('/api/user', (req, res, next) => {
    const { name } = req.params;

    db.users().save(name).then((user) => {
      res.send(user);
      next();
    });
  });

  server.put('/api/user', (req, res, next) => {
    const { id, name } = req.params;

    db.users().update(id, name).then((user) => {
      res.send(user);
      next();
    });
  });

  server.del('/api/user', (req, res, next) => {
    const { id } = req.params;

    db.users().del(id).then((user) => {
      res.send(user);
      next();
    });
  });
};
