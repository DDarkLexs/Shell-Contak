const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../auth/utils')
const moeda = require('../../../@core/moeda')
const { mapGetters, mapActions, mapState } = Vuex



module.exports = {

    template:`
  <template>
    <v-card 
    class="rounded-lg"
    outlined
    style="overflow-x: hidden;overflow-y: scroll; transition: opacity .7s ease-in-out;"
      max-height="400">
      <v-container class="pa-2">
        <v-row>
       
          <template v-for="(item, i) in todo">
            <v-col :key="i" cols="12" md="4">
              <v-hover v-slot="{ hover } ">
                
                <v-expand-transition>
                  <v-card v-show="item.demanda <= 0 ? false : true" outlined 
                    :elevation="hover ? 13 : 0"
                    :class="{ 'on-hover': hover } && 'rounded-lg mx-auto transition-swing'"  >

                    <v-img :src="$root.dirname + '/assets/media/img/bag1.png'"
                           :lazy-src="$root.dirname + '/assets/media/img/bag1.png'"
                       class="white--text align-end ma-auto text-center d-fex justify-center"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
                      
                      :height="70">
                       <v-expand-transition>
                          <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out v-card--reveal text-h5 white--text"
                            style="height: 100%;"
                          >
                            {{ moeda(Number((item.unidade * item.precoReal))) }}
                          </div>
                        </v-expand-transition>
                    </v-img>
    
                    <v-card-title primary-title>
                      {{ item.nome }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ moeda(Number((item.precoReal * item.demanda) - item.desconto)) }}
                    </v-card-subtitle>
                 
                    <v-card-actions>
                    
                      <v-btn @click="item.demanda--"
                      
                      depressed x-small fab 
                      color="primary">
                       <v-icon>mdi-minus</v-icon>     
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="remove(item, i)" depressed small color="danger" dark>
                        <v-icon > mdi-delete </v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="item.demanda++"  
                      
                      depressed x-small fab 
                      color="primary">
                       <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>

              </v-hover> 
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-card>
    </template>
        `,
      data () {
      return {
        dialog:false

        }
      },
        components:{
        

         },

        watch: {
      
        },
        methods: {
          moeda,
          
          remove(item, i){

           this.$store.state.venda.selecionado.splice(i, 1)
            
          }


         },
        computed: {
    
          ...mapGetters({
            querySelecionado:'venda/QUERY_VENDA',
            todo:'venda/SELECTED_TODO'
            }),

            
        },

        mounted() {

         },



}