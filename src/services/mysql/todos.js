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
            errorHandler(error, `falha ao salvar o todo ${name}`, reject);
            return false;
          }

          resolve({ todo: { name, id: results.insertId } });
        });
      });
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;

        connection.query('UPDATE todo SET name = ? WHERE id = ?', [name, id], (error, results) => {
          if (error) {
            errorHandler(error, `falha ao atualizar o todo ${name}`, reject);
            return false;
          }

          resolve({ todo: { name } });
        });
      });
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;

        connection.query('DELETE from todo WHERE id = ?', [id], (error, results) => {
          if (error) {
            errorHandler(error, `falha ao remover o todo de id: ${id}`, reject);
            return false;
          }

          resolve({ todo: { id } });
        });
      });
    },
  }
}

module.exports = todos;
