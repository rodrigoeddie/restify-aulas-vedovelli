import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Tarefas from '@/components/Tarefas';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/tarefas',
      name: 'Tarefas',
      component: Tarefas,
      meta: {
        title: 'Tarefas'
      }
    },
  ],
});
