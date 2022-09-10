const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../../../auth/utils')
const formatMoeda = require('../../../../@core/moeda')


module.exports = {

    template:`
    <template>
        <v-row g-1>
         <v-col :cols="12">
             <v-card flat>
                 
                <v-card-text>
                     <v-row g-2 align="start"  >
                        <v-col  class="text-h6" cols="12">
                            Info
                        </v-col>
                        <v-col  class="text-h6 active" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                        <v-col  class="text-h6" cols="4">
                            Label
                        </v-col>
                        <v-col class="text-h6" cols="8">
                            Value
                        </v-col>
                    </v-row>
                <v-card-text>
                    
            </v-card>
         </v-col>
         
        </v-row>
    </template>
        `,
      data () {
      return {
      }
    },
        components:{
        

         },

        watch: {
      
        },
        methods: {


         },
        computed: {
      
            
        },

        mounted() {
      

         },



}