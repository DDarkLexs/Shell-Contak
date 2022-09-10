const { getUserData,isUserLoggedIn } = require('../../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../../@core/moeda')
const { CountUp } = require('countup.js')

module.exports = {

  template:`
<template>
  <v-hover v-slot="{ hover }">
    <v-expand-transition>
      <v-card :elevation="hover ? 17 : 0" :class="{ 'on-hover': hover } && 'rounded-lg mx-auto transition-swing'"
        outlined dark dense color="primary" height="auto" width="100%">


        <v-toolbar dense :class="'py-1 elevation-0 transparent'">

          <v-icon dark @click="" x-large> {{ icon }} </v-icon>
     
          <v-spacer></v-spacer>



          <v-spacer></v-spacer>

          <v-menu rounded="lg" :offset-x="true" transition="slide-y-transition" dense>
            <template v-slot:activator="{ on, attrs }">

              <v-btn v-bind="attrs" v-on="on" class="ma-1" small icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>

            </template>

            <v-list dense>
              <v-list-item-group v-model="selected" color="primary">
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon> mdi-calendar-today-outline </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Por dia </v-list-item-title>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon> mdi-calendar-week </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Por semana</v-list-item-title>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon> mdi-calendar-month </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Por mês</v-list-item-title>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon> mdi-calendar-badge </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Por ano</v-list-item-title>
                </v-list-item>
              </v-list-item-group>

            </v-list>
          </v-menu>

        </v-toolbar>
        <v-card-title :id="'target_' + label" primary-title>
        </v-card-title>
        <v-card-subtitle>
          {{ etiqueta }}
        </v-card-subtitle>
        
      </v-card>
    </v-expand-transition>
  </v-hover>
</template>

`,
data(){
        return {
        selected: 0,
        etiqueta:'',
        item:{ 
          value:-1,
        },

        }

      },
      props:{
        label:String,
        icon:String,
        action:String,
        type:String
      },
      methods: {
        moeda,
        ...mapActions({
          get: ('stat/' + this.action)/* 'usuario/getUsuarioEmpresa' */,
          // getStatProfit:'stat/getTotalProfitFromThisWeekByEmpresaId',
        })

      
      },
      computed: {
        value:function(){
          return this.item.value
          
          switch (this.type) {
            case 'currency':
              return this.moeda(this.item.value)
              break;
          
            default:
              return this.item.value
              
              break;
          }
        },

        trocar: function(){
          switch (this.selected) {
            case 0:
              
              this.etiqueta = (this.label + ' do dia') 
              return `%Y/%m/%d`
              // dia    
              break;
              
              case 1:
                
                this.etiqueta = (this.label + ' da semana') 
                return `%Y/%m %W`
                // semana    
                break;
                
                case 2:
                  
                  this.etiqueta = (this.label + ' do mês') 
                  return `%Y/%m`
                  // mes    
                  break;
                  
                  case 3:

                    this.etiqueta = (this.label + ' do ano') 
                    return `%Y`
              // ano    
            break;
 
          
            default:

              
              
              break;
            }
            
            // return this.selected
          } 
          
          
        },
        watch: {
          value(val , beforeValue){
            
            const countUp = new CountUp(('target_' + this.label),
            val,
             { duration: 6 ,startVal: beforeValue , 
              formattingFn: (n) => {
                switch (this.type) {
                  case 'currency':
                    return this.moeda(n)
                    break;
                
                  default:
                    return n
                    
                    break;
                }
              }
            } );

            if (!countUp.error) {
            
                countUp.start();
            
            } else {            
                console.error(countUp.error);
            }
          },
          async trocar(key){
            if(key === undefined){ return null }
              try {
                
                
                const value = (await this.$store.dispatch(('stat/totalNow'), 
                {path: this.action, format: key}))
                this.item = value
                
                // alert(JSON.stringify(value))

                // this.$vs.notification({
                //   color:this.$vuetify.theme.themes.light.primary,
                //   title: `[${key}]`,
                //   //  text: `Aguarde...`
                // })
            
              } catch (error) {
                
                this.item = { value: 0 }
                
                // this.$vs.notification({
                //     color:this.$vuetify.theme.themes.light.danger,
                //     title: `Houve erro!`,
                //     text: `${error}`
                // })
            
              }
          
        }
      },

      components:{
      
      },
      created() {

         
        
      },
      mounted() {
        this.selected = 1
        this.item.value = 0

        //count
   


      },


}