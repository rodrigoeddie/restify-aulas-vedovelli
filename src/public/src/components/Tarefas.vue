<template>
  <div class="todo">
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-size-100">
        <todo-form @taskInputed="newTask"></todo-form>
        <br>
        <todo-list :todos="todos" @taskDeleted="deleteTask" @taskEdited="editTask"></todo-list>
        <form>
    <md-snackbar :md-active.sync="taskSaved">{{ snackbarMessage }}</md-snackbar>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import todoForm from './TodoForm';
import todoList from './TodoList';

export default {
  name: 'Tarefas',
  components: {
    'todo-form': todoForm,
    'todo-list': todoList,
  },
  data: () => ({
      todos: '',
      taskSaved: false,
      snackbarMessage: '',
      errors: []
  }),
  methods: {
    updateTasks: function () {
        axios.get(`http://localhost:3000/api/todo`)
        .then((response) => {
          this.todos = response.data.todos;
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    newTask: function (task) {
      axios.post(`http://localhost:3000/api/todo`, {
        name: task
      })
      .then((response) => {
        this.updateTasks();
        this.snackbarMessage = 'Tarefa cadastrada com sucesso!';
        this.taskSaved = true;
        console.log(this.taskSaved);
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    deleteTask: function (id) {
      axios.delete(`http://localhost:3000/api/todo`, {
        data: {id: id}
      }).then((response) => {
        this.updateTasks();
        this.snackbarMessage = 'Tarefa deletada com sucesso!';
        this.taskSaved = true;
        console.log(this.taskSaved);
      }).catch(e => {
        this.errors.push(e);
      });
    },
    editTask: function (data) {
      axios.put(`http://localhost:3000/api/todo`, {
        data: {id: data.id, name: data.name}
      }).then((response) => {
        this.updateTasks();
        this.snackbarMessage = 'Tarefa alterada com sucesso!';
        this.taskSaved = true;
        console.log(this.taskSaved);
      }).catch(e => {
        this.errors.push(e);
      });
    },
  },
  mounted () {
    this.updateTasks();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
