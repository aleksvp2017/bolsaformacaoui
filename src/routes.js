import VueRouter from 'vue-router' //navegacao
import Vue from 'vue' //core do vue
import Home from './views/home/Home.vue'
import Login from './views/login/Login.vue'


var routes = [

   { path: '/home', nome: 'Home', component: Home, alwaysShow: true, requireAuth: true, icone: 'mdi-home', ordem: 0},
   { path: '/', nome: 'Login', component: Login,requireAuth: false}

];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.nome == nome)[0]
}

function obterRotaPeloCaminho(path){
    return routes.filter(router => router.path == path)[0]
}

export {
    router, routes, obterRota,obterRotaPeloCaminho
}
