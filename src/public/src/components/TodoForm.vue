<template>
  <div class="form-todo">
      <form novalidate>
        <md-card>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="todo">Adicione uma tarefa</label>
                  <md-input v-model="todo" @keyup.enter.native="newTask"></md-input>
                </md-field>
              </div>
              <md-snackbar :md-active.sync="taskSaved">Tarefa cadastrada com sucesso!</md-snackbar>
            </div>
          </md-card-content>
        </md-card>
      </form>
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
  name: 'TodoForm',
  mixins: [validationMixin],
  data: () => ({
      todo: '',
      taskSaved: false,
  }),
  validations: {
    todo: {
      required,
      minLength: minLength(3),
    }
  },
  methods: {
    newTask () {
      this.$emit('taskInputed', this.todo);
      this.todo = '';
    },
  },
}
</script>
