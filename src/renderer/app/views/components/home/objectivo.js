const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')



module.exports = {

  template:`
<template>
<v-card rounded="lg" height="auto" outlined>
        <v-card-title primary-title>
          Objectivo do produto
        </v-card-title>

        <v-card-text>
        <v-row>
       
        <v-col v-for="i in 5" :key="i" cols="12" sm="12">

        <v-toolbar flat dense color="rgba(0,0,0,0)">
            produto 1
            <v-spacer></v-spacer>
            Investimento: 100.000.00 Kz
            <v-spacer></v-spacer>
            Lucro previsto: 200.000.00 Kz
        </v-toolbar>
    

          <v-progress-linear :value="50" color="primary" height="15" >
    
          <template v-slot:default="{ value }">
                <div class="white--text"> 
                  {{ Math.ceil(value) }}% (50.000.00 Kz)
                </div>
          </template>
        </v-progress-linear>    

      </v-col>

      </v-row>

      </v-card-text>

 </v-card>
</template>
      
       `,
      data: () => ({
     
      }),
      
      methods: {
        moeda,
        ...mapActions({
          get:'usuario/getObjectoByShuffleProduto',
          
        })

      },
      computed: {
        ...mapGetters({
          loja:'usuario/loja',
          totalProfit:'stat/TOTAL_PROFIT_WEEK_GAIN',
          totalClient:'stat/TOTAL_CLIENT_WEEK',
          totalQtd:'stat/TOTAL_PROFIT_WEEK_SELLOUT',
          totalInvest:'stat/TOTAL_INVEST_WEEK',
        }),
      
        dark:function(){
          return this.$root.darkMode
        },
        
      },
      watch: {
   
      },

      components:{

      },
      created() {
        
  
     
      },
      mounted() {

      },


}