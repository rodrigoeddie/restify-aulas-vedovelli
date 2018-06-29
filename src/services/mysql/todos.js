const todos = (deps) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;

        connection.query('Select * FROM todo', (error, results) => {
          if (error) {
            errorHandler(error, 'falha ao listar todos', reject);
            return false;
          }

          resolve({ todos: results });
        });
      });
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;

        connection.query('INSERT INTO todo (name) VALUES (?)', [name], (error, results) => {
          if (error) {
            errorHandler(error, 'falha ao salvar o todo', reject);
            return false;
          }

          resolve({ todo: { name, id: results.insertId } });
        });
      });
    },
    update: (id, name) => {},
    del: (id) => {},
  }
}

module.exports = todos;
