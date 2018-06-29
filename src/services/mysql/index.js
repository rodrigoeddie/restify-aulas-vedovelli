const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root-mysql',
  database: 'todo-restify',
});

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error);

  rejectFunction({
    error: msg,
  });
}

const todosModule = require('./todos')({ connection, errorHandler });

module.exports = {
  todos: () => todosModule
};
