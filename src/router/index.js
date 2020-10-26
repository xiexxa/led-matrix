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

Vue.use(Router)
Vue.use(VModal)

export default new Router({
  routes: [
    { path: '/', component: Index },

    { path: '/text', component: Text },
    { path: '/text/phrase', component: Phrase },
    { path: '/text/rss', component: Rss },

    { path: '/image', component: Image },
    { path: '/video', component: Video },
    { path: '*', component: NotFound }
  ]
})
