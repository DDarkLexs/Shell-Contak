const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const totalSemana = require('../../components/home/totalSemana')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')
const momemt = require('moment')

//moment().format('MMMM Do YYYY, h:mm:ss a')

module.exports = {

  template:`
<template>
  <div>
  <v-row g-1>
      <v-col cols="12" sm="6">
        <v-card class="rounded-lg" outlined>
          <v-sheet height="300">
            <v-calendar 
            ref="calendar"></v-calendar>
          </v-sheet>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card class="rounded-lg" outlined >
          <v-img 
          height="300"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.7)"
          :src="$root.dirname + '/assets/media/img/pexels-andrea-piacquadio-3801426.jpg'"
          :lazy-src="$root.dirname + '/assets/media/img/pexels-andrea-piacquadio-3801426.jpg'">
           <v-card-title class="display-1" > {{ productName }} </v-card-title>
           <v-card-subtitle  color="grey" > {{ date }} </v-card-subtitle>
           
           </v-img>
           </v-card>
      </v-col>

    </v-row>
  </div>
</template>
      
       `,
      data: () => ({
     
      }),
      
      methods: {
        moeda,

        ...mapActions({
          add:'usuario/getUsuarioEmpresa',
          getStatProfit:'stat/getTotalProfitFromThisWeekByEmpresaId',

        })

      },
      computed: {
        ...mapGetters({
          usuario:'usuario/usuarioAPI',
          productName:'productName',
      }),
          
          dark:function(){
            return this.$root.darkMode
          },
          date:function(){
            return momemt()
            .locale('pt').
            format('LLLL')

          }
        
      },
      watch: {
     
   
      },


      components:{
     
      },
      created() {
        this.add()
      },
      mounted() {
      
     

      },


}