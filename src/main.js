// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify.js'

Vue.config.productionTip = false
const VueApp = Vue.extend(App)

/* eslint-disable no-new */
new VueApp({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
