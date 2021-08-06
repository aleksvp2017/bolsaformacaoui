<template>
 <div>
     
    <v-app-bar
      v-if="!esconderMenu && loggedIn"
      dark
      dense
      :color="cor"
      class="ml-10"
    >

      <!--<span class="hidden-sm-and-up">
        <v-btn @click.stop="drawer = !drawer">
          Menu
        </v-btn>
      </span>-->

      <!-- MOSTRA PÁGINA ATUAL SELECIONADA NO TOPO --> 
      <v-toolbar-title class="mx-auto">
           <span style=" align:center" > {{menuAtual}}</span>
      </v-toolbar-title>

    </v-app-bar>
    
    <v-navigation-drawer
        absolute permanent
        :color="cor" dark v-if="!esconderMenu && loggedIn"
          v-model="drawer"
        :mini-variant.sync="mini"
        expand-on-hover
        app
        floating>
        <!--TOPO DO MENU -->
      <v-list-item class="px-0">
        <!-- USER MENU -->
        <v-menu offset-y
            :close-on-click="true"
            :nudge-width="200"
            offset-x
            >
            <template v-slot:activator="{ on }">
                <v-btn :color="cor" dark elevation="0" v-on="on">
                    <v-icon dark right>mdi-account-circle</v-icon>
                </v-btn> 
            </template>

            <v-card>
                    <v-list>
                        <v-list-item>
                            <v-btn text rounded  :to="rota('DadosPessoais')">Dados pessoais</v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text rounded  :to="rota('AlterarSenha')">Alterar Senha</v-btn>
                        </v-list-item>                            
                        <v-list-item>
                            <v-btn text rounded @click="logout" >Sair</v-btn>
                        </v-list-item>                            
                    </v-list>
            </v-card>
        </v-menu>

        <v-list-item-title>{{user.nome}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

        <!-- PARTE DE BAIXO DO MENU -->
      <v-list dense>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
          :to="rota(link.nome)"
        >
          <v-list-item-icon>
            <v-icon >{{ link.icone }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.nome }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
 </div>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex'
    import { routes, obterRota, obterRotaPeloCaminho } from '../../routes.js'
    import { COR_BASE } from '../../services/Constantes.js'

    export default {
        data() {
            return {
                cor: COR_BASE,
                menuDisponivel: false,
                mini: true,
                drawer: {}
            }
        },
        computed: {
            menuAtual(){
                //console.log('Path:', this.$route.path)
                var rota = obterRotaPeloCaminho(this.$route.path)
                //console.log('Rota:', rota)
                return rota.nome.toUpperCase()
            },
            temAcesso(){
            },
            links (){
                var itens = []
                //Precisa do arquivo de rotas por causa do mapeamento com o componente, que não pode ser
                //simplesmente uma string, tem que ser o componente mesmo
                //Junção entre as rotas e o que vem via permissao se da pelo path
                //Para aparecer no menu, tem que: não precisar de autorização; ou vir no menu e estar no routes.
                routes.map(rota => {
                    //adiciona os itens que não precisam de autorização
                    if (rota.alwaysShow){
                        itens.push({
                                nome: rota.nome,
                                path: rota.path,
                                icone: rota.icone,
                                ordem: rota.ordem,
                            })
                    }
                    else {
                        this.menu.map(itemMenu => {
                            if (itemMenu.path === rota.path){
                                itens.push({
                                    nome: itemMenu.nome,
                                    path: itemMenu.path,
                                    icone: rota.icone,
                                    ordem: itemMenu.ordem,
                                })
                            }
                        })
                    }
                })
                return itens.sort((itemA, itemB) => {
                    if (itemA.ordem > itemB.ordem) return 1
                    if (itemA.ordem < itemB.ordem) return -1
                    return 0
                })     
            },            
            ...
            mapGetters(['loggedIn','menu', 'esconderMenu']),
            ...
            mapState(['user'])
        },
        methods: {
            rota(nome){
                return obterRota(nome)
            },            
            ...mapActions(['ActionLogout']),
            logout(){
                this.ActionLogout()
            }
        }
    }
</script>