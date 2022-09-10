const { ipcRenderer, shell } = require("electron");
const ipc = ipcRenderer;
const { getUserData,isUserLoggedIn,setData,clearData } = require('../../../auth/utils')
const { mapGetters, mapActions, mapState } = Vuex
 
module.exports = {
    
    template:`
<template>
    
        <v-card outlined 
            :disabled="l"
            
            class="text-center rounded-lg mt-15 ma-auto d-flex justify-center" width="300" >
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            

              @submit.prevent="autenticar">

            <v-img  class="ma-auto mt-4  text-center" 
                   :disabled="l"
                    :loading="l"
                :src="$root.dirname+'/assets/media/logo/logo.png'"
                :lazy-src="$root.dirname+'/assets/media/logo/logo.png'"
                 width="115">
            </v-img>
            
            <v-card-title :disabled="l" class="justify-center display-1" primary-title>
                Entrada
            </v-card-title>

            <v-card-text>
                <v-row no-gutters>

                    <v-col cols="12" sm="12">
                        <v-text-field 
                        type="text"
                        outlined
                        dense
                        :disabled="l"
                        :loading="l"
                        :rules="nomeRegra"
                        v-model="$store.state.usuario.entrada.nome"
                        label="Usuario"
                        prepend-icon="mdi-account"
                        hint="Informe o usuário">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                        <v-text-field 
                        type="password" 
                        outlined
                        dense
                        :rules="passwordRegra"
                        :disabled="l"
                        :loading="l"
                        depressed
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        v-model="$store.state.usuario.entrada.senha"
                        label="Palavra-passe"
                        prepend-icon="mdi-lock"
                        hint="Informe a Palavra-passe">
                        </v-text-field>                        
                    </v-col>

                </v-row>
                    
            </v-card-text>
            

            <v-card-actions>
                <v-btn
                :disabled="l"
                :loading="l"
                :depressed="l"
                block
                type="submit"
                class="mr-4"
                color="success"> Verificar </v-btn>
            </v-card-actions>

            </v-form>
    </v-card> 
       
            
</template>
        
        `,
        data() {
            return {
                show1:false,
                valid:true,
                 nomeRegra: [
                    v => !!v || 'Informe o nome de usuário!',
                ],
                 passwordRegra: [
                    v => !!v || 'Informe a palavra-passe do usuário!',
                ],

            }
        },

        methods: {
            ...mapActions({
                    tryAuth:'usuario/authenticate',
            }),

            async autenticar(){
                try {
                    var valid = this.$refs.form.validate()

                        if(!valid) throw 'dados em falta!'
                    
                   await this.tryAuth( this.entrada )
                   
                    this.$router.push({ name: 'home' })    


                    this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.primary,
                        title: ``,
                        loading:true,
                        text: `Aguarde...`
                      })
                      var audio = new Audio(this.$root.dirname + '/assets/media/sound/login2.m4a');
                      audio.play()
          
                      
                      
                    } catch (error) {
                        
                        shell.beep()
                        // var audio = new Audio(this.$root.dirname + '/assets/media/sound/error-1.m4a');
                        //audio.play()
                        this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.error,
                        title: 'Houve um erro!',
                        text: error
                      })

                }
  

        }
        },

        watch: {

        },
        computed: {
            ...mapGetters({
                l: 'usuario/loadingState',
                entrada: 'usuario/entradaData'
            }),
    
            
        },

        created() {


            clearData()

  
         
            
        },



}