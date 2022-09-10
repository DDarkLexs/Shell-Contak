const { ipcRenderer } = require('electron')
const { getUserData,isUserLoggedIn } = require('../../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../../@core/moeda')
const { CountUp } = require('countup.js')


module.exports = {

  template:`
    <template>
        <div>
        <span v-if="!l">
          {{ pedido <= 0 ? '--' : value }}
        </span>

        <v-progress-circular
        v-if="l"
        indeterminate
        :size="20"
        :width="2"
        color="light"
      ></v-progress-circular>
        
        
        </div>
    </template>`,
    data(){
        return {
            l:false,
            value:0,

        }

      },
      props:{
        id_produto:{
          type:Number
        },
        demanda:{
          type:Number
        }

      },
      methods: {
        ...mapActions({
            reset:'venda/reset',
            get:'venda/getProdutoRestanteByIdProduto'
          }),
            async getRestante(qtd){
              return new Promise(async (r,j) => {
                this.l = true
                
                
                try {
                  
                  const total = await this.get( this.id_produto )
                  
                  this.value = Number(total - qtd)
       
                  this.l = false
                  r(this.value)
                } catch (error) {
                  this.l = false
                  
                j(error)


                
              }
            })
            
            }

       },
      computed: {
        pedido:function(){
          return this.demanda
        }
       },
        watch: {
          async pedido(qtd){
            try {
              
              (await this.getRestante(qtd))
     
            } catch (error) {
              
              this.$vs.notification({
                  color:this.$vuetify.theme.themes.light.error,
                  title: `Houve um erro!`,
                  duration:5000,
                 text: `${error}`
              })
              
            }
          
          }

        },

      components:{
      
      },
      async created() {

        (await this.getRestante(this.pedido))
         
        
      },
      mounted() {


      },


}