import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import ToDopage from './views/ToDopage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDopage
    }
  ]
})
