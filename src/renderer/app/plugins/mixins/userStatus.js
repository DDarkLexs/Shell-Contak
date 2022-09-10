const { getUserData,isUserLoggedIn,setData,clearData } = require('../../auth/utils')
const { mapActions, mapGetters } = Vuex
const moeda = require('../../@core/moeda')
const { CountUp } = require('countup.js')

module.exports = {
    data() {
        return {
            isUserLoggedIn,

        }
    },

    created() {
        
    },
    watch: {
    },
    computed: {

        role:function(){
            switch (this.usuario.role) {
                case 'admin':
                
                
                    return 'adminstrador'
                    break;
                    
                    default:
                        
                        
                    return 'usuário normal'
                break;
            }

        },

        ...mapGetters({
            balancoUser:'usuario/userSatus',
        }),

        maxAmount:function(){

            return this.balancoUser.maxAmount
        }
    },

    methods: {
        moeda,
        getUserData,
        getIdF(){
            if (!isUserLoggedIn()) {
                
                return getUserData().id_funcionario
            } else {
                
                return null
            }
        },
        ...mapActions({
            getUserBalance:'usuario/getUserTotal',
        }),

    
        
    },

    async beforeUpdate() {
        if(!isUserLoggedIn() && (this.$route.name != 'entrada')){
    
                 
          //  this.updateNow()
            
         }

  
       

    },



}