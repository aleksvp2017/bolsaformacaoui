<template>
  <div>
    <v-img src="/src/img/FundoTurquesaClaro2.png" aspect-ratio="2" >
      <v-row class="pt-12">  
          <v-col class="text-center mt-12">
              <span style="color:#FFFFFF;font-size:60px;font-family: 'Montserrat';" >
                  Painel de Fomento da EPT
              </span>
              <br/>
              <span style="color:#FFFFFF;font-size:30px;font-family: 'Montserrat';">
                <h3>Extrator de Dados</h3>
              </span>
          </v-col>
      </v-row>  
      <v-container>
        <v-row justify="space-around">
          <v-card width="400px" align="center" >
            <v-card-title class="pb-0">
              <h2></h2>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field 
                  label="E-mail"
                  v-model="credencial.email"
                  type="email"
                  prepend-icon="mdi-account-circle"/>
                <v-text-field 
                  :type="showPassword ? 'text' : 'password'" 
                  label="Senha"
                  @keypress.enter="login"
                  v-model="credencial.senha"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"/>
              </v-form>
            </v-card-text>
            <v-alert :type="tipoAlerta" dense outlined dismissible v-model="mostrarAlerta">
              {{alerta}}
            </v-alert>              
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="primary" @click="registrar" class="white--text">Registrar</v-btn>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" :disabled="loading" @click="recuperarSenha" color="secondary" class="white--text">Recuperar senha</v-btn>
              <v-btn color="primary" class="white--text" @click="login">Entrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>

<script>
  import {recuperarSenha} from '../../services/Autenticador'
  import {MESSAGE, ERROR} from '../../services/Constantes'
  import {mapActions} from 'vuex'
  import {obterRota } from '../../routes.js'


  export default {
    data() {
      return {
        loading: false,
        mostrarAlerta: false,
        alerta: '',
        tipoAlerta: 'error',
        credencial :{
          email: '',
          senha: '',
        },
        showPassword: false
      }
    },
    methods : {
      ...mapActions(['ActionLogin']),
      login(){
        this.alerta = ''
        this.ActionLogin(this.credencial).then((response) => {
          this.$router.push(obterRota('Home'))
        }).catch (error => {
          console.log('Error: ', error)
          this.alerta = error.body[ERROR]
          this.tipoAlerta = "error"
          this.mostrarAlerta = true
        })
      },
      recuperarSenha(){
        if (!this.credencial.email){
          this.alerta = 'Preencha o email',
          this.tipoAlerta = 'error'
          this.mostrarAlerta = true
          return
        }
        this.loading = true
        recuperarSenha(this.credencial.email).then(response => {
          this.alerta = response.body[MESSAGE]
          this.tipoAlerta = 'info'
          this.mostrarAlerta = true        
          this.loading = false
        }).catch( error => {
          this.alerta = error.body[ERROR]
          this.tipoAlerta = 'error'
          this.mostrarAlerta = true                  
          this.loading = false
        })
      },      
      registrar(){
          console.log('registrar')
      }
    }
  }

</script>



<style>
</style>
