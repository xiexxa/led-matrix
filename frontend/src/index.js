import Vue from 'vue'
import App from './components/App.vue'

const VueApp = Vue.extend(App)

console.log('hello')

const app = new VueApp({
  el: '#app',
})