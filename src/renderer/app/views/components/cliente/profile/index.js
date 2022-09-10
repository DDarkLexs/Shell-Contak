const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../../auth/utils')
const moeda = require('../../../../@core/moeda')
const { mapGetters , mapActions } = Vuex
const moment = require('moment')
module.exports = {

    template:`
        <template>
            <v-form  ref="form" v-model="form"  @submit.prevent="update({cliente,notaVenda})">
            <v-card class="rounded-lg" height="auto" outlined>
            <v-img dark  
            class="align-end" 
            height="145" 
            :src="$root.dirname + '/assets/media/banner/banner-1.jpg'">
            <v-app-bar flat  color="rgba(0, 0, 0, 0)">
            <v-btn
              color="white"
              :to="{name:'cliente'}"
              icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
    
            <v-spacer></v-spacer>

          </v-app-bar>

                <v-card-title > {{cliente.nome}} </v-card-title>         
               <v-card-subtitle class="font-weight-bold">
                {{ moeda(total) }}
               </v-card-subtitle>            
            </v-img>
              <v-card-text>
             <v-row  g-1>
                <v-col  cols="12" sm="12">
                <v-text-field 
                dense
                append-icon="mdi-account"
                outlined
                clearable
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
                @click:append="notaVenda.valor = clienteLabel.total"
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
                    item-text="label"
                    item-value="value"
                    v-model="notaVenda.pago"
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
                    append-icon="mdi-calendar" 
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
           <v-spacer></v-spacer>
              <v-btn depressed type="submit"  dark color="success" >
                   <v-icon > mdi-content-save </v-icon>
              </v-btn>
          
        </v-card-actions>

            </v-card>
                
            </v-form>
        </template>
        `,
        data() {
       
        return {
        notaVenda:null,
        cliente:null,
        form:true,
        resposta:[
          {label:'Sim', value:true },
          {label:'Não', value:false }
          ],
        metodoPagamento:[
          {label:'Numerário', value:'Numerário'},
          {label:'Cartão de crédito', value:'Cartão de crédito'},
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
            async getForm(){
                const { id_cliente, id_venda } = this.clienteLabel
                
                const {notaVenda, cliente } = (await this.getForm( { id_cliente, id_venda } ))
                this.cliente = cliente   
                this.notaVenda = notaVenda  
            },

            async update({cliente,notaVenda}){
                try {
                    
                const {  } =  await this.updateForm({cliente,notaVenda})
                 //   await this.getForm()
                 this.$vs.notification({
                    color:this.$vuetify.theme.themes.light.primary,
                    title: `Atualizado!`,
                  })
                    
                } catch (error) {

                    this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.error,
                        title: 'Houve um erro!',
                        text: error
                    })
                    
                }
            },
            moment,
            ...mapActions({
                getForm:'cliente/getClientForm',
                updateForm:'cliente/updateClientForm',
            }),
            moeda,
        },
        computed: {

            total:function(){
                return (this.clienteLabel.total)
            },

            ...mapGetters({
                clienteLabel:'cliente/$cliente',
                l:'cliente/loading_status'
            }),
            
        },
        async beforeMount() {
            try {
                const { id_cliente, id_venda } = this.clienteLabel
                
                const {notaVenda, cliente } = (await this.getForm( { id_cliente, id_venda } ))
                this.cliente = cliente   
                this.notaVenda = notaVenda  

            } catch (error) {

                this.$vs.notification({
                    color:this.$vuetify.theme.themes.light.error,
                    title: 'Houve um erro!',
                    text: error
                  })
                
            }
        },

        mounted() {

         },



}