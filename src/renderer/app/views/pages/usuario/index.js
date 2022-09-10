const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const formatMoeda = require('../../../@core/moeda')
const Tabela = require('./tabela')

module.exports = {

    template:`
    <template>
    <v-row>
      <v-col cols="12" sm="9" >
            <Tabela />
      </v-col>

      <v-col cols="12" sm="3">
      <v-card rounded="lg">  
         <v-img :src="__dirname+'/assets/media/img/pexels-andrea-piacquadio-3801426.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.8)"
              height="200px"
            >
            <v-card-title primary-title>
              Usuário
            </v-card-title>
            <v-card-subtitle>
            <div>
                @ <span id="usuariosAtual"> 
                  <!-- crie e atulize funcionário -->
                </span>
            </div>
            </v-card-subtitle>
         </v-img>
         <v-card-actions class="ma-auto d-flex justify-center">
            <v-btn  x-small :to="{name:'registro'}" color="primary" fab dark>   
                   <v-icon>mdi-account-plus</v-icon>
            </v-btn>
            <v-btn  x-small color="primary" dark fab @click="initialize">   
                   <v-icon>mdi-sync</v-icon>
            </v-btn>
         </v-card-actions>
         
      </v-card>
      
      </v-col>
    </v-row>
    </template>
        `,
      data () {
      return {

      }
    },
        components:{
            Tabela,

         },

        watch: {
      
        },
        computed: {
          lista: function(){
            return this.$store.getters['listaUsuario/queryData']
          }
        },
        methods: {

          initialize(){

            this.$store.dispatch('listaUsuario/getusersByIdEmpresa', 
            this.$store.state.usuario.usuario)

          },

         },
        computed: {
      
            
        },

        mounted() {
          var lista = this.$store.getters['listaUsuario/queryData']

          new Typed('#usuariosAtual',{
            strings:lista.map((v,i,arr)=> { return v.nome.concat(' ^5000') }),
            shuffle:true,
            typeSpeed: 20,
            backspace:20,
            loop: true,
            loopCount: Infinity,
            showCursor: false,
            // fadeOutDelay:3000
          })

         },



}