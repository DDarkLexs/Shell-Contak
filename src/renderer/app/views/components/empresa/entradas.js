const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const formatMoeda = require('../../../@core/moeda')


module.exports = {

    template:`
    <template>
        <v-card class="mx-auto rounded"  outlined max-width="1000" tile>
            <v-app-bar flat color="rgba(0, 0, 0, 0)">

            <v-btn @click="salvar($store.state.empresa.query)" v-if="!disabled" icon>
              <v-icon>mdi-content-save </v-icon>
            </v-btn>
               

            <v-spacer></v-spacer>

            <v-btn @click="disabled = !disabled" icon>
              <v-icon v-if="disabled">mdi-pencil </v-icon>
              <v-icon v-else>mdi-window-close </v-icon>
            </v-btn>
          </v-app-bar>
            <v-card-text>

                <v-form>
                    <v-container>
                        <v-row>
                            
                            <v-col cols="12" md="8">
                                <v-text-field
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.nome"
                                outlined
                                 append-icon="mdi-storefront"
                                 dense label="Nome" 
                                 >
                                </v-text-field>
                            </v-col>
    
                            <v-col cols="12" md="4">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.email"
                                append-icon="mdi-email" 
                                outlined dense label="e-mail" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.contato"
                                outlined 
                                append-icon="mdi-phone"
                                dense label="contacto" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.nif"
                                append-icon="mdi-credit-card-chip"
                                outlined dense label="NIF" required>
                                </v-text-field>
                            </v-col>
    
                            <v-col cols="12" md="4">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.provincia"
                                outlined
                                append-icon="mdi-map"
                                 dense label="provincia" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.municipio"
                                outlined
                                append-icon="mdi-map-marker"
                                 dense label="municipio" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                
                                :readonly="disabled"
                                v-model="$store.state.empresa.query.endereco"
                                outlined
                                append-icon="mdi-store-marker"
                                 dense label="endereço" required></v-text-field>
                            </v-col>
                        </v-row>
                </v-form>
    
            </v-card-text>
    
        </v-card>
    </template>
        `,
      data () {
      return {
        empresa:this.$store.state.empresa.query,
        disabled:this.$store.state.empresa.DISABLE_INPUT

      }
    },
        components:{
        

         },

        watch: {
      
        },
        methods: {
            salvar(query){
                try {
                
                    this.$store.dispatch('empresa/updateEmpresaById', query)
    
                      this.$vs.notification({
                            color:this.$vuetify.theme.themes.light.success,
                            title: `Salvo`,
                            // text: `Verifique na tabela de usuários `
                        })
                        
                    } catch (error) {
                        this.$vs.notification({
                            color:this.$vuetify.theme.themes.light.error,
                            title: 'Houve um erro!',
                            text: error
                          })
                        
                    }
            }


         },
        computed: {
            isDisabled:function(){
                return this.$store.state.empresa.DISABLE_INPUT
            }
      
            
        },

        beforeMount() {
   
       
         },



}