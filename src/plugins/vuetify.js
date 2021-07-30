// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const cores = 
{
    primary: '#329D9C',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }



const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#329D9C',
          secondary: '#ffbb80',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  })

export default vuetify