//carregado automaticamente pelo webpack, entrypoint da app, de acordo com configuração no webpack.config

import Vue from 'vue' //core do vue
import App from './App.vue' //placeholder de toda aplicacao
import vuetify from './plugins/vuetify' //biblioteca de componentes
import store from './store' //vuex, gerenciamento global de estado

import {router, routeRequireAuth} from './routes.js' //vuerouter navegacao no lado do cliente




//impede acesso direto aos endpoints que requerem acesso identificado - routeGuard
manageProtectedEndPoints()

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App),
  created(){
    //para manter o token caso seja acionado reload no navegador
    atualizarStatePeloLocalStorage()
  }  
})


//impede acesso direto aos endpoints que requerem acesso identificado
//é firula já que esse controle é feito no serviço nos endpoints que realmente fornecem dados
function manageProtectedEndPoints() {
  atualizarStatePeloLocalStorage() //para o caso de reload do navegador
  router.beforeEach((to, from, next) => {
    if (routeRequireAuth(to.fullPath)) {
      if (!store.getters.loggedIn) {
        next('/')
        return
      }
    }
    if (to.fullPath === '/') {
      if (store.getters.loggedIn) {
        next('/home')
        return
      }
    }
    next()
  })

}

//reconstruir o state através do cookie, se tiver, com dados do usuário, para o caso de reload da página
function atualizarStatePeloLocalStorage() {
  const userString = localStorage.getItem(store.getters.cookieName)
  if (userString) {
    const userData = JSON.parse(userString)
    store.dispatch('ActionSetUser', userData)
  }
}

