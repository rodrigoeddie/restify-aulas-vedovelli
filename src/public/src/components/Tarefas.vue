<template>
  <div class="todo">
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <todo-form @taskInputed="newTask($event)"></todo-form>
        <br>
        <todo-list :todos="todos" @taskDeleted="deleteTask($event)"></todo-list>
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
      todos: [],
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
        this.taskSaved = true;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    updateTasks: function () {
        axios.get(`http://localhost:3000/api/todo`)
        .then((response) => {
          this.todos = response.data.todos;
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    deleteTask: function (id) {
      axios.delete(`http://localhost:3000/api/todo`, {
        data: {id: id}
      }).then((response) => {
        this.updateTasks();
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
