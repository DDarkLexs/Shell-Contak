const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../../auth/utils')
const formatMoeda = require('../../../../@core/moeda')
const { mapActions,mapGetters,mapState } = Vuex
const moment = require('moment')


module.exports = {

    template:`
    <template>
        <v-row g-1>
         <v-col :cols="6">
             <v-card  class="elevation-0 d-flex justify-center pa-5 text-center ma-auto"  >
                <v-data-table
                :headers="headers"
                :items="logs"
                :items-per-page="5">

              <template v-slot:item.hora="{ item }">
                <div>
                    {{ hora(item.data) }}
                </div>
              </template>
              <template v-slot:item.data="{ item }">
                <div>
                    {{ data(item.data) }}
                </div>
              </template>
              <template v-slot:item.momento="{ item }">
                <div>
                    {{ momentos(item.data) }}
                </div>
              </template>
                
                
                </v-data-table>    
            </v-card>
         </v-col>
        </v-row>
    </template>
        `,
      data () {
      return {
         headers: [
          { text: '#', value: 'id_sessao' },
          { text: 'data', value: 'data' },
          { text: 'hora', value: 'hora' },
          { text: '', value: 'momento' },
        ],
      }
    },
        components:{
        

         },

        watch: {
      
        },
        methods: {
          hora(date){
            return moment(date)
            .format('hh:mm')
          },
          momentos(date){
            return moment(date)
            .locale('pt-br')
            .fromNow()
          },
          data (date){
            return moment(date)
            .locale('pt-br')
            .format('LL')

          
           // .format()
            // .fromNow(true)
          },


         },
        computed: {
          ...mapGetters({
            logs:'funcionario/logs',
          })
      
            
        },

        mounted() {
      

         },



}