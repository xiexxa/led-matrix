import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

import App from './components/App.vue'

const VueApp = Vue.extend(App)

Vue.use(Vuetify)

console.log('hello')

const app = new VueApp({
  el: '#app',
})