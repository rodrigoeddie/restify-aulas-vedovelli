<template>
  <div class="todo">
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-size-50 md-small-size-100">

        <form novalidate>
          <md-card>
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="todo">Adicione uma tarefa</label>
                    <md-input v-model="todo" @keyup.enter="newTask()"></md-input>
                    <div class="error" v-if="!$v.todo.required">Informe uma tarefa.</div>
                    <div class="error" v-if="!$v.todo.minLength">É necessário {{$v.fieldB.$params.minLength.min}} caracteres.</div>
                  </md-field>
                </div>
                <md-snackbar :md-active.sync="taskSaved">Tarefa cadastrada com sucesso!</md-snackbar>
              </div>
            </md-card-content>
          </md-card>
        </form>

        <br>

        <md-table v-model="todos" md-card @md-selected="onSelect">
          <md-table-toolbar>
            <h1 class="md-title">Lista de tarefas</h1>
          </md-table-toolbar>

          <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
            <md-table-cell md-label="id" md-sort-by="id">{{ item.id }}</md-table-cell>
            <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button md-raised md-accent" @click="deleteTask(item.id)">
                <md-icon>delete_forever</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <p>Selecionados:</p>
        {{ selected }}

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';

export default {
  name: 'HelloWord',
  mixins: [validationMixin],
  data: () => ({
      selected: [],
      todo: '',
      todos: [],
      taskSaved: false,
      errors: []
  }),
  validations: {
    todo: {
      required,
      minLength: minLength(3)
    }
  },
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
    newTask: function (event) {
      axios.post(`http://localhost:3000/api/todo`, {
        name: this.todo
      })
      .then((response) => {
        this.updateTasks();
        this.todo = '';
        this.taskSaved = true;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    deleteTask: function (id) {
      axios.delete(`http://localhost:3000/api/todo`, {
        data: {id: id}
      })
      .then((response) => {
        this.updateTasks();
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    onSelect (items) {
      this.selected = items;
    },
    getAlternateLabel (count) {
      let plural = '';

      if (count > 1) {
        plural = 's';
      }

      return `${count} item${plural} selecionado${plural}`;
    }
  },
  mounted () {
    this.updateTasks();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
