<template>
  <div class="todo">
    <md-table v-if="todos.length" v-model="todos" md-card @md-selected="onSelect">
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

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple"> <!-- md-auto-select -->
      <md-table-cell md-label="id" md-sort-by="id">{{ item.id }}</md-table-cell>
      <md-table-cell md-label="name" md-sort-by="name">
        <md-field>
          <md-input :value="item.name" :rel="item.id" @keyup.enter="editTask"></md-input>
        </md-field>
      </md-table-cell>
      <md-table-cell>
          <md-button class="md-icon-button md-raised md-accent" @click="deleteTask(item.id)">
          <md-icon>delete_forever</md-icon>
          </md-button>
      </md-table-cell>
      </md-table-row>
    </md-table>

    <div class="selecionados" v-if="todos.length">
      <p>Selecionados:</p>
      {{ selected }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: ['todos'],
  data: () => ({
      selected: [],
      id: '',
  }),
  methods: {
    editTask (event) {
        this.$emit('taskEdited', {name: event.target.value, id: event.target.attributes.rel.value});
        // this.todo = '';
    },
    onSelect (items) {
      this.selected = items;
    },
    deleteTask (id) {
      this.$emit('taskDeleted', id);
    },
    getAlternateLabel (count) {
      let plural = '';

      if (count > 1) {
        plural = 's';
      }

      return `${count} item${plural} selecionado${plural}`;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
