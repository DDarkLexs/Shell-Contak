const electron = require("electron");
const ipc = electron.ipcRenderer;
// const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')



module.exports = {
  
  template:`
  <template>
        <form @submit.prevent="registrar(form)" >
            <v-card-title class="text-h5">
          </v-card-title>
  
          <v-card-text>
            <v-container>
              <v-row g-1>
                <v-col
                  cols="12" sm="12" lg="12">
                  <v-text-field label="Nome da Categória" v-model="form.nome" required>
                </v-text-field>
                </v-col>
              </v-row>
            </v-container>

            </v-card-text>
            
            <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn type="submit" depressed color="success" >
                Registrar
              </v-btn>
          </v-card-actions>
          
      </form>
      </template> `,
        data() {
            return {
              form:{
                id_categoria:null,
                nome:'',
              }
                
            }
        },
        methods: {
          registrar(form){
            try {
            
          const i = ipc.sendSync('insert-NewCategory', form)

            if(!i) throw `já existe a categória com o nome ${form.nome}`
            this.$store.dispatch('categoria/getCategorias')
            this.$vs.notification({
                color:this.$vuetify.theme.themes.light.success,
                title: `Categória registrado com sucesso!`,
                text: `podes fazer registro de produto com esta categória`
            })
              
           
            } catch (error) {

               this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.error,
                        title: 'Houve um erro!',
                        text: error
                })
              
            }

          },
        },

        watch: {
      
        },
        computed: {
           
            
        },

        created() {

         
            
        },



}