import * as types from './mutation-types'
import {login} from '../services/Autenticador.js' //serviço que chama o endpoint de autenticação no backend
import Vue from 'vue' //core do vue

//esse método é necessário em separado do login, para o caso de recriar a sessão se baseando em um cookie existente
//ao chamar a action, so passa o parametro / payload, context é passado automaticamente
export const ActionSetUser = (context, payload) => {
    context.commit(types.SET_USER, payload) //atualiza state com dados
    localStorage.setItem(context.getters.cookieName, JSON.stringify(payload)) //cria o cookie
    Vue.http.interceptors.push((request, next) => { //sempre colocar no header o token
        request.headers.set('Authorization', 'Bearer ' + payload.token)
        request.headers.set('Accept', 'application/json')
        next()
    });
}

//chama o endpoint de autenticacao, depois o action para setar dados do usuario
//detalhe, retorna uma Promisse a ser invocada, para que possa ser tratada por quem a chamou
export const ActionLogin = (context, payload) => {
    return login(payload).then(res => {
        context.dispatch('ActionSetUser', res.data.usuario)
    })
}

export const ActionLogout = (context, payload) => {
    localStorage.removeItem(context.getters.cookieName) //remove o cookie
    //context.commit('SET_USER', null) //apaga dados do usuário no state
    location.reload() //como state do vuex não sobrevive ao reload, nem precisa apagar os dados do usuário
}

export default{
    ActionSetUser, ActionLogin, ActionLogout
}
