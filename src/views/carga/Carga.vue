<template>
    <div>
        <v-alert :type="tipoAlerta" dense outlined dismissible v-model="mostrarAlerta">
            {{alerta}}
        </v-alert>         
        <br/><br/><br/>
        <div align="center">
            <v-btn color="primary" class="white--text" @click="abrirPopupAtualizarDados">Atualizar dados</v-btn>
                <v-dialog v-model="dialogAtualizarDados" persistent max-width="60%" heigth="100px">
                    <v-card>
                        <v-card-text>                        
                            <v-alert :type="tipoAlertaPopup" dense text dismissible v-model="mostrarAlertaPopup">
                                {{alertaPopup}}
                            </v-alert>  
                            <span class="text-h6">
                                Altere as configurações se necessário, selecione as etapas que deseja e clique em "Atualizar".
                            </span>
                            <br/><br/>
                            <!-- CONFIGURACOES -->
                            
                            <!--<p class="text-center font-weight-black">Configurações</p>-->

                            <v-row max-height="100px" >
                                <v-col
                                    cols="12"
                                    sm="8"
                                >
                                    <v-text-field label="Diretório das planilhas" hint="Use barras duplas \\ para separar as pastas" dense
                                        v-model="configuracoes.diretorioDados" type="text"/>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                >       
                                    <v-text-field label="Ano padrão" v-model="configuracoes.ano" type="number" dense/>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col
                                    cols="12"
                                    sm="8"
                                >    
                                    <v-text-field label="Período pactuação" v-model="configuracoes.periodoPactuacao" type="number" dense/>                                       
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                >                                     
                                    <v-text-field label="Data dados" v-model="configuracoes.dataDados" type="text" dense/>
                                </v-col>
                            </v-row >
                            <v-row dense >
                                <v-col
                                    cols="12"
                                    sm="4"
                                >    
                                    <v-text-field label="SEI" v-model="configuracoes.sei" type="text" dense/>                                       
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                >                                     
                                    <v-text-field label="TED" v-model="configuracoes.ted" type="text" dense/>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                >                                     
                                    <v-checkbox v-model="configuracoes.incluiColunasExtras" label="Tem colunas extras?"></v-checkbox>
                                </v-col>

                            </v-row>                            
                            
                            <!-- ETAPAS -->
                            <p class="text-center font-weight-black">Etapas</p>
                            <v-data-table
                                title="Etapas"
                                class="elevation-1"
                                :headers="colunasEtapas"
                                :items="etapas"
                                v-model="etapasSelecionadas"
                                show-select
                                v-show="etapas.length > 0"
                                item-key="codigo"
                                :search="buscaEtapa"
                                items-per-page="15"
                                :hide-default-footer="true"
                                dense
                                >     
                                    <template #item.arquivo="{item}">
                                        <p v-show="!etapasSelecionadas.includes(item)">{{item.arquivo}}</p>
                                        <v-text-field v-model="item.arquivo" type="text" v-show="etapasSelecionadas.includes(item)"/>
                                    </template>             
                            </v-data-table>                               
                            <!--
                            <v-select
                                v-model="etapasSelecionadas"
                                :items="etapas"
                                label="Etapas"
                                multiple
                                chips
                                deletable-chips
                                dense
                                full-width
                                hint="Etapas da carga a serem acionadas"
                                persistent-hint
                            ></v-select>-->
                            
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="atualizarDados">Atualizar</v-btn>
                        <v-btn color="blue darken-1" text @click="fecharPopupAtualizarDados">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>                         
            <v-btn color="primary" class="white--text" @click="listarEtapasRealizadas">Listar etapas da última atualização</v-btn>
            <v-btn color="primary" class="white--text" @click="listarTodasAtualizacoes">Listar todas as atualizações</v-btn>            
            <v-btn color="primary" dark class="ma-2" @click="limpar">Limpar</v-btn>
            <br/><br/>
            <v-card-title>
            <v-text-field
                v-model="busca"
                append-icon="mdi-magnify"
                label="Filtre as linhas por aqui"
                single-line
                v-show="etapasRealizadas.length > 0"
                hide-details
            ></v-text-field>
            </v-card-title>            
            <v-data-table
                class="elevation-1"
                :headers="headers"
                :items="etapasRealizadas"
                show-select
                v-show="etapasRealizadas.length > 0"
                item-key="descricao + codigo"
                :search="busca"
                >                
            </v-data-table>            
        </div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    import {atualizarDados, listarEtapasRealizadas, listarEtapas, listarTodasAtualizacoes } from '../../services/Carga.js'
    import {MESSAGE, ERROR, ERROR_SESSION_EXPIRED} from '../../services/Constantes.js'

    export default{
        data(){
            return {
                loading: false,
                mostrarAlerta: false,
                alerta: '',
                tipoAlerta: 'error',                
                loadingPopup: false,
                mostrarAlertaPopup: false,
                alertaPopup: '',
                tipoAlertaPopup: 'error',                
                etapasRealizadas :[],
                etapas: [],
                etapasSelecionadas: [],
                dialogAtualizarDados: false,
                busca: '',
                buscaEtapa: '',
                configuracoes :{
                    diretorioDados: `C:\\\\Program Files\\\\PostgreSQL\\\\dados`,
                    ano: 2021,
                    dataDados: new Date().toLocaleDateString(),
                    periodoPactuacao: 0,
                    sei: '',
                    ted: '',
                    incluiColunasExtras: false,
                },
            }
        },
        created () {
            listarEtapas().then(response => {
                this.etapas = response.body.etapas.map(etapa => {
                    return etapa
                    //return {text: etapa.descricao, value: etapa.codigo}
                })
            }).catch (error => {
                    console.log("ERROR:", error)
                    displayMessage(this, true, error.body.error, 'error')
                    if (error.status === ERROR_SESSION_EXPIRED){
                        this.$store.dispatch('ActionLogout')
                    }                         
            })
        },
        computed: {
            ...mapState(['user']),
            headers () {
                    return [
                    {
                        text: 'Código',
                        align: 'start',
                        sortable: true,
                        value: 'codigo',
                    },
                    {
                        text: 'Descrição',
                        sortable: true,
                        value: 'descricao',
                    },
                    { text: 'Erro', value: 'erro' },
                    { text: 'Data', value: 'datahora' },
                    ]
                },  
            colunasEtapas () {
                    return [
                    {
                        text: 'Código',
                        align: 'start',
                        sortable: true,
                        value: 'codigo',
                    },
                    {
                        text: 'Descrição',
                        sortable: true,
                        value: 'descricao',
                    },
                    {
                        text: 'Arquivo',
                        sortable: true,
                        value: 'arquivo',
                    },                    
                    ]
                },                         
        },
        methods: {
            abrirPopupAtualizarDados(){
                this.dialogAtualizarDados = true
                displayMessagePopup(this, false, '','error')
                this.etapasSelecionadas = []
            },
            fecharPopupAtualizarDados(){
                this.dialogAtualizarDados = false
            },            
            atualizarDados(){
                atualizarDados(this.etapasSelecionadas, this.configuracoes).then(response => {
                    displayMessagePopup(this, true, response.body[MESSAGE] + ' Acompanhe o andamento através das funcionalidades de consultar etapas.',
                        'info')
                }).catch( error => {
                     displayMessagePopup(this, true, error.body[ERROR], 'error')
                })
            }, 
            listarEtapasRealizadas(){
                listarEtapasRealizadas().then(response => {
                    this.etapasRealizadas = response.body.etapasRealizadas
                }).catch (error => {
                    displayMessage(this, true, error.body.error, 'error')
                    if (error.status === ERROR_SESSION_EXPIRED){
                        this.$store.dispatch('ActionLogout')
                    }                         
                })
            }, 
            listarTodasAtualizacoes(){
                listarTodasAtualizacoes().then(response => {
                    this.etapasRealizadas = response.body.etapasRealizadas
                }).catch (error => {
                    displayMessage(this, true, error.body.error, 'error')
                    if (error.status === ERROR_SESSION_EXPIRED){
                        this.$store.dispatch('ActionLogout')
                    }     
                })
            },             
            limpar(){
                this.etapasRealizadas = []
                this.etapasSelecionadas = []
            },
        }
    }

function displayMessage(owner, showAlert, message, type){
    owner.mostrarAlerta = showAlert
    owner.alerta = message
    owner.tipoAlerta = type
}   
function displayMessagePopup(owner, showAlert, message, type){
    owner.mostrarAlertaPopup = showAlert
    owner.alertaPopup = message
    owner.tipoAlertaPopup = type
}     


</script>


<style scoped>

</style>