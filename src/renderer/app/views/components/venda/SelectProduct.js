const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const moeda = require('../../../@core/moeda')
const clientChoice = require('./clientChoice')
const RestanteAPI = require('../default/label/restante')
const { mapActions,mapGetters,mapState } = Vuex

module.exports = {

    template:`
    <template>
      <v-card class="rounded-lg" outlined>
        <v-card-title primary-title>
          selecionar produtos
        </v-card-title>
        <v-card-text>
          <clientChoice />
    
          <div class="text-h6 pa-1">
            <span>
              Total: {{moeda(total)}}
            </span>
            <v-divider class="mx-4" inset vertical></v-divider>
            <span>
              Troco: {{moeda(troco)}}
            </span>
    
    
    
          </div>
    
          <v-divider></v-divider>
    
    
        </v-card-text>
    
    
        <v-data-table dense :headers="headers" :items="produtos" :items-per-page="5"
          v-model="$store.state.venda.selecionado" :search="search" :single-select="false" item-key="id_produto"
          show-select>
    
          <template v-slot:item.qtd="{ item }">
            <div>
              <RestanteAPI :id_produto.sync="item.id_produto" :demanda.sync="item.demanda" />
             <!--  {{ Number(getRestante(item.id_produto) - item.demanda) }} -->
    
            </div>
          </template>
    
    
          <template v-slot:item.entrada="{ item }">
            <div class="mt-3">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field dense outlined :value="0" v-model.Number="item.demanda" :max="item.qtd" :min="0"
                    type="number" label="Qtd">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field dense outlined :value="0" v-model.Number="item.desconto" type="number" label="desconto">
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </template>
    
    
          <template v-slot:item.nome="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="subheading text-left">
                  {{ item.nome }}
                </v-list-item-title>
                <v-list-item-subtitle> {{ moeda(item.preco) }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
    
          <template v-slot:top>
            <v-toolbar dense color="transparent" flat>
              <v-text-field v-model="search"
               prepend-icon="mdi-magnify" 
               label="Procurar"
                single-line 
                outlined 
                dense
                clearable
                hide-details>
                </v-text-field>
              <v-spacer></v-spacer>
              <v-divider class="mx-4" inset vertical></v-divider>
    
              <v-btn class="mr-2" @click="limpar" dark depressed color="danger">
                <v-icon dark> mdi-broom </v-icon>
              </v-btn>
              <v-btn @click="initialize" dark depressed color="primary">
                <v-icon dark> mdi-table-sync </v-icon>
              </v-btn>
     
              </v-card-title>
          </template>
        </v-data-table>
      </v-card>
    </template>
        `,
      data () {
      return {
        selected:[],
          search:null,
          headers: [
        {
              text: 'nome',
              align: 'start',
              sortable: false,
              value: 'nome',
            },
            { text: 'categória', value: 'categoriaNome' },
            { text: '', value: 'entrada' },
            { text: 'Qtd Restante', value: 'qtd' },
          ],

      }
    },
        components:{
            clientChoice,
            RestanteAPI

         },

        watch: {
      
        },
        methods: {
          ...mapActions({
            reset:'venda/reset',
            getTodoProdutos:'venda/getTodoProdutos'
          }),

          getRestante(i){
            return Number(ipc.sendSync('get-restanteByIdProduto', i))
          },
          limpar(){
            // this.$store.state.venda.selecionado = []
            this.reset('venda/reset')

          },
     
          
          moeda,

            initialize(){
              

                this.getTodoProdutos('venda/getTodoProdutos') 
    
              },


         },
    

        computed: {


          ...mapGetters({
            produtos:'venda/STOCK_QUERY',
            total:'venda/TOTAL_TODO',
            venda:'venda/QUERY_VENDA'
          }),

          troco:function(){
            return (Number(this.$store.state.venda.notaVenda.valor) - Number(this.total))
          },
          // venda:function(){
          //   return this.$store.getters['venda/queryVenda']
          // }
            
        },

        mounted() {
            this.initialize()

         },



}