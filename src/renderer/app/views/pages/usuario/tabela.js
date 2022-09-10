const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const formatMoeda = require('../../../@core/moeda')
module.exports = {
 
    template:`
        <template>
          <v-card rounded="lg">
            <v-data-table :headers="headers" :items="lista" :items-per-page="5" :search="search" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Consultar usuário</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-account-search" label="Procurar" single-line outlined dense
                    hide-details></v-text-field>
                  </v-card-title>
              </template>
              <template v-slot:item.permissao="{ item }">
             
                <v-chip small  :color="item.permissao?'success':'danger'" text-color="white">
                  {{ item.permissao?'sim':'não'}}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">

          <v-menu rounded="lg" :offset-x="true" transition="slide-y-transition" dense>
            <template v-slot:activator="{ on, attrs }">

              <v-btn 
              v-bind="attrs" v-on="on"  class="ma-1" small icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>

            </template>

            <v-list  :close-on-content-click="false" dense>
              <v-list-item-group color="primary">
                <v-list-item  :to="{name:'perfil usuario', params:{ id_funcionario:item.id_funcionario } }" >
                  <v-list-item-icon>
                    <v-icon> mdi-badge-account </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Perfil </v-list-item-title>
                </v-list-item>

                <v-list-item  :to="{name:'editar-usuario', params:{ id_funcionario:item.id_funcionario } }" >
                  <v-list-item-icon>
                    <v-icon> mdi-account-edit </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Editar </v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>  mdi-account-remove </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>remover</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
              
      </v-list-group>
              
            </v-list>
          </v-menu>
              </template>
              <template v-slot:item.role="{ item }">
                <div>
                  <span v-if="item.role == 'admin'"> adminstrador </span>
                  <span v-else> usuário normal </span>
                </div>
              </template>
        
        
              <template v-slot:item.sexo="{ item }">
                <div>
                  <span v-if="item.sexo == 'masculino'">
                    <v-icon color="blue">mdi-gender-male</v-icon>
                  </span>
                  <span v-else>
                    <v-icon color="pink">mdi-gender-female</v-icon>
                  </span>
                </div>
              </template>
        
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
                
              </template>
        
            </v-data-table>
          </v-card>
        </template>
        `,
      data () {
      return {
        search:null,
        hover:false,
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'nome',
          },
          
          { text: 'Sexo', value: 'sexo' },
          { text: 'Telefone', value: 'telefone' },
          { text: 'idade', value: 'idade' },
          { text: 'Função', value: 'role' },
          { text: 'Ativo', value: 'permissao'},
          { text: '', value: 'actions'},
        ],
        desserts: [],
      }
    },
    components:{

    },

    watch: {
      
      },
        methods: {
          initialize(){
            this.$store.dispatch('listaUsuario/getusersByIdEmpresa', 
            this.$store.state.usuario.usuario)

          },

         },
        computed: {
          lista:function(){
            return this.$store.getters['listaUsuario/queryData']
          }
            
        },

        created() {
          this.initialize()
        },



}