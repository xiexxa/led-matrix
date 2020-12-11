import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2
    }
  ]
})
