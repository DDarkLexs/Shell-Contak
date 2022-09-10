const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../../auth/utils')
const formatMoeda = require('../../../../@core/moeda')
const { mapActions,mapGetters,mapState } = Vuex

module.exports = {

    template:`
    <template>
    <v-row g-1>
      <v-col cols="12">

        <v-card
        class="mx-auto"
        max-width="1500" height="300" tile>
    <v-img
      height="100%"
      color="primary"
      :src="this.$root.dirname + '/assets/media/img/server-room.jpg'">
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12" >
          <v-row>
            <v-col cols="6" >
              
              <v-card color="transparent" flat class="d-flex align-start ma-5 mt-10" >
        <v-avatar class="profile" color="transparent" size="134" >
            <v-img
            color="transparent"
            :src="$root.dirname + '/assets/media/profile/user.png'">
            </v-img>
          </v-avatar>
              <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ f.nome }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                
            <div    class="mt-5">
              <v-chip class="ma-2" color="transparent" label text-color="white" >
                <v-icon left>
                    mdi-map-marker
                </v-icon>
                {{ f.municipio }}, {{ f.residencia }} 
              </v-chip>
              <v-chip class="ma-2" color="transparent" label text-color="white" >
                <v-icon left>
                mdi-home
                </v-icon>
                {{ f.endereco }}
              </v-chip>
              <div>

              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          
          
        </v-card>
        
            </v-col>
          <v-row>
          </v-col>
          <v-col class="py-0">
            <v-tabs v-model="tab" dark background-color="transparent">
              <v-tab>Visão geral</v-tab>
              <v-tab>histórico</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </v-col>
    </v-row>
    </template>
        `,
      data () {
      return {
        tab:null,

      }
    },
        components:{
    
         },
         
        watch: {
      
        },
        methods: {
          ...mapActions({
            get:'funcionario/getAll',
            // get:'funcionario/getFuncionarioById'
          })


         },
        computed: {
          role:function(){
            switch (this.f.role) {
                case 'admin':
                    return 'adminstrador'
                    break;
                    
                    default:
                        
                        
                    return 'usuário normal'
                break;
            }

        },
          ...mapGetters({
            f:'funcionario/f',
          })
          
            
        },

        async beforeMount() {
            
          await this.get(this.$route.params.id_funcionario)
      

         },



}