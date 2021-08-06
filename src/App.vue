<template>
  <v-app>
      <navegacaolateral/>        
      <v-main>
          <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
import NavegacaoLateral from './views/navegacao/NavegacaoLateral.vue'

export default {
    components: {
      'navegacaolateral': NavegacaoLateral      
    },    
  }
</script>

<style>

</style>