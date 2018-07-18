const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error);

  rejectFunction({
    error: msg,
  });
}

const todosModule = require('./todos')({ connection, errorHandler });
const usersModule = require('./users')({ connection, errorHandler });
const authModule = require('./auth')({ connection, errorHandler });

module.exports = {
  todos: () => todosModule,
  users: () => usersModule,
  auth: () => authModule,
};
