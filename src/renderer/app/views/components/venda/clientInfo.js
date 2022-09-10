const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const moeda = require('../../../@core/moeda')
var extenso = require('extenso')
const moment = require('moment')

const { mapActions,mapState,mapGetters } = Vuex

module.exports = {
 
    template:`
    <template>
    <v-card class="rounded-lg" >
      <v-form  ref="form" v-model="form"  @submit.prevent="registrar(false)">
        <v-card-title primary-title>
            informação da venda
        </v-card-title> 
        <v-card-text>
             <v-row  g-1>
                <v-col  cols="12" sm="12">
                <v-text-field 
                dense
                append-icon="mdi-account"
                outlined
                clearable
                @click:append="cliente.nome = 'Cliente ' + getRandomValue()"
                v-model="cliente.nome"
                type="text"
                label="Nome">
                </v-text-field>
                </v-col>
          
                <v-col cols="12" sm="5">
                       <v-select
                :items="resposta"
                menu-props="auto"
                label="Juros"
                v-model="cliente.juros"
                item-text="label"
                item-value="value"
                dense
                outlined
                required
                ></v-select>
                  
                    </v-col>

                <v-col cols="12" sm="7">
                <v-text-field 
                dense
                append-icon="mdi-cash-multiple"
                :hint="moeda(notaVenda.valor)"
                :rules="valorRules"
                v-model="notaVenda.valor"
                required
                @click:append="notaVenda.valor = total"
                persistent-hint
                outlined
                type="number"
                label="Valor">
                </v-text-field>
                </v-col>
    

                <v-col cols="12" sm="7">
                  <v-select
                :items="metodoPagamento"
                menu-props="auto"
                label="método de pagamento"
                item-text="label"
                item-value="value"
                v-model="notaVenda.pagamento"

                dense
                outlined
                required
                ></v-select>
                </v-col>

                <v-col cols="12" sm="5">
                      <v-select
                    :items="resposta"
                    menu-props="auto"
                    label="Pago"
                    v-model="notaVenda.pago"
                    item-text="label"
                    item-value="value"
                    dense
                    outlined
                    :required="true"
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field 
                dense
                v-model="cliente.NIF"
                @click:append="cliente.NIF = 'consumidor Final'"
                append-icon="mdi-identifier"
                outlined
                type="text"
                label="NIF">
                </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field 
                    outlined 
                    dense
                    v-model="cliente.telefone"
                    label="Telefone"
                    append-icon="mdi-phone" >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-text-field 
                    outlined 
                    dense
                    clearable
                    :hint="tempo"
                    @click:append="notaVenda.data = moment().format().split('+')[0]"
                    v-model="notaVenda.data"
                    label="Data de Vencimento"
                    append-icon="mdi-calendar" 
                     type="datetime-local">
                    </v-text-field>
                </v-col>
 
            </v-row>
        </v-card-text>
        <v-card-actions>
              <v-btn @click="reset" dark depressed color="danger">
                 <v-icon dark> mdi-broom </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn depressed @click="registrar(true)" dark color="secondary" >
                   <v-icon > mdi-printer </v-icon>
              </v-btn>
              <v-btn depressed type="submit" dark color="success" >
                   <v-icon > mdi-content-save </v-icon>
              </v-btn>
          
        </v-card-actions>
         </v-form>
    </v-card>
    </template>
        `,
      data () {
      return {
          cliente:this.$store.state.venda.cliente,
          notaVenda:this.$store.state.venda.notaVenda,
          form:true,
          resposta:[
          {label:'Sim', value:true},
          {label:'Não', value:false}
          ],
        metodoPagamento:[
          {label:'Numerário', value:'Numerário'},
          {label:'Cartão de crédito', value:'Cartão de crédito'}

        ],
          valorRules: [
            v => v >= 0 || 'Informe o valor!',
            v => v >=  (Number(this.total)) || 'O valor não chega!',
          ],
      }
    },
        components:{
        

        },

        watch: {
      
        },
        methods: {
          ...mapActions({
            getRes:'venda/getProdutoRestanteByIdProduto'
          }),
          reset(){
            try {
              
              
              this.reset('venda/reset')
            } catch (error) {
              
            }

          },  
          moment,
          ...mapActions({
            // 'venda/registrarVendaAndImprimir',
            // 'venda/registrarVenda'
            reset:'venda/resetClient',
        }),
          extenso,
          getRandomValue(){
            return Math.floor(Math.random() * (9999999999  - 1 + 1)) + 1
          },
          moeda,

          async registrar(print){
            var audio = new Audio(this.$root.dirname + '/assets/media/sound/tone2.mp3');
            var notify = null
            try {
              notify = this.$vs.notification({
                color:this.$vuetify.theme.themes.light.success,
                title: `Venda com sucesso!`,
                duration:5000,
                loading:true
                // text: `${result.msg}`
              })
              
              const REDIRECT = print?'venda/registrarVendaAndImprimir':'venda/registrarVenda'
              
              // this.$refs.form.validate()
            if(this.queries.length <= 0) throw 'Informe um produto para registrar!'
            if(this.total <= 0) throw 'Informe o valor!'
            if(this.total > this.notaVenda.valor) throw 'O valor informado é inferior!'
            if(this.notaVenda.pago == null) throw 'Informe se o produto foi pago!'
            if(this.notaVenda.pagamento == null) throw 'Informe a forma de pagamento!'
            if(this.cliente.nome == null) this.cliente.nome = 'consumidor final'

            
            const result = await this.$store.dispatch(REDIRECT, {
              cliente:this.cliente,
              notaVenda:this.notaVenda,
              produtos:this.queries
            })
            
            notify.loading = false
            audio.play()
            // this.$vs.notification({
              //     color:this.$vuetify.theme.themes.light.success,
              //     title: `Registrado com sucesso!`,
              //    // text: `${result.msg}`
              // })
              
            this.$refs.form.reset()
            this.reset('venda/reset')
            } catch (error) {

              //notify.
              Object.assign(notify,{
                loading:false,
                color:this.$vuetify.theme.themes.light.danger,
                title: `Houve erro!`,
                text: (error)
                
              })
               
              // this.$vs.notification({
              // }) 
              
              
            }

          },
     


         },
        computed: {
          ...mapGetters({
            queries:'venda/QUERY_VENDA',
            total:'venda/TOTAL_TODO'
          }),
     
          
          tempo:function () {
            return new Date(this.notaVenda.data)
            .toLocaleString('pt',{
              dateStyle:'full',
              timeStyle:'short'
          })
          }
      
             
        },

        mounted() {

     
         },



}
