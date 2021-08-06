import * as types from './mutation-types' //importanto tudo no arquivo dentro de types

export default{
    //ao chamar uma mutation, so passar o payload, o state é passado automaticamente
    [types.SET_USER](state, payload){ //payload é o nome fancy para parâmetro
        state.user = payload
    },
}