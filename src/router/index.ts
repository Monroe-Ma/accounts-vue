import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Account from '@/views/Account.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import Book from '@/views/Book.vue'
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
    path: '/',
    redirect: '/account'
  },
  {
    path: '/account',
    component: Account 
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/book',
    component: Book
  },
        {
    path: '/statistics',
    component: Statistics
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
