const db = require('../services/mysql');

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('home');
    next();
  });

  server.get('/todo', (req, res, next) => {
    db.todos().all().then(todos => {
      res.send(todos);
      next();
    });
  });

  server.post('/todo', (req, res, next) => {
    const { name } = req.params;

    db.todos().save(name).then(todos => {
      next();
    });
  });
};

module.exports = routes;
