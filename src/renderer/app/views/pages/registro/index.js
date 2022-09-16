const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')
const momemt = require('moment')
const extenso = require('extenso')
const { ipcRenderer } = require('electron')


module.exports = {

  template:`
        <template>
        <v-card class="ma-auto" rounded="lg" :width="950" :max-width="950">
        
         <v-card-title dense>

        
          </v-card-title>
    
            <v-data-table
            item-key="id_cliente"
            show-select
             :headers="headers"
            :items-per-page="8"
            class="elevation-1">

            </v-data-table>
        </v-card>
        </template>
      
       `,
      data () {
        return {
        headers: null,


        }
      },
      
      methods: {
          ...mapActions({
    
          })

      },
      computed: {
        ...mapGetters({

        }),
        
      },
      watch: {
     
   
      },


      components:{
     
      },
      async created() {


      },
      mounted() {
   

      },


}