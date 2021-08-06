import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


async function atualizarDados(etapasAAtualizar){
    return  http.post(BASE_BACKEND_URL + 'carga', {etapasAAtualizar: etapasAAtualizar})
}

async function listarEtapasRealizadas(){
    return  http.post(BASE_BACKEND_URL + 'carga/etapasRealizadas', {apenasMaisRecente: true})
}

async function listarTodasAtualizacoes(){
    return  http.post(BASE_BACKEND_URL + 'carga/etapasRealizadas')
}

async function listarEtapas(){
    return  http.get(BASE_BACKEND_URL + 'carga/etapas')
}

export {
    atualizarDados, listarEtapasRealizadas, listarEtapas, listarTodasAtualizacoes
}

