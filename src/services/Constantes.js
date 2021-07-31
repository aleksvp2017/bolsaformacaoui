const BASE_BACKEND_URL_DESENV='http://localhost:3001/'
const BASE_BACKEND_URL_PROD=''
const FALE_CONOSCO_EMAIL='aleksvp@gmail.com'
const ERROR_SESSION_EXPIRED=440
const MESSAGE='mensagem'
const ERROR='error'
var BASE_BACKEND_URL = getBaseURL()

export {
    BASE_BACKEND_URL, FALE_CONOSCO_EMAIL, ERROR_SESSION_EXPIRED, MESSAGE, ERROR
}

function getBaseURL() {
    if (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('192.168.0.30') > -1) {
        //console.log('Desenv')
        return BASE_BACKEND_URL_DESENV
    }
    else {
        //console.log('Prod')
        return BASE_BACKEND_URL_PROD
    }
}
