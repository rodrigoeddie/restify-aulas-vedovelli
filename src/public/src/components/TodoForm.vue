<template>
  <div class="form-todo">
      <form novalidate>
        <md-card>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="{ 'form-group--error': $v.todo.$error }">
                  <label for="todo">Adicione uma tarefa</label>
                  <md-input v-model="todo" @keyup.enter="newTask"></md-input>
                  <div class="error" v-if="!$v.todo.required">Informe uma tarefa.</div>
                  <div class="error" v-if="!$v.todo.minLength">É necessário {{$v.todo.$params.minLength.min}} caracteres.</div>
                </md-field>
              </div>
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
  }),
  validations: {
    todo: {
      required,
      minLength: minLength(3),
    }
  },
  methods: {
    newTask () {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit('taskInputed', this.todo);
        this.todo = '';
      }
    },
  },
}
</script>
