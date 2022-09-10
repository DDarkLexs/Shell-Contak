const electron = require("electron");
const ipc = electron.ipcRenderer;
// const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')
const moeda = require('../../../@core/moeda')


module.exports = {
  
  template:`
  <template>
        <v-form @submit.prevent="trocar" >
        <v-list row>
               <v-list-item  two-line>
            <v-list-item-content>
                <v-list-item-title> Preço de custo </v-list-item-title>
                <v-list-item-subtitle>{{moeda(invest)}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-list-item  two-line>
            <v-list-item-content>
                <v-list-item-title> Lucro por unidade </v-list-item-title>
                <v-list-item-subtitle>{{lucro_por_unidade}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
               <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title> Lucro total </v-list-item-title>
                <v-list-item-subtitle>{{lucro_total}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
               <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title> Preço de venda </v-list-item-title>
                    <v-list-item-subtitle>{{preco_a_vender}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            
        </v-list>
  
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4">
                <v-text-field 
                dense
                @click:append="investimento = precoDeCompraDeCadaUnidade"
                append-icon="mdi-calculator"
                outlined
                type="Number"
                :hint="moeda(precoDeCompraDeCadaUnidade || 0)"
                v-model="investimento"
                label="Preço de custo por unidade">
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="2">
                <v-text-field 
                dense
                outlined
                type="Number"
                v-model="compra.qtd"
                :hint="compra.qtd"
                label="Quantidade">
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                <v-text-field 
                dense
                outlined
                type="Number"
                min="0"
                max="100"
                v-model="lucro"
                append-icon="mdi-percent"
                hint="Informe a Margem de lucro"
                label="Margem de lucro">
                </v-text-field>
                </v-col>
                
                <v-col cols="12" sm="3">
                <v-text-field 
                dense
                outlined
                type="Number"
                min="0"
                max="100"
                label="IVA"
                hint="Informe o IVA"
                v-model="produto.iva"
                append-icon="mdi-percent"
                >
                </v-text-field>
                </v-col>
              </v-row>
            </v-container>

            </v-card-text>
            
            <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn type="submit"  depressed color="success">
                Trocar o preço
              </v-btn>
          </v-card-actions>
          
      </v-form>
      </template> `,
             data() {
            const {
            produto,
            compra,
            } = this.$store.state.produto.forms
            
            return {
            produto,
            compra,
            investimento:0,
            lucro:25,
            preco:0,
            }
        },
        methods: {
          moeda,
          trocar(){
            this.produto.preco = Math.round(this.precoParaVenda)
           },
        },

        watch: {
      
        },
        computed: {
    precoDeCompraDeCadaUnidade: function () { // Preco de custo
      return (Math.round(this.compra.preco / this.compra.qtd))
    },
    invest: function () { // custo total
      return (Number(this.investimento * this.compra.qtd))
    },
    lucro_por_unidade: function () { // formula de lucro por cada unidade
      return this.moeda((((this.investimento * this.lucro) / 100) * 1) * this.produto.iva)
    },
    lucro_total: function () { // formula de lucro total
      return this.moeda(Math.round((((this.investimento * this.compra.qtd) * this.lucro) / 100) * this.produto.iva))
    },
    precoParaVenda: function () { // formula de preco a vender
      return (((((this.investimento * this.lucro) / 100) * 1) + Number(this.investimento)) * this.produto.iva)
    },
    preco_a_vender: function () { // formula de preco a vender
      return this.moeda(((((this.investimento * this.lucro) / 100) * 1) + Number(this.investimento)) * this.produto.iva)
    },
    unit: function () {
      return this.moeda(Number(this.investimento))
    }
           
            
    },

        created() {

         
            
        },



}