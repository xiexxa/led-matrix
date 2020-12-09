import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

import App from './App.vue'

const VueApp = Vue.extend(App)

Vue.use(Vuetify)

const app = new VueApp({
  el: '#app',
})