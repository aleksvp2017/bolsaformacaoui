export default{
    //controla menu aberto ou fechado
    esconderMenu(state){
        return state.esconderMenu
    },    
    //para saber se o usuário está logado
    loggedIn(state){
        return !!state.user
    },
    //nome do cookie para guardar os dados do usuario
    cookieName(state){
        return state.userCookieName
    },
    menu(state){
        if (state.user && state.user.menu){
            return state.user.menu
        }
    }
}