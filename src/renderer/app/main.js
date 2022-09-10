const electron = require("electron");
const ipc = electron.ipcRenderer;
const  Vuetify = require('./plugins/vuetify')
const router = require('./router/index')
const store = require('./store/index')
const { getUserData,isUserLoggedIn,setData,clearData } = require('./auth/utils')
const MainApp = require('./views/main')
var vue
const { CountUp } = require('countup.js')
const securityPlugin = require('./plugins/mixins/security')
const userStatus = require('./plugins/mixins/userStatus')
const mainPageFunction = require('./plugins/mixins/frontendUser')
const {  mapGetters, mapActions } = Vuex
const menuUsuario = require("./assets/data/menuUsuario.json")
const navigation = require('./router/navigation')

Vue.config.silent = true

vue = new Vue({
        el:'#app',
        template:MainApp,
        store,
        router,
        vuetify:Vuetify,
        mixins:[securityPlugin,userStatus,mainPageFunction],
        components:{
           
        },
        
        data(){
            return {
                navigation,
                menuUsuario,
                drawer:false,
                dirname:__dirname,

                }
            },
             
            methods: {

                 ...mapActions({


                 }),

           
                },
          
            
            computed: {
                ...mapGetters({
                    usuario:'usuario/usuarioAPI',
                    productName:'productName',
                }),
              
            },
           


    
    
    })
    


