import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


async function login(credencial){
    console.log('Tentando acessar: ', BASE_BACKEND_URL + 'login')
    let senhaHash = encripta(credencial.senha)
    return  http.post(BASE_BACKEND_URL + 'login', {usuario: { email: credencial.email, senha: senhaHash}})
}

async function recuperarSenha(email){
    return  http.post(BASE_BACKEND_URL + 'recuperarSenha', {email: email})
}

export {
    login, recuperarSenha, encripta
}

function encripta(senha) {
    const crypto = require('crypto')
    let senhaHash = crypto.createHash('sha512').update(senha).digest('hex')
    return senhaHash
}
