import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Text from '../components/text/Text.vue'
import Phrase from '../components/text/Phrase.vue'
import Rss from '../components/text/Rss.vue'
import Image from '../components/Image.vue'
import Video from '../components/Video.vue'
import NotFound from '../components/NotFound.vue'
import VModal from 'vue-js-modal'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Router)
Vue.use(VModal)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        title: 'title'
      }
    },
    {
      path: '/text',
      component: Text,
      meta: {
        title: 'Text'
      }
    },
    {
      path: '/text/phrase',
      component: Phrase,
      meta: {
        title: 'Phrase'
      }
    },
    {
      path: '/text/rss',
      component: Rss,
      meta: {
        title: 'RSS'
      }
    },
    {
      path: '/image',
      component: Image,
      meta: {
        title: 'Image'
      }
    },
    {
      path: '/video',
      component: Video,
      meta: {
        title: 'Video'
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
