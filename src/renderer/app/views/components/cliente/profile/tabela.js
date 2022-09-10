const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../../auth/utils')
const moeda = require('../../../../@core/moeda')
const { mapActions,mapGetters,mapState } = Vuex


module.exports = {

    template:`
    <template>
        <v-card class="rounded-lg" outlined>      
            <v-card-title dense>
              <v-btn
              color="primary"
              depressed
              dark
              small
              @click="gerirFatura(cliente.id_cliente)"
              class="">
              <v-icon >
               mdi-printer-eye
              </v-icon>
  
            </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                dense
                v-model="procura"
                append-icon="mdi-magnify"
                label="procurar"
                outlined
                single-line
                hide-details
                ></v-text-field>

            </v-card-title>

            <v-data-table
            item-key="id_itemVenda"
            show-select
            :headers="headers"
            :items="todo"
            :items-per-page="5"
            :search="procura"
            class="elevation-1">
                <template v-slot:item.menu="{ item }">
                    <div>
                    <v-menu rounded="lg" transition="slide-x-transition" dense>
                      <template v-slot:activator="{ on, attrs }">

                        <v-btn 
                        v-bind="attrs" v-on="on" class="ma-1" small icon>
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                          <v-list-item dense @click="apagar(item)" link>
                            <v-list-item-icon>
                              <v-icon>  mdi-delete </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Apagar</v-list-item-title>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-menu>
                    </div>
                </template>
                <template v-slot:item.total="{ item }">
                    <div>
                      {{ moeda(item.total) }}
                    </div>
                </template>

                <template v-slot:item.desconto="{ item }">
                  <div>
                      {{ moeda(item.desconto) }}
                  </div>
              </template>
                <template v-slot:item.precoReal="{ item }">
                  <div>
                      {{ moeda(item.precoReal) }}
                  </div>
              </template>
            </v-data-table>
        </v-card>
    </template>
        `,
        data() {

            return {
                procura:'',
                headers: [
                    {
                      text: 'nome',
                      align: 'start',
                      sortable: false,
                      value: 'nome',
                    },
                  /*   { text: 'categória', value: 'cnome' }, */
                    { text: 'preço', value: 'precoReal' },
                    { text: 'quantidade', value: 'qtd' },
                    { text: 'desconto', value: 'desconto' },
                    { text: 'total', value: 'total' },
                    { text: '', value: 'menu' },
                  ],
            }
        },
        components:{

        
        },

        watch: {
      
        },
        methods: {
          gerirFatura(id_cliente){
            try {
              this.imprimirFatura(id_cliente)

            } catch (error) {

              this.$vs.notification({
                color:this.$vuetify.theme.themes.light.danger,
                title: `Houve erro!`,
                text: `${error}`
            })

            }
          },  
          moeda,
          ...mapActions({
            apagarItem:'cliente/apagarProdutoById_Cliente',
            imprimirFatura:'cliente/imprimir',
            

          }),

          async apagar( item ){
            try {
              
              
              await this.apagarItem( item )

              this.$vs.notification({
                color:this.$vuetify.theme.themes.light.primary,
                title: `${item.nome}`,
                 text: `este item foi apagado`
              })
          
            } catch (error) {

              
              this.$vs.notification({
                  color:this.$vuetify.theme.themes.light.danger,
                  title: `Houve erro!`,
                  text: `${error}`
              })
          
            }
            


          }
        },
        computed: {
          ...mapGetters({
            //todo:'cliente/clienteTodoPago',
            cliente:'cliente/$cliente',
            todo:'cliente/cliente_todo',
            loading:"cliente/loading_status",
          }),
            
        },

        mounted() {

         },



}