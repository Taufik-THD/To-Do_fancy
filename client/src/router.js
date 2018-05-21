import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import ToDopage from './views/ToDopage.vue'
import History from './views/History.vue'

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
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
})
