const electron = require("electron");
const ipc = electron.ipcRenderer;
// const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')
const FormCategoria = require('../../components/produto/registrarCategoria')


module.exports = {
  
  template:`
  <template>
        <div>
        <v-card>
        <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                #
              </th>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">

              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in $store.getters['categoria/todo']"
              :key="item.name">
              <td>{{ (i+1) }}</td>
              <td>{{ item.label }}</td>
              
              <td>
                      <v-btn fab text x-small depressed>
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                    </v-btn>
                      <v-btn @click="apagar(item)" :color="'danger'" fab text x-small depressed>
                    <v-icon small>
                      mdi-trash-can
                    </v-icon>
                    </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
             <v-dialog v-model="criarCategoria"  max-width="300" >
        <v-card>
        <v-toolbar dark class="rounded-0" color="primary" flat dense>
        <v-btn icon dark @click="criarCategoria = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Registrar categória</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
           <v-icon>
           mdi-tag-plus
           </v-icon>
       </v-toolbar-items>
      </v-toolbar>
                <FormCategoria />
        </v-card>
      </v-dialog>

        </v-card>
        </div>
      </template> `,
        data() {
            return {
              
              criarCategoria:false
  
            }
        },
        components:{
          FormCategoria
        },
        methods: {
          apagar(item){

            this.$store.dispatch('categoria/apagarCategoria', item)

          }
       
        },

        watch: {
      
        },
        computed: {
           
            
        },

        created() {
          this.$store.dispatch('categoria/getCategorias')
          

         
            
        },



}