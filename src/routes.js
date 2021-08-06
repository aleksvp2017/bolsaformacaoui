import VueRouter from 'vue-router' //navegacao
import Vue from 'vue' //core do vue
import Home from './views/home/Home.vue'
import Login from './views/login/Login.vue'
import Carga from './views/carga/Carga.vue'


var routes = [

   { path: '/home', nome: 'Home', component: Home, alwaysShow: true, requireAuth: true, icone: 'mdi-home', ordem: 0},
   { path: '/', nome: 'Login', component: Login,requireAuth: false},
   { path: '/carga', nome: 'Atualização de dados', component: Carga, alwaysShow: true, requireAuth: true, icone: 'mdi-database', ordem: 0},

];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.nome == nome)[0]
}

function obterRotaPeloCaminho(path){
    return routes.filter(router => router.path == path)[0]
}


//chega nas propriedades da rota se ela quer autenticacao
function routeRequireAuth(path){
    let secureRoute = routes.filter(route => route.requireAuth && route.path == path) 
    return secureRoute.length > 0 
}

export {
    router, routes, obterRota,obterRotaPeloCaminho, routeRequireAuth
}
