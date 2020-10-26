import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Text from '../components/Text.vue'
import Image from '../components/Image.vue'
import Video from '../components/Video.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index },
    { path: '/text', component: Text },
    { path: '/image', component: Image },
    { path: '/video', component: Video },
    { path: '*', component: NotFound }
  ]
})
