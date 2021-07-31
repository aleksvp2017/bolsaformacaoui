import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' 
import babelPolyfill from 'babel-polyfill'

import {router} from './routes.js'

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
})
