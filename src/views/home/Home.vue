<template>
    <div>
        <br/>
        <br/>
        <span style="margin-left:20px">Bem vindo, {{ user.nome }}, ao Extrador de Dados do Painel de Fomento da EPT.</span>
    </div>
</template>

<script>
    import { mapState} from 'vuex'

    export default{
        computed: {
            ...mapState(['user'])
        },
    }
</script>


<style scoped>

</style>