const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')
const momemt = require('moment')
const extenso = require('extenso')
const { ipcRenderer } = require('electron')

//moment().format('MMMM Do YYYY, h:mm:ss a')



module.exports = {

  template:`
<template>
  <div>
  <v-row g-1>
    <v-col cols="12" sm="4">
        <v-card outlined rounded class="p-2" height="auto">
          <v-card-text>
          
        <v-text-field type="text"  
        label="Valor total" prepend-icon="mdi-circle-multiple" 
        readonly v-model="valor" outlined color="primary">
        </v-text-field>

        <v-text-field type="text"  
        label="soma total" prepend-icon="mdi-numeric" 
        readonly v-model="soma" outlined color="primary">
        </v-text-field>

          <v-textarea
                  outlined
                  color="primary"
                  label="Valor em extenso"
                  readonly
                  cols="2"
                  :value="extensoEmKwanza(multiplicado)"
                  prepend-icon="mdi-text" 

                ></v-textarea> 


            
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn dark 
             @click="clear"
            color="danger">
               <v-icon right>mdi-broom</v-icon>
               apagar
            </v-btn>
            <v-btn dark
           @click="guardar"
             color="success">
               <v-icon right>mdi-content-save</v-icon>
               salvar
            </v-btn>
          </v-card-actions>
        </v-card>    
    
    </v-col>

    <v-col cols="12" sm="8">
        <v-card outlined rounded height="auto">
        <v-card-text>
            
        
         <v-row>
          <v-col cols="12"  sm="6"  md="4"  v-for="(item, i) in properties" :key="i" >
          <v-text-field
            type="number"
            v-model.number="$store.state.moeda.coins[properties[i]]"
            persistent-hint
            :hint="convert(properties[i].slice(1) * $store.state.moeda.coins[properties[i]])"
            :label="properties[i].slice(1) + 'Kz'"
            outlined
            dense
          ></v-text-field>
        </v-col>

        </v-card-text>
      

        </v-card>    
    
    
    </v-col>
   
    </v-row>
  </div>
</template>
      
       `,
      data () {
        return {


        }
      },
      
      methods: {
        async guardar(){
          try {

            (await this.save())

            this.$vs.notification({
              border:this.$vuetify.theme.themes.light.primary,
              position:'right',
              title: 'Registrado!',
              text: `A contagem foi salvo com sucesso, verifique na tabela de registro!`
          })

        } catch (error) {
          this.$vs.notification({
            border:this.$vuetify.theme.themes.light.danger,
            position:'right',
            title: 'houve um erro!',
            text: `${error}`
        })
          
        }

    

        },
        ...mapActions({
          clear:'moeda/cleanForms',
          save:'moeda/saveToDatabase',

        }),
        moeda,
        extensoEmKwanza(value){
          return ipcRenderer.sendSync('get-localMoedaByExtenso',value)
        },

        convert(value){

          return Number(value).toLocaleString('pt-br',{style:'currency',currency:'AOA'})
          .replace('AOA','').trimStart().concat(' Kz')
        },
      },
      computed: {
        ...mapGetters({
          total:'moeda/sumAll',
          multiplicado:'moeda/multiplicado',
          properties:'moeda/properties'


        }),

        soma:function(){

          return this.total
        },
        valor:function(){

          return this.moeda(this.multiplicado)
        }
        
      },
      watch: {
     
   
      },


      components:{
     
      },
      created() {

    

      },
      mounted() {
   
 


      },


}